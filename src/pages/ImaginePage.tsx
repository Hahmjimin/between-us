import { useNavigate } from 'react-router-dom'
import HeartSilhouette from '../components/HeartSilhouette'

function ImaginePage() {
  const navigate = useNavigate()

  return (
    <main className="imagine-page-v2">
      <div className="imagine-bg-v2">
        <div className="imagine-bg-glow-v2" />
        <span className="imagine-star-v2 star-v2-1">✦</span>
        <span className="imagine-star-v2 star-v2-2">✦</span>
        <span className="imagine-star-v2 star-v2-3">·</span>
        <span className="imagine-star-v2 star-v2-4">✦</span>
      </div>

      <button
        type="button"
        className="imagine-back-v2"
        onClick={() => navigate('/')}
        aria-label="뒤로가기"
      >
        ←
      </button>

      <div className="imagine-content-v2">
        <section className="imagine-heading-v2">
          <span className="imagine-step-v2">STEP 01</span>

          <h1>
            그 사람을
            <br />
            <strong>한 명 떠올려주세요.</strong>
          </h1>

          <p>
            설명하려 하지 않아도 괜찮아요.
            <br />
            지금 가장 먼저 떠오르는 한 사람이면 돼요.
          </p>
        </section>

        <section className="imagine-girl-area-v2">
          <HeartSilhouette />
        </section>

        <section className="imagine-bottom-v2">
          <p>
            얼굴이 떠오르면
            <br />
            다음 버튼을 눌러주세요.
          </p>

          <button
            type="button"
            className="imagine-next-v2"
            onClick={() => navigate('/relationship')}
            aria-label="다음"
          >
            →
          </button>

          <span className="imagine-progress-v2">1 / 6</span>
        </section>
      </div>
    </main>
  )
}

export default ImaginePage