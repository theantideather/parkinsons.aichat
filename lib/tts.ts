export type BilingualText = {
  en: string
  gu: string
  caretakersName?: string
}

let cachedVoices: SpeechSynthesisVoice[] | null = null

export function preloadVoices(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const synth = window.speechSynthesis
  // Trigger voice loading
  cachedVoices = synth.getVoices()
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = synth.getVoices()
  }
}

function pickVoice(langStartsWith: string): SpeechSynthesisVoice | undefined {
  const voices = cachedVoices ?? window.speechSynthesis.getVoices()
  const needle = langStartsWith.toLowerCase()
  // Prefer exact language (e.g., gu-IN), then any gu-*, then includes
  return (
    voices.find((v) => v.lang?.toLowerCase() === needle) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith(needle.split('-')[0] + '-')) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith(needle)) ||
    voices.find((v) => v.lang?.toLowerCase().includes(needle))
  )
}

function speakText(text: string, lang: string, rate = 1, pitch = 1, volume = 1): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve()
      return
    }
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    const voice = pickVoice(lang)
    if (voice) utterance.voice = voice
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume
    utterance.onend = () => resolve()
    utterance.onerror = () => resolve() // resolve to avoid blocking UI
    window.speechSynthesis.cancel() // ensure instant start
    window.speechSynthesis.speak(utterance)
  })
}

export async function speakBilingual(payload: BilingualText): Promise<void> {
  const { en, gu } = payload
  // English first (or switch order if needed later), then Gujarati with a real Gujarati voice when available
  await speakText(en, 'en-IN', 1, 1, 1)
  // Try Gujarati locale variants commonly exposed by browsers/OS
  const possibleGuLocales = ['gu-IN', 'gu', 'gu-Gujr-IN']
  for (const locale of possibleGuLocales) {
    const voice = pickVoice(locale)
    if (voice) {
      await speakText(gu, locale, 1, 1, 1)
      return
    }
  }
  // Fallback: Hindi voice can be more intelligible than English for Gujarati text in some setups
  const hindiFallback = pickVoice('hi-IN')
  if (hindiFallback) {
    await speakText(gu, 'hi-IN', 0.95, 1, 1)
    return
  }
  // Final fallback with default voice
  await speakText(gu, 'gu-IN', 1, 1, 1)
}



