'use client'

import { PropsWithChildren } from 'react'

type Props = {
  id: string
  en: string
  gu: string
  icon?: string
  ariaLabel: string
  active?: boolean
  onPress: () => void
}

export function BigButton(props: PropsWithChildren<Props>) {
  const { id, en, gu, icon, ariaLabel, active, onPress } = props

  return (
    <button
      id={`btn-${id}`}
      aria-label={ariaLabel}
      onClick={onPress}
      onTouchStart={(e) => {
        e.preventDefault()
        onPress()
      }}
      className={[
        'w-full h-32 sm:h-40 lg:h-44 rounded-2xl',
        'btn-surface btn-glow',
        active ? 'outline outline-4 outline-accent' : '',
        'flex items-center justify-center text-center select-none',
        'px-4 py-3 focus-visible:focus-ring'
      ].join(' ')}
    >
      <div className="flex flex-col items-center gap-3">
        {icon ? (
          <span className="text-4xl sm:text-5xl" aria-hidden>
            {icon}
          </span>
        ) : null}
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl sm:text-3xl font-bold leading-tight tracking-wide">
            {en}
          </span>
          <span className="text-xl sm:text-2xl opacity-95 leading-tight font-gu" lang="gu-IN">
            {gu}
          </span>
        </div>
      </div>
    </button>
  )
}



