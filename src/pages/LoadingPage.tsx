import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  requestAnalysis,
  AnalysisResponse,
  AnalysisRequest,
  AnalysisApiError,
} from '../api/analysisApi'

const steps = [
  '이야기 속 행동을 정리하고 있어요',
  '상대가 보인 신호를 나누고 있어요',
  '서로 모순되는 행동을 찾고 있어요',
  '관계의 흐름을 정리하고 있어요',
]

let pendingAnalysis: Promise<AnalysisResponse> | null = null
let pendingAnalysisKey: string | null = null

function createRequestKey(
  request: AnalysisRequest,
) {
  return JSON.stringify({
    relationshipType: request.relationshipType,
    story: request.story,
    followUpAnswers: request.followUpAnswers,
  })
}

function getAnalysis(
  request: AnalysisRequest,
): Promise<AnalysisResponse> {
  const requestKey =
    createRequestKey(request)

  if (
    pendingAnalysis &&
    pendingAnalysisKey === requestKey
  ) {
    return pendingAnalysis
  }

  pendingAnalysisKey = requestKey

  pendingAnalysis =
    requestAnalysis(request).finally(() => {
      /*
       * 완료된 요청은 비워준다.
       *
       * 같은 화면에서 재시도 버튼을 눌렀을 때
       * 실제 API를 다시 호출할 수 있게 한다.
       */
      pendingAnalysis = null
      pendingAnalysisKey = null
    })

  return pendingAnalysis
}

function LoadingPage() {
  const navigate = useNavigate()

  const [completed, setCompleted] =
    useState(0)

  const [error, setError] =
    useState<string | null>(null)

  const [errorCode, setErrorCode] =
    useState<string | null>(null)

  const [retryCount, setRetryCount] =
    useState(0)

  useEffect(() => {
    let active = true

    let navigationTimer:
      | number
      | null = null

    let storyTimer:
      | number
      | null = null

    const runAnalysis = async () => {
      setError(null)
      setErrorCode(null)
      setCompleted(0)

      try {
        const relationshipType =
          sessionStorage.getItem(
            'relationshipType',
          ) ?? ''

        const story =
          sessionStorage.getItem(
            'relationshipStory',
          ) ?? ''

        const followUpRaw =
          sessionStorage.getItem(
            'followUpAnswers',
          )

        let followUpAnswers:
          Record<string, string> = {}

        if (followUpRaw) {
          try {
            followUpAnswers =
              JSON.parse(
                followUpRaw,
              )
          } catch (parseError) {
            console.error(
              'followUpAnswers 파싱 실패:',
              parseError,
            )
          }
        }

        const request:
          AnalysisRequest = {
          relationshipType,
          story,
          followUpAnswers,
        }

        const result =
          await getAnalysis(
            request,
          )

        if (!active) {
          return
        }

        if (!result.valid) {
          if (
            result.reason ===
            'INSUFFICIENT_CONTEXT'
          ) {
            setError(
              '분석하기에는 이야기가 조금 부족해요.',
            )

            setErrorCode(
              'INSUFFICIENT_CONTEXT',
            )

            storyTimer =
              window.setTimeout(
                () => {
                  if (active) {
                    navigate(
                      '/story',
                    )
                  }
                },
                1800,
              )

            return
          }

          setError(
            '분석할 수 없는 입력이에요.',
          )

          setErrorCode(
            result.reason ??
              'INVALID_INPUT',
          )

          return
        }

        sessionStorage.setItem(
          'analysisResult',
          JSON.stringify(
            result,
          ),
        )

        setCompleted(
          steps.length,
        )

        navigationTimer =
          window.setTimeout(
            () => {
              if (active) {
                navigate(
                  '/result',
                )
              }
            },
            900,
          )
      } catch (caughtError) {
        console.error(
          '분석 요청 오류:',
          caughtError,
        )

        if (!active) {
          return
        }

        if (
          caughtError instanceof
          AnalysisApiError
        ) {
          setError(
            caughtError.message,
          )

          setErrorCode(
            caughtError.code,
          )

          return
        }

        setError(
          '분석 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.',
        )

        setErrorCode(
          'UNKNOWN_ERROR',
        )
      }
    }

    runAnalysis()

    const interval =
      window.setInterval(
        () => {
          if (!active) {
            return
          }

          setCompleted(
            (prev) => {
              if (
                prev >=
                steps.length - 1
              ) {
                return prev
              }

              return prev + 1
            },
          )
        },
        700,
      )

    return () => {
      active = false

      window.clearInterval(
        interval,
      )

      if (
        navigationTimer !==
        null
      ) {
        window.clearTimeout(
          navigationTimer,
        )
      }

      if (
        storyTimer !== null
      ) {
        window.clearTimeout(
          storyTimer,
        )
      }
    }
  }, [
    navigate,
    retryCount,
  ])

  const handleRetry = () => {
    setRetryCount(
      (prev) =>
        prev + 1,
    )
  }

  const canRetry =
    errorCode ===
      'AI_RATE_LIMIT' ||
    errorCode ===
      'AI_SERVICE_UNAVAILABLE' ||
    errorCode ===
      'AI_NETWORK_ERROR' ||
    errorCode ===
      'AI_SERVICE_ERROR' ||
    errorCode ===
      'AI_BAD_RESPONSE' ||
    errorCode ===
      'UNKNOWN_ERROR'

  return (
    <main className="page analyzing-page">
      <section className="analysis-container">
        <div className="analysis-heart">
          ♥
        </div>

        <h1>
          그 사람이 보여준
          <br />
          신호를 읽고 있어요.
        </h1>

        {error ? (
          <div className="analysis-error">
            <p
              style={{
                color:
                  '#e99fc4',
                lineHeight:
                  1.8,
              }}
            >
              {error}
            </p>

            {canRetry && (
              <button
                className="primary-button"
                onClick={
                  handleRetry
                }
              >
                다시 분석하기
              </button>
            )}
          </div>
        ) : (
          <div className="analysis-list">
            {steps.map(
              (
                step,
                index,
              ) => (
                <div
                  key={
                    step
                  }
                  className={`analysis-row ${
                    index ===
                    completed
                      ? 'active'
                      : ''
                  }`}
                >
                  <span>
                    ✦
                  </span>

                  <span>
                    {step}
                  </span>

                  <span>
                    {index <
                    completed
                      ? '✓'
                      : ''}
                  </span>
                </div>
              ),
            )}
          </div>
        )}
      </section>
    </main>
  )
}

export default LoadingPage