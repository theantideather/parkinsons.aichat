'use client'

import { useEffect, useMemo, useState } from 'react'
import config from '../config/appConfig.json'
import { speakBilingual, preloadVoices } from '../lib/tts'
import { BigButton } from '../components/BigButton'
import { useBeep } from '../lib/useBeep'
import { sendNotificationStub } from '../lib/notifyStub'

type ButtonConfig = (typeof config)["buttons"][number]

export default function HomePage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const beep = useBeep()

  useEffect(() => {
    preloadVoices()
  }, [])

  const gridCols = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5'

  const buttons: ButtonConfig[] = useMemo(() => config.buttons, [])

  async function onPress(btn: ButtonConfig) {
    setActiveId(btn.id)
    // Audible notification tone (optional)
    beep(0.05)
    // Speak both languages immediately
    await speakBilingual({
      en: btn.enSpeech ?? btn.en,
      gu: btn.guSpeech ?? btn.gu,
      caretakersName: config.caretakerName
    })
    // Placeholder future notification
    void sendNotificationStub({ id: btn.id, en: btn.en, gu: btn.gu, timestamp: Date.now() })
    setTimeout(() => setActiveId((id) => (id === btn.id ? null : id)), 1000)
  }

  return (
    <main className="max-w-6xl mx-auto">
      <header className="p-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
          Mahesh Bhai's Communication Helper
        </h1>
        <p className="opacity-80 mt-2 text-base">English + Gujarati, large touch buttons</p>
      </header>

      <section className={gridCols}>
        {buttons.map((btn) => (
          <BigButton
            key={btn.id}
            id={btn.id}
            en={btn.en}
            gu={btn.gu}
            icon={btn.icon}
            ariaLabel={`${btn.en} / ${btn.gu}`}
            active={activeId === btn.id}
            onPress={() => onPress(btn)}
          />
        ))}
      </section>
    </main>
  )
}


