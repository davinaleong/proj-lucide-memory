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
    },
  },
  plugins: [],
}

