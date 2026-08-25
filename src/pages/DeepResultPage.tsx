import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AnalysisResponse,
  DeepAnalysisResponse,
} from '../api/analysisApi'

import '../styles/deep-result.css'

function DeepResultPage() {
  const navigate = useNavigate()

  const deepResult =
    useMemo<DeepAnalysisResponse | null>(
      () => {
        const raw =
          sessionStorage.getItem(
            'deepAnalysisResult',
          )

        if (!raw) {
          return null
        }

        try {
          return JSON.parse(raw)
        } catch {
          return null
        }
      },
      [],
    )

  const freeResult =
    useMemo<AnalysisResponse | null>(
      () => {
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
      },
      [],
    )

  if (!deepResult || !freeResult) {
    return (
      <main className="page deep-result-page">
        <section className="deep-result-container">
          <span className="deep-brand">
            BETWEEN US
          </span>

          <h1>
            심층 분석 결과를
            <br />
            찾을 수 없어요.
          </h1>

          <button
            className="deep-back-button"
            onClick={() =>
              navigate('/result')
            }
          >
            Signal Report로 돌아가기
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="page deep-result-page">
      <div className="deep-result-glow" />

      <section className="deep-result-container">
        <header className="deep-result-header">
          <button
            className="deep-result-back"
            onClick={() =>
              navigate('/result')
            }
            aria-label="뒤로 가기"
          >
            ←
          </button>

          <span className="deep-brand">
            BETWEEN US
          </span>

          <span className="deep-header-space" />
        </header>

        <section className="deep-report-hero">
          <span>
            DEEP SIGNAL REPORT
          </span>

          <p>
            두 사람 사이에 반복되는
            <br />
            행동의 흐름을 더 깊게 봤어요.
          </p>

          <div className="deep-score-orbit">
            <div className="deep-score-ring">
              <strong>
                {freeResult.signalScore}
                <small>%</small>
              </strong>
            </div>
          </div>

          <h1>
            지금 중요한 건
            <br />
            <em>
              한 번의 반응보다
              반복되는 행동이에요.
            </em>
          </h1>
        </section>

        {/* 01 DISTANCE PATTERN */}
        <section className="deep-section">
          <div className="deep-section-number">
            01
          </div>

          <span className="deep-section-label">
            DISTANCE PATTERN
          </span>

          <h2>
            상대는 언제
            <br />
            한 걸음 물러날까요?
          </h2>

          <p className="deep-section-copy">
            {deepResult.distancePattern}
          </p>
        </section>

        {/* 02 POSITIVE SIGNALS */}
        <section className="deep-section">
          <div className="deep-section-number">
            02
          </div>

          <span className="deep-section-label">
            POSITIVE SIGNALS
          </span>

          <h2>
            그래도 놓치지 말아야 할
            <br />
            긍정적인 신호가 있어요.
          </h2>

          <div className="deep-positive-list">
            {deepResult.positiveSignals.map(
              (signal, index) => (
                <article
                  className="deep-positive-card"
                  key={index}
                >
                  <span>
                    {String(index + 1).padStart(
                      2,
                      '0',
                    )}
                  </span>

                  <p>{signal}</p>
                </article>
              ),
            )}
          </div>
        </section>

        {/* 03 HESITATION */}
        <section className="deep-section">
          <div className="deep-section-number">
            03
          </div>

          <span className="deep-section-label">
            HESITATION
          </span>

          <h2>
            가까워지면서도
            <br />
            멈추는 이유
          </h2>

          <p className="deep-section-intro">
            지금의 행동만 놓고 보면 한 가지
            이유로 단정하기보다, 이런 가능성을
            함께 생각해볼 수 있어요.
          </p>

          <div className="deep-reason-list">
            {deepResult.hesitationReasons.map(
              (reason, index) => (
                <article
                  className="deep-reason-card"
                  key={index}
                >
                  <span>
                    POSSIBILITY{' '}
                    {String(index + 1).padStart(
                      2,
                      '0',
                    )}
                  </span>

                  <p>{reason}</p>
                </article>
              ),
            )}
          </div>

          <div className="deep-insight-box">
            <span>
              BETWEEN US NOTE
            </span>

            <p>
              가능성은 가능성일 뿐이에요.
              상대의 마음을 하나로 단정하기보다
              앞으로 실제 행동이 어떻게
              달라지는지를 보는 것이 더
              중요해요.
            </p>
          </div>
        </section>

        {/* 04 INTERPRETATION */}
        <section className="deep-section">
          <div className="deep-section-number">
            04
          </div>

          <span className="deep-section-label">
            DON'T OVERREAD
          </span>

          <h2>
            이 행동만으로
            <br />
            단정할 수 없는 것
          </h2>

          <p className="deep-section-intro">
            마음이 복잡할수록 작은 행동 하나에
            큰 의미를 붙이기 쉬워요. 지금은
            이 부분을 특히 조심해서 볼 필요가
            있어요.
          </p>

          <div className="deep-warning-list">
            {deepResult.interpretationWarnings.map(
              (warning, index) => (
                <article
                  className="deep-warning-card"
                  key={index}
                >
                  <span>!</span>
                  <p>{warning}</p>
                </article>
              ),
            )}
          </div>
        </section>

        {/* 05 NEXT MOVE */}
        <section className="deep-section">
          <div className="deep-section-number">
            05
          </div>

          <span className="deep-section-label">
            NEXT MOVE
          </span>

          <h2>
            그래서 지금,
            <br />
            내가 먼저 다가가도 될까요?
          </h2>

          <p className="deep-section-copy">
            {deepResult.contactAdvice}
          </p>

          <div className="deep-action-grid">
            <div className="deep-action-card recommended">
              <span>
                TRY THIS
              </span>

              <h3>
                이렇게 해보세요
              </h3>

              {deepResult.recommendedActions.map(
                (action, index) => (
                  <div
                    className="deep-action-row"
                    key={index}
                  >
                    <b>
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </b>

                    <p>{action}</p>
                  </div>
                ),
              )}
            </div>

            <div className="deep-action-card avoid">
              <span>
                NOT YET
              </span>

              <h3>
                지금은 피해주세요
              </h3>

              {deepResult.avoidActions.map(
                (action, index) => (
                  <div
                    className="deep-action-row"
                    key={index}
                  >
                    <b>×</b>
                    <p>{action}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* 06 MESSAGE GUIDE */}
        <section className="deep-section">
          <div className="deep-section-number">
            06
          </div>

          <span className="deep-section-label">
            MESSAGE GUIDE
          </span>

          <h2>
            실제로 연락한다면
            <br />
            이렇게 말해보세요.
          </h2>

          <p className="deep-section-intro">
            지금 두 사람의 거리감을 기준으로
            부담을 크게 만들지 않는 표현을
            골라봤어요.
          </p>

          <div className="deep-message-group">
            <span className="deep-message-group-label">
              TRY SAYING
            </span>

            {deepResult.recommendedMessages.map(
              (message, index) => (
                <article
                  className="deep-message-card"
                  key={index}
                >
                  <span className="deep-message-index">
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      '0',
                    )}
                  </span>

                  <p>“{message}”</p>
                </article>
              ),
            )}
          </div>

          <div className="deep-message-group avoid-message-group">
            <span className="deep-message-group-label">
              NOT YET
            </span>

            <h3>
              지금은 이런 말은
              피하는 게 좋아요.
            </h3>

            {deepResult.avoidMessages.map(
              (message, index) => (
                <article
                  className="deep-message-card deep-message-avoid"
                  key={index}
                >
                  <span>×</span>
                  <p>“{message}”</p>
                </article>
              ),
            )}
          </div>
        </section>

        {/* 07 WATCH SIGNALS */}
        <section className="deep-section">
          <div className="deep-section-number">
            07
          </div>

          <span className="deep-section-label">
            WATCH SIGNALS
          </span>

          <h2>
            앞으로는 이 세 가지를
            <br />
            지켜보세요.
          </h2>

          <p className="deep-section-intro">
            지금의 점수보다 중요한 건 앞으로
            상대의 행동이 어느 방향으로
            변하는지예요.
          </p>

          <div className="watch-signal-list">
            {deepResult.watchSignals.map(
              (signal, index) => (
                <article
                  className="watch-signal"
                  key={index}
                >
                  <div>
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      '0',
                    )}
                  </div>

                  <p>{signal}</p>
                </article>
              ),
            )}
          </div>
        </section>

        {/* 08 RELATIONSHIP OUTLOOK */}
        <section className="deep-section scenario-section">
          <div className="deep-section-number">
            08
          </div>

          <span className="deep-section-label">
            RELATIONSHIP OUTLOOK
          </span>

          <h2>
            지금 두 사람은
            <br />
            어디쯤 와 있을까요?
          </h2>

          <div className="relationship-current-card">
            <span>
              CURRENT
            </span>

            <h3>
              지금의 관계
            </h3>

            <p>
              {deepResult.relationshipScenario}
            </p>
          </div>

          <div className="deep-outlook-divider">
            <span />
            <p>
              앞으로 상대의 행동에 따라
            </p>
            <span />
          </div>

          <div className="relationship-outlook-list">
            <article className="relationship-outlook-card positive">
              <span>
                CLOSER
              </span>

              <h3>
                자발적인 행동이
                늘어난다면
              </h3>

              <p>
                {deepResult.positiveScenario}
              </p>
            </article>

            <article className="relationship-outlook-card neutral">
              <span>
                SAME
              </span>

              <h3>
                지금과 비슷한 흐름이
                계속된다면
              </h3>

              <p>
                {deepResult.neutralScenario}
              </p>
            </article>

            <article className="relationship-outlook-card negative">
              <span>
                DISTANT
              </span>

              <h3>
                연락과 대화까지
                줄어든다면
              </h3>

              <p>
                {deepResult.negativeScenario}
              </p>
            </article>
          </div>
        </section>

        {/* FINAL NOTE */}
        <section className="deep-final-section">
          <span className="deep-final-label">
            BETWEEN US · FINAL NOTE
          </span>

          <p className="deep-final-eyebrow">
            이 리포트에서 가장 중요하게
            남겨둘 한 가지
          </p>

          <h2>
            지금 이 관계에서
            <br />
            기억해야 할 것
          </h2>

          <p className="deep-final-copy">
            {deepResult.finalAdvice}
          </p>
        </section>

        <footer className="deep-result-footer">
          <span>
            BETWEEN US
          </span>

          <p>
            이 분석은 상대의 마음을
            단정하는 것이 아니라,
            당신이 들려준 행동의 패턴을
            바탕으로 만들어졌어요.
          </p>

          <button
            onClick={() =>
              navigate('/')
            }
          >
            새로운 이야기 분석하기
          </button>
        </footer>
      </section>
    </main>
  )
}

export default DeepResultPage