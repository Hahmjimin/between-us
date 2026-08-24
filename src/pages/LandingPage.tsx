import { useNavigate } from 'react-router-dom'
import '../styles/global.css'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="app-page landing-page">
      <div className="page-bg">
        <div className="page-glow" />
        <div className="page-noise" />
      </div>

      <div className="page-inner">
        <header
          style={{
            textAlign: 'center',
            paddingTop: '8px',
            fontSize: '10px',
            letterSpacing: '.38em',
            color: 'rgba(255,255,255,.42)',
          }}
        >
          BETWEEN US
        </header>

        <section
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div className="landing-heart">
            <span className="landing-ring landing-ring-1" />
            <span className="landing-ring landing-ring-2" />
            <span className="landing-ring landing-ring-3" />

            <div className="landing-heart-core">♥</div>
          </div>

          <p
            style={{
              margin: '8px 0 18px',
              color: 'rgba(255,255,255,.48)',
              fontSize: '13px',
            }}
          >
            말하지 않아도 보이는 마음이 있어요
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: '46px',
              lineHeight: 1.25,
              fontWeight: 300,
              letterSpacing: '-.065em',
            }}
          >
            너는 나를
            <br />

            <strong
              style={{
                fontWeight: 600,
                background:
                  'linear-gradient(90deg,#fff,#f3c4dd,#d991bb)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              어떻게 생각해?
            </strong>
          </h1>

          <p
            style={{
              margin: '30px 0 0',
              fontSize: '13px',
              lineHeight: 1.9,
              fontWeight: 300,
              color: 'rgba(255,255,255,.45)',
            }}
          >
            연락의 빈도, 말투, 거리감,
            <br />
            그리고 당신이 기억하는 작은 행동들.
            <br />
            두 사람 사이에 나타나는 신호를 따라가 보세요.
          </p>
        </section>

        <section className="bottom-actions">
          <p
            style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,.4)',
              fontSize: '11px',
            }}
          >
            ✦ 약 3분이면 확인할 수 있어요
          </p>

          <button
            className="primary-button"
            onClick={() => navigate('/relationship')}
          >
            그 사람의 마음 확인하기 →
          </button>

          <p
            style={{
              marginTop: '12px',
              textAlign: 'center',
              fontSize: '10px',
              color: 'rgba(255,255,255,.22)',
            }}
          >
            입력한 행동을 기반으로 관계의 패턴을 분석해요
          </p>
        </section>
      </div>
    </main>
  )
}

export default LandingPage