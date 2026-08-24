import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  requestAnalysis,
  AnalysisResponse,
} from '../api/analysisApi'

const steps = [
  '이야기 속 행동을 정리하고 있어요',
  '상대가 보인 신호를 나누고 있어요',
  '서로 모순되는 행동을 찾고 있어요',
  '관계의 흐름을 정리하고 있어요',
]

function LoadingPage() {
  const navigate = useNavigate()

  const [completed, setCompleted] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const runAnalysis = async () => {
      try {
        const relationshipType =
          sessionStorage.getItem('relationshipType') ?? ''

        const story =
          sessionStorage.getItem('relationshipStory') ?? ''

        const followUpRaw =
          sessionStorage.getItem('followUpAnswers')

        const followUpAnswers =
          followUpRaw
            ? JSON.parse(followUpRaw)
            : {}

        const result: AnalysisResponse =
          await requestAnalysis({
            relationshipType,
            story,
            followUpAnswers,
          })

        if (!result.valid) {
          if (result.reason === 'INSUFFICIENT_CONTEXT') {
            setError(
              '분석하기에는 이야기가 조금 부족해요.',
            )

            setTimeout(() => {
              navigate('/story')
            }, 1800)

            return
          }

          setError('분석할 수 없는 입력이에요.')
          return
        }

        sessionStorage.setItem(
          'analysisResult',
          JSON.stringify(result),
        )

        setCompleted(steps.length)

        setTimeout(() => {
          navigate('/result')
        }, 900)
      } catch (e) {
        console.error(e)

        setError(
          '분석 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.',
        )
      }
    }

    runAnalysis()

    const interval = window.setInterval(() => {
      setCompleted((prev) => {
        if (prev >= steps.length - 1) {
          return prev
        }

        return prev + 1
      })
    }, 700)

    return () => {
      window.clearInterval(interval)
    }
  }, [navigate])

  return (
    <main className="page analyzing-page">
      <section className="analysis-container">
        <div className="analysis-heart">♥</div>

        <h1>
          그 사람이 보여준
          <br />
          신호를 읽고 있어요.
        </h1>

        {error ? (
          <p
            style={{
              color: '#e99fc4',
              lineHeight: 1.8,
            }}
          >
            {error}
          </p>
        ) : (
          <div className="analysis-list">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`analysis-row ${
                  index === completed
                    ? 'active'
                    : ''
                }`}
              >
                <span>✦</span>

                <span>{step}</span>

                <span>
                  {index < completed
                    ? '✓'
                    : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default LoadingPage