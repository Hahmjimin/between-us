import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function PaymentSuccess() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [message, setMessage] =
    useState('결제 정보를 확인하고 있어요.')

  useEffect(() => {
    const paymentKey =
      searchParams.get('paymentKey')

    const orderId =
      searchParams.get('orderId')

    const amount =
      searchParams.get('amount')

    const savedOrderId =
      sessionStorage.getItem(
        'paymentOrderId',
      )

    const savedAmount =
      sessionStorage.getItem(
        'paymentAmount',
      )

    if (
      !paymentKey ||
      !orderId ||
      !amount
    ) {
      setMessage(
        '결제 정보를 확인할 수 없어요.',
      )
      return
    }

    if (
      savedOrderId !== orderId ||
      savedAmount !== amount
    ) {
      setMessage(
        '결제 정보가 일치하지 않아요.',
      )
      return
    }

    /*
     * 다음 단계에서 여기에서
     * Spring Boot 결제 승인 API를 호출한다.
     *
     * 지금은 Toss → successUrl 이동이
     * 정상적으로 되는지 먼저 확인한다.
     */

    sessionStorage.setItem(
      'paymentKey',
      paymentKey,
    )

    setMessage(
      '결제 요청이 정상적으로 완료됐어요.',
    )

    const timer = window.setTimeout(
      () => {
        navigate('/deep-result', {
          replace: true,
        })
      },
      1000,
    )

    return () => {
      window.clearTimeout(timer)
    }
  }, [navigate, searchParams])

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
          결제를 확인하고 있어요
        </h1>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.7,
            opacity: 0.8,
          }}
        >
          {message}
        </p>
      </section>
    </main>
  )
}

export default PaymentSuccess