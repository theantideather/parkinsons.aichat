import './globals.css'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Noto_Sans_Gujarati } from 'next/font/google'
import { SWRegister } from '../components/SWRegister'

export const metadata: Metadata = {
  title: 'Parkinson\'s Communication Helper',
  description: 'Bilingual touch communication app for care needs',
  manifest: '/manifest.webmanifest',
  icons: [{ rel: 'icon', url: '/icon-192.png' }]
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
}

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const notoGu = Noto_Sans_Gujarati({ subsets: ['gujarati'], display: 'swap', variable: '--font-noto-gu' })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={[`min-h-full bg-gradient-to-b from-black via-zinc-950 to-black`, inter.variable, notoGu.variable].join(' ')}>
        <SWRegister />
        {children}
      </body>
    </html>
  )
}



