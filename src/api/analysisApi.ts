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

export interface ApiErrorResponse {
  success?: boolean
  code?: string
  message?: string
}

export class AnalysisApiError extends Error {
  code: string
  status: number

  constructor(
    code: string,
    message: string,
    status: number,
  ) {
    super(message)

    this.name = 'AnalysisApiError'
    this.code = code
    this.status = status
  }
}

const API_BASE_URL = 'http://localhost:8080'

async function parseErrorResponse(
  response: Response,
): Promise<ApiErrorResponse | null> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

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
    const errorBody =
      await parseErrorResponse(response)

    throw new AnalysisApiError(
      errorBody?.code ?? 'ANALYSIS_ERROR',
      errorBody?.message ??
        '분석 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.',
      response.status,
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
    const errorBody =
      await parseErrorResponse(response)

    throw new AnalysisApiError(
      errorBody?.code ?? 'DEEP_ANALYSIS_ERROR',
      errorBody?.message ??
        '심층 분석 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.',
      response.status,
    )
  }

  return response.json()
}