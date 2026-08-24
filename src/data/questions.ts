export type QuestionOption = {
  id: string
  label: string
  icon: string
}

export type Question = {
  id: number
  title: string
  description: string
  options: QuestionOption[]
}

export const questions: Question[] = [
  {
    id: 1,
    title: '평소 누가 먼저\n연락하나요?',
    description: '가장 자주 일어나는 상황을 선택해주세요.',
    options: [
      {
        id: 'me',
        label: '내가 먼저',
        icon: '➤',
      },
      {
        id: 'same',
        label: '비슷해',
        icon: '=',
      },
      {
        id: 'other',
        label: '상대가 먼저',
        icon: '💬',
      },
    ],
  },

  {
    id: 2,
    title: '답장은 보통\n얼마나 빨리 오나요?',
    description: '평소의 대화 패턴을 떠올려보세요.',
    options: [
      {
        id: 'fast',
        label: '빠른 편',
        icon: '⚡',
      },
      {
        id: 'normal',
        label: '보통',
        icon: '◷',
      },
      {
        id: 'slow',
        label: '느린 편',
        icon: '…',
      },
    ],
  },

  {
    id: 3,
    title: '둘만 따로\n만난 적이 있나요?',
    description: '최근의 상황을 기준으로 선택해주세요.',
    options: [
      {
        id: 'many',
        label: '자주 있어',
        icon: '♥',
      },
      {
        id: 'once',
        label: '몇 번 있어',
        icon: '✦',
      },
      {
        id: 'none',
        label: '아직 없어',
        icon: '−',
      },
    ],
  },

  {
    id: 4,
    title: '상대가 먼저\n약속을 잡기도 하나요?',
    description: '상대방이 관계를 위해 움직이는지 떠올려보세요.',
    options: [
      {
        id: 'often',
        label: '자주 그래',
        icon: '✓',
      },
      {
        id: 'sometimes',
        label: '가끔 그래',
        icon: '◌',
      },
      {
        id: 'never',
        label: '거의 없어',
        icon: '×',
      },
    ],
  },

  {
    id: 5,
    title: '상대방은 자신의\n개인적인 이야기를 하나요?',
    description: '고민이나 일상에 대해 생각해보세요.',
    options: [
      {
        id: 'deep',
        label: '많이 해',
        icon: '♡',
      },
      {
        id: 'some',
        label: '조금 해',
        icon: '··',
      },
      {
        id: 'none',
        label: '거의 안 해',
        icon: '○',
      },
    ],
  },
]