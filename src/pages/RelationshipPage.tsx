import { useNavigate } from 'react-router-dom'

const relationships = [
  {
    id: 'some',
    title: '썸 타는 중',
    description: '서로 알아가고 있는 단계예요',
    icon: '♥',
  },
  {
    id: 'crush',
    title: '짝사랑 중',
    description: '나만 마음이 있는 것 같아요',
    icon: '♡',
  },
  {
    id: 'friend',
    title: '친구인데 애매해',
    description: '친구 같지만 뭔가 달라요',
    icon: '✦',
  },
  {
    id: 'couple',
    title: '연애 중',
    description: '사귀고 있는 사이예요',
    icon: '◆',
  },
  {
    id: 'ex',
    title: '헤어진 사이',
    description: '지금은 끝난 사이예요',
    icon: '◇',
  },
]

function RelationshipPage() {
  const navigate = useNavigate()

  const handleSelect = (id: string) => {
    sessionStorage.setItem('relationshipType', id)
    navigate('/story')
  }

  return (
    <main className="page form-page">
      <div className="form-container">
        <span className="step-label">STEP 01</span>

        <h1 className="form-title">
          두 사람은
          <br />
          어떤 사이인가요?
        </h1>

        <p className="form-description">
          지금 두 사람에게 가장 가까운 관계를 선택해주세요.
        </p>

        <div className="relationship-list">
          {relationships.map((item) => (
            <button
              key={item.id}
              className="relationship-card"
              onClick={() => handleSelect(item.id)}
            >
              <div className="relationship-icon">{item.icon}</div>

              <div className="relationship-copy">
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </div>

              <span className="relationship-arrow">›</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}

export default RelationshipPage