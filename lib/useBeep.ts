import { useMemo } from 'react'

export function useBeep() {
  const ctx = useMemo(() => {
    if (typeof window === 'undefined') return null
    const AudioContextCtor = (window as any).AudioContext || (window as any).webkitAudioContext
    try {
      return AudioContextCtor ? new AudioContextCtor() : null
    } catch {
      return null
    }
  }, [])

  return (durationSeconds = 0.08, freq = 880) => {
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.value = 0.1
    osc.connect(gain)
    gain.connect(ctx.destination)
    const now = ctx.currentTime
    osc.start(now)
    osc.stop(now + durationSeconds)
  }
}



