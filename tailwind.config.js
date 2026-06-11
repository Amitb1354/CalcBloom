/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mint:    { DEFAULT: '#4DADA0', light: '#E8F5F0', mid: '#A8D8D3' },
        peach:   { DEFAULT: '#F4845F', light: '#FFF0E8', mid: '#F9C4AC' },
        lavender:{ DEFAULT: '#7C6FCD', light: '#F0EEFF', mid: '#C4BEED' },
        slate:   { DEFAULT: '#1E2A35', mid: '#4A5A68', soft: '#8A99A6' },
        cream:   '#FAFAF8',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        popIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92) translateY(6px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        'pop-in': 'popIn 0.25s ease-out forwards',
      },
    },
  },
  plugins: [],
}
