import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a84ff',
        accent: '#ffcc00',
        danger: '#ff3b30',
        success: '#34c759'
      }
    }
  },
  plugins: []
}

export default config


