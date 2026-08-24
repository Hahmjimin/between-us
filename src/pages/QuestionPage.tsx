import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import { questions } from '../data/questions'

function QuestionPage() {
  const navigate = useNavigate()

  const [questionIndex, setQuestionIndex] =
    useState(0)

  const [selectedOption, setSelectedOption] =
    useState<string | null>(null)

  const [answers, setAnswers] = useState<
    Record<number, string>
  >({})

  const question = questions[questionIndex]

  const handleNext = () => {
    if (!selectedOption) {
      return
    }

    const updatedAnswers = {
      ...answers,
      [question.id]: selectedOption,
    }

    setAnswers(updatedAnswers)

    if (
      questionIndex ===
      questions.length - 1
    ) {
      sessionStorage.setItem(
        'answers',
        JSON.stringify(updatedAnswers),
      )

      navigate('/loading')

      return
    }

    setQuestionIndex(
      (prev) => prev + 1,
    )

    setSelectedOption(null)
  }

  const handlePrevious = () => {
    if (questionIndex === 0) {
      navigate('/relationship')

      return
    }

    setQuestionIndex(
      (prev) => prev - 1,
    )

    setSelectedOption(null)
  }

  return (
    <main className="app-page">
      <div className="page-bg">
        <div className="page-glow" />
        <div className="page-noise" />
      </div>

      <div className="page-inner">
        <div className="top-bar">
          <button
            className="back-button"
            onClick={handlePrevious}
          >
            ‹
          </button>

          <ProgressBar
            current={questionIndex + 1}
            total={questions.length}
          />
        </div>

        <section className="question-section fade-up">
          <span className="question-number">
            Q{question.id}
          </span>

          <h1>
            {question.title
              .split('\n')
              .map((text, index) => (
                <span key={index}>
                  {text}
                  <br />
                </span>
              ))}
          </h1>

          <p>{question.description}</p>

          <div className="question-options">
            {question.options.map(
              (option) => (
                <button
                  key={option.id}
                  className={`question-option ${
                    selectedOption ===
                    option.id
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() =>
                    setSelectedOption(
                      option.id,
                    )
                  }
                >
                  <span className="option-icon">
                    {option.icon}
                  </span>

                  <strong>
                    {option.label}
                  </strong>
                </button>
              ),
            )}
          </div>
        </section>

        <section className="question-tip">
          <strong>TIP</strong>

          <span>
            너무 고민하지 말고, 가장
            자주 떠오르는 답을
            선택하세요.
          </span>
        </section>

        <section className="question-buttons">
          <button
            className="secondary-button"
            onClick={handlePrevious}
          >
            이전
          </button>

          <button
            className="primary-button"
            disabled={!selectedOption}
            onClick={handleNext}
          >
            {questionIndex ===
            questions.length - 1
              ? '분석하기'
              : '다음'}
          </button>
        </section>
      </div>
    </main>
  )
}

export default QuestionPage