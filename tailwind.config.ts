import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#fdf8ed',
        'cream-2': '#f5ede0',
        'green-900': '#1d5639',
        'green-800': '#256142',
        'green-700': '#2e7150',
        'green-100': '#e5f0ea',
        'gold-soft': '#d9b26a',
        'gold-dark': '#b8893b',
        'terracotta-100': '#f8ede5',
        'terracotta-500': '#c47e5a',
        'terracotta-700': '#9a5a35',
        'terracotta-900': '#6b3d1f',
        ink: '#1a1f1b',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-amiri)', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
