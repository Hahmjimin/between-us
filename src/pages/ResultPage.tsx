import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  loadTossPayments,
  ANONYMOUS,
} from '@tosspayments/tosspayments-sdk'

import {
  AnalysisResponse,
} from '../api/analysisApi'

import '../styles/result.css'

interface SignalItem {
  key: string
  label: string
  description: string
  value: number
  negative?: boolean
}

const DEEP_REPORT_PRICE = 2900

function ResultPage() {
  const navigate = useNavigate()

  const [paymentLoading, setPaymentLoading] =
    useState(false)

  const [paymentError, setPaymentError] =
    useState('')

  const result =
    useMemo<AnalysisResponse | null>(() => {
      const raw =
        sessionStorage.getItem(
          'analysisResult',
        )

      if (!raw) {
        return null
      }

      try {
        return JSON.parse(raw)
      } catch {
        return null
      }
    }, [])

  const story =
    sessionStorage.getItem(
      'relationshipStory',
    ) ?? ''

  const relationshipType =
    sessionStorage.getItem(
      'relationshipType',
    ) ?? ''

  const followUpAnswers =
    useMemo<Record<string, string>>(() => {
      const raw =
        sessionStorage.getItem(
          'followUpAnswers',
        )

      if (!raw) {
        return {}
      }

      try {
        return JSON.parse(raw)
      } catch {
        return {}
      }
    }, [])

  if (!result) {
    return (
      <main className="page result-page">
        <section className="result-container">
          <p>
            분석 결과를 찾을 수 없어요.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              navigate('/')
            }
          >
            처음으로 돌아가기
          </button>
        </section>
      </main>
    )
  }

  const signalItems: SignalItem[] = [
    {
      key: 'contact',
      label: '먼저 다가오는 정도',
      description:
        '연락을 먼저 시작하는 행동',
      value:
        result.contactInitiative,
    },
    {
      key: 'conversation',
      label: '대화를 이어가는 정도',
      description:
        '질문하거나 새 화제를 꺼내는 행동',
      value:
        result.conversationEngagement,
    },
    {
      key: 'meeting',
      label: '만나려는 적극성',
      description:
        '직접 약속을 만들려는 행동',
      value:
        result.meetingInitiative,
    },
    {
      key: 'emotion',
      label: '감정을 보여주는 정도',
      description:
        '속마음이나 개인적인 이야기 공유',
      value:
        result.emotionalOpenness,
    },
    {
      key: 'maintenance',
      label:
        '관계를 이어가려는 정도',
      description:
        '관계가 끊기지 않게 유지하는 행동',
      value:
        result.relationshipMaintenance,
    },
    {
      key: 'distance',
      label: '거리를 두는 행동',
      description:
        '회피하거나 거리를 만드는 행동',
      value:
        result.distanceSignal,
      negative: true,
    },
  ]

  const createOrderId = () => {
    return `BETWEENUS_${crypto
      .randomUUID()
      .replaceAll('-', '')
      .slice(0, 24)}`
  }

  const handleDeepReport =
    async () => {
      if (paymentLoading) {
        return
      }

      try {
        setPaymentLoading(true)
        setPaymentError('')

        const clientKey =
          import.meta.env
            .VITE_TOSS_CLIENT_KEY

        if (!clientKey) {
          throw new Error(
            'VITE_TOSS_CLIENT_KEY가 설정되지 않았습니다.',
          )
        }

        /*
         * 결제 성공 이후에도
         * 기존 분석 데이터를 이용할 수 있도록
         * 현재 요청 정보를 sessionStorage에 저장한다.
         */
        sessionStorage.setItem(
          'analysisResult',
          JSON.stringify(result),
        )

        sessionStorage.setItem(
          'relationshipStory',
          story,
        )

        sessionStorage.setItem(
          'relationshipType',
          relationshipType,
        )

        sessionStorage.setItem(
          'followUpAnswers',
          JSON.stringify(
            followUpAnswers,
          ),
        )

        /*
         * 토스페이먼츠 SDK v2 초기화
         */
        const tossPayments =
          await loadTossPayments(
            clientKey,
          )

        /*
         * 현재 로그인 없는 비회원 서비스이므로
         * ANONYMOUS 사용
         */
        const widgets =
          tossPayments.widgets({
            customerKey:
              ANONYMOUS,
          })

        /*
         * 결제창 렌더링 전에
         * 금액을 먼저 설정해야 한다.
         */
        await widgets.setAmount({
          currency: 'KRW',
          value:
            DEEP_REPORT_PRICE,
        })

        /*
         * 결제창형 UI 렌더링
         *
         * Result 화면 위에
         * 토스 결제수단 선택창이
         * 오버레이 형태로 열린다.
         */
        const paymentWindow =
          await widgets.renderPaymentWindow()

        /*
         * 사용자가 결제창을 닫으면
         * 다시 버튼을 누를 수 있게 한다.
         */
        paymentWindow.on(
          'cancel',
          () => {
            setPaymentLoading(false)
          },
        )

        /*
         * 결제창에서 결제수단을 선택하고
         * 결제를 진행하면 발생한다.
         */
        paymentWindow.on(
          'paymentRequest',
          async () => {
            try {
              const orderId =
                createOrderId()

              /*
               * 다음 단계의 결제 승인에서
               * 사용할 주문 정보를 저장한다.
               *
               * 현재는 테스트 단계이며,
               * 최종 구현에서는 orderId와 amount를
               * Spring Boot 서버에서 관리한다.
               */
              sessionStorage.setItem(
                'paymentOrderId',
                orderId,
              )

              sessionStorage.setItem(
                'paymentAmount',
                String(
                  DEEP_REPORT_PRICE,
                ),
              )

              await widgets.requestPayment({
                orderId,

                orderName:
                  'BETWEEN US 개인화 심층 분석',

                successUrl:
                  `${window.location.origin}/payment/success`,

                failUrl:
                  `${window.location.origin}/payment/fail`,
              })
            } catch (error) {
              console.error(
                '토스 결제 요청 실패:',
                error,
              )

              setPaymentError(
                '결제를 시작하지 못했어요. 다시 시도해주세요.',
              )

              setPaymentLoading(
                false,
              )

              paymentWindow.destroy()
            }
          },
        )
      } catch (error) {
        console.error(
          '토스 결제창 실행 실패:',
          error,
        )

        setPaymentError(
          '결제창을 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
        )

        setPaymentLoading(false)
      }
    }

  return (
    <main className="page result-page">
      <section className="result-container">
        <span className="result-label">
          BETWEEN US · SIGNAL REPORT
        </span>

        <p className="result-eyebrow">
          그 사람이 보여준 행동에서
          나타난
        </p>

        <div className="signal-score">
          {result.signalScore}
          <span>%</span>
        </div>

        <h1 className="signal-title">
          {result.headline}
        </h1>

        <div className="signal-summary">
          <div>
            <span>
              관심 신호
            </span>

            <strong>
              {result.interestLevel}
            </strong>
          </div>

          <div>
            <span>
              거리두기 신호
            </span>

            <strong>
              {result.distanceLevel}
            </strong>
          </div>

          <div>
            <span>
              관계 유지 의지
            </span>

            <strong>
              {result.maintenanceLevel}
            </strong>
          </div>
        </div>

        <section className="signal-map">
          <div className="signal-map-header">
            <div>
              <span className="signal-map-label">
                SIGNAL MAP
              </span>

              <h2>
                그 사람이 보여준
                <br />
                행동을 나눠봤어요.
              </h2>
            </div>

            <span className="signal-map-scale">
              0 — 5
            </span>
          </div>

          <div className="signal-map-list">
            {signalItems.map(
              (signal) => (
                <div
                  className={`signal-map-item ${
                    signal.negative
                      ? 'negative'
                      : ''
                  }`}
                  key={signal.key}
                >
                  <div className="signal-map-title">
                    <div>
                      <strong>
                        {signal.label}
                      </strong>

                      <span>
                        {
                          signal.description
                        }
                      </span>
                    </div>

                    <b>
                      {signal.value}
                      <small>
                        /5
                      </small>
                    </b>
                  </div>

                  <div className="signal-map-track">
                    <div
                      className="signal-map-value"
                      style={{
                        width: `${
                          (signal.value /
                            5) *
                          100
                        }%`,
                      }}
                    />
                  </div>

                  <div className="signal-map-dots">
                    {[1, 2, 3, 4, 5].map(
                      (dot) => (
                        <span
                          key={dot}
                          className={
                            dot <=
                            signal.value
                              ? 'active'
                              : ''
                          }
                        />
                      ),
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          <p className="signal-map-notice">
            점수가 높을수록 해당 행동이
            더 자주 또는 강하게 나타났다는
            의미예요.
          </p>
        </section>

        <article className="signal-card">
          <span className="signal-number">
            01
          </span>

          <h2>
            지금 이야기에서
            <br />
            가장 중요한 신호
          </h2>

          <p>
            {result.keySignal}
          </p>
        </article>

        <article className="signal-card contrast-card">
          <span className="signal-number">
            02
          </span>

          <h2>
            그런데 서로 다른 방향의
            <br />
            신호가 하나 있어요.
          </h2>

          <p>
            {result.contrast}
          </p>
        </article>

        {story && (
          <article className="user-story-card">
            <span>
              당신이 들려준 이야기
            </span>

            <p>
              “
              {story.length > 150
                ? `${story.slice(
                    0,
                    150,
                  )}...`
                : story}
              ”
            </p>
          </article>
        )}

        <section className="deep-report">
          <p>
            여기서부터는
            <br />

            <strong>
              조금 더 깊게 볼게요.
            </strong>
          </p>

          <div className="deep-lock-list">
            <div>
              🔒 상대가 거리를 두는 순간의
              공통점
            </div>

            <div>
              🔒 호감이 있어도 먼저
              다가오지 않는 이유
            </div>

            <div>
              🔒 지금 먼저 연락해도 되는지
            </div>

            <div>
              🔒 앞으로 관찰해야 할 신호
              3가지
            </div>

            <div>
              🔒 관계가 바뀔 가능성이 높은
              순간
            </div>
          </div>

          {paymentError && (
            <p className="deep-error">
              {paymentError}
            </p>
          )}

          <button
            className={`premium-button ${
              paymentLoading
                ? 'premium-button-loading'
                : ''
            }`}
            onClick={
              handleDeepReport
            }
            disabled={
              paymentLoading
            }
          >
            {paymentLoading ? (
              <>
                <span className="premium-loading-copy">
                  결제창을 준비하고 있어요

                  <small>
                    잠시만 기다려주세요
                  </small>
                </span>

                <span
                  className="premium-loader"
                  aria-hidden="true"
                />
              </>
            ) : (
              <>
                <span>
                  전체 Signal Report 열기

                  <small>
                    개인화 심층 분석
                  </small>
                </span>

                <strong>
                  ₩2,900
                </strong>
              </>
            )}
          </button>
        </section>
      </section>
    </main>
  )
}

export default ResultPage