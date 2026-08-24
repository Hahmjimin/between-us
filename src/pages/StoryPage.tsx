import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function StoryPage() {
  const navigate = useNavigate()
  const [story, setStory] = useState('')

  const handleNext = () => {
    if (story.trim().length < 20) return

    sessionStorage.setItem('relationshipStory', story.trim())
    navigate('/follow-up')
  }

  return (
    <main className="page story-page">
      <div className="story-container">
        <span className="step-label">STEP 02</span>

        <h1 className="story-title">
          최근 그 사람 때문에
          <br />
          <strong>가장 신경 쓰였던 일은?</strong>
        </h1>

        <p className="story-description">
          사소한 일이어도 괜찮아요.
          <br />
          있었던 일을 그대로 들려주세요.
        </p>

        <div className="story-example">
          <span>예를 들면</span>

          <p>
            “평소에는 먼저 연락하는데 어제는 읽고 답장이 없었어요.
            그런데 오늘은 먼저 말을 걸었어요.”
          </p>
        </div>

        <div className="story-input-wrap">
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="그 사람과 있었던 일을 자유롭게 적어주세요."
            maxLength={1000}
          />

          <div className="story-count">
            {story.length} / 1000
          </div>
        </div>

        <p className="story-tip">
          이름, 전화번호, 주소처럼 개인을 식별할 수 있는 정보는 적지 마세요.
        </p>

        <button
          className="primary-button story-next"
          disabled={story.trim().length < 20}
          onClick={handleNext}
        >
          <span>이 이야기로 분석하기</span>
          <span>→</span>
        </button>
      </div>
    </main>
  )
}

export default StoryPage