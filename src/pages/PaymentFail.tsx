import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

function PaymentFail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const message =
    searchParams.get('message') ??
    '결제가 완료되지 않았어요.'

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#070407',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#ffffff',
      }}
    >
      <section
        style={{
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: '14px',
            opacity: 0.65,
            marginBottom: '14px',
          }}
        >
          BETWEEN US
        </p>

        <h1
          style={{
            fontSize: '25px',
            marginBottom: '14px',
          }}
        >
          결제를 완료하지 못했어요
        </h1>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.7,
            opacity: 0.75,
            marginBottom: '28px',
          }}
        >
          {message}
        </p>

        <button
          type="button"
          onClick={() =>
            navigate('/result', {
              replace: true,
            })
          }
          style={{
            width: '100%',
            height: '56px',
            border: 0,
            borderRadius: '16px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 700,
          }}
        >
          다시 결제하기
        </button>
      </section>
    </main>
  )
}

export default PaymentFail