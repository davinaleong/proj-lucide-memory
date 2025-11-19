/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'blue': '#2B7FFF',
        'dark-blue': '#1447E6', 
        'sky-blue': '#00A6F4',
        'slate': '#F1F5F9',
        'slate-200': '#e2e8f0',
        'orange': '#FF6900',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'game': '0 10px 25px rgba(43, 127, 255, 0.2)',
        'card': '0 4px 15px rgba(43, 127, 255, 0.3)',
      }
    },
  },
  plugins: [],
}

