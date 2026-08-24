export interface AnalysisRequest {
  relationshipType: string
  story: string
  followUpAnswers: Record<string, string>
}

export interface AnalysisResponse {
  valid: boolean
  reason: string | null

  signalScore: number
  headline: string

  interestLevel: string
  distanceLevel: string
  maintenanceLevel: string

  keySignal: string
  contrast: string

  contactInitiative: number
  conversationEngagement: number
  meetingInitiative: number
  emotionalOpenness: number
  distanceSignal: number
  relationshipMaintenance: number
}

export interface DeepAnalysisResponse {
  valid: boolean
  reason: string | null

  distancePattern: string

  positiveSignals: string[]

  hesitationReasons: string[]

  interpretationWarnings: string[]

  contactAdvice: string

  recommendedActions: string[]
  avoidActions: string[]

  recommendedMessages: string[]
  avoidMessages: string[]

  watchSignals: string[]

  relationshipScenario: string
  positiveScenario: string
  neutralScenario: string
  negativeScenario: string

  finalAdvice: string
}

export interface DeepAnalysisRequest {
  analysisRequest: AnalysisRequest
  freeResult: AnalysisResponse
}

const API_BASE_URL = 'http://localhost:8080'

export async function requestAnalysis(
  request: AnalysisRequest,
): Promise<AnalysisResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/analysis`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    },
  )

  if (!response.ok) {
    throw new Error(
      '분석 요청에 실패했습니다.',
    )
  }

  return response.json()
}

export async function requestDeepAnalysis(
  request: DeepAnalysisRequest,
): Promise<DeepAnalysisResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/analysis/deep`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    },
  )

  if (!response.ok) {
    throw new Error(
      '심층 분석 요청에 실패했습니다.',
    )
  }

  return response.json()
}