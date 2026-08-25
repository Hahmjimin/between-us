import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const questions = [
  {
    id: 'contact',
    question: '평소에는 누가 먼저 연락하는 편인가요?',
    options: ['대부분 나', '비슷해', '대부분 상대'],
  },
  {
    id: 'offline',
    question: '직접 만났을 때는 상대의 태도가 어떤가요?',
    options: ['조금 거리감 있어', '평범해', '오히려 더 다정해'],
  },
  {
    id: 'continue',
    question: '대화가 끝날 것 같을 때 상대는 어떻게 하나요?',
    options: ['그대로 끝내', '상황마다 달라', '새 화제를 꺼내'],
  },
]

function FollowUpPage() {
  const navigate = useNavigate()

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] =
    useState<Record<string, string>>({})

  const question = questions[current]

  const handleSelect = (value: string) => {
    const nextAnswers = {
      ...answers,
      [question.id]: value,
    }

    setAnswers(nextAnswers)

    if (current === questions.length - 1) {
      sessionStorage.setItem(
        'followUpAnswers',
        JSON.stringify(nextAnswers),
      )

      navigate('/loading')
      return
    }

    setTimeout(() => {
      setCurrent((prev) => prev + 1)
    }, 250)
  }

  return (
    <main className="page followup-page">
      <div className="followup-container">
        <div className="followup-progress">
          <div>
            <div
              style={{
                width: `${
                  ((current + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />
          </div>

          <span>
            {current + 1} / {questions.length}
          </span>
        </div>

        <span className="step-label">
          조금만 더 알려주세요
        </span>

        <h1
          className="followup-title"
          style={{
            fontSize:
              current === 2
                ? 'clamp(24px, 3.2vw, 32px)'
                : 'clamp(26px, 3.6vw, 36px)',
            lineHeight: 1.4,
          }}
        >
          {question.question}
        </h1>

        <p className="followup-description">
          앞서 들려준 이야기를 더 정확하게 이해하기
          위한 질문이에요.
        </p>

        <div className="followup-options">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() =>
                handleSelect(option)
              }
            >
              <span>{option}</span>
              <span>›</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

export default FollowUpPage