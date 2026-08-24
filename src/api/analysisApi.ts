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
}

export async function requestAnalysis(
  request: AnalysisRequest,
): Promise<AnalysisResponse> {
  const response = await fetch(
    'http://localhost:8080/api/analysis',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    },
  )

  if (!response.ok) {
    throw new Error('분석 요청에 실패했습니다.')
  }

  return response.json()
}