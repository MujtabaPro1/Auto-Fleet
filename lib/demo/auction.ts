export const getAuctionEndAt = (startAtIso: string, durationMinutes: number): string => {
  const startMs = new Date(startAtIso).getTime()
  const endMs = startMs + durationMinutes * 60 * 1000
  return new Date(endMs).toISOString()
}

export const isAuctionActive = (startAtIso?: string, durationMinutes?: number, now: Date = new Date()): boolean => {
  if (!startAtIso || !durationMinutes) return false
  const start = new Date(startAtIso).getTime()
  const end = start + durationMinutes * 60 * 1000
  const t = now.getTime()
  return t >= start && t < end
}

export const getAuctionRemainingMs = (startAtIso?: string, durationMinutes?: number, now: Date = new Date()): number | null => {
  if (!startAtIso || !durationMinutes) return null
  const start = new Date(startAtIso).getTime()
  const end = start + durationMinutes * 60 * 1000
  return end - now.getTime()
}

export const formatRemaining = (remainingMs: number | null): string => {
  if (remainingMs === null) return '-'
  if (remainingMs <= 0) return 'Ended'

  const totalSeconds = Math.floor(remainingMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const hh = String(hours).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')

  return `${hh}:${mm}:${ss}`
}
