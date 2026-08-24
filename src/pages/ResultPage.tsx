import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnalysisResponse } from '../api/analysisApi'

function ResultPage() {
  const navigate = useNavigate()

  const result = useMemo<AnalysisResponse | null>(() => {
    const raw =
      sessionStorage.getItem('analysisResult')

    if (!raw) {
      return null
    }

    return JSON.parse(raw)
  }, [])

  const story =
    sessionStorage.getItem('relationshipStory') ?? ''

  if (!result) {
    return (
      <main className="page result-page">
        <section className="result-container">
          <p>
            분석 결과를 찾을 수 없어요.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate('/')}
          >
            처음으로 돌아가기
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="page result-page">
      <section className="result-container">
        <span className="result-label">
          BETWEEN US · SIGNAL REPORT
        </span>

        <p className="result-eyebrow">
          그 사람이 보여준 행동에서 나타난
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
            <span>관심 신호</span>
            <strong>
              {result.interestLevel}
            </strong>
          </div>

          <div>
            <span>거리두기 신호</span>
            <strong>
              {result.distanceLevel}
            </strong>
          </div>

          <div>
            <span>관계 유지 의지</span>
            <strong>
              {result.maintenanceLevel}
            </strong>
          </div>
        </div>

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
                ? `${story.slice(0, 150)}...`
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
              🔒 상대가 거리를 두는 순간의 공통점
            </div>

            <div>
              🔒 호감이 있어도 먼저 다가오지 않는 이유
            </div>

            <div>
              🔒 지금 먼저 연락해도 되는지
            </div>

            <div>
              🔒 앞으로 관찰해야 할 신호 3가지
            </div>

            <div>
              🔒 관계가 바뀔 가능성이 높은 순간
            </div>
          </div>

          <button
            className="premium-button"
            onClick={() =>
              alert(
                '결제 기능은 이후에 연결할 예정입니다.',
              )
            }
          >
            <span>
              전체 Signal Report 열기
              <small>
                개인화 심층 분석
              </small>
            </span>

            <strong>₩2,900</strong>
          </button>
        </section>
      </section>
    </main>
  )
}

export default ResultPage