/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        maple: {
          dark: '#0f172a',
          card: '#1e293b',
          border: '#334155',
          sol: '#38bdf8',      // Sol Erda light blue
          fragment: '#fbbf24', // Sol Erda Fragment amber/gold
          origin: '#a855f7',   // Purple
          mastery: '#3b82f6',  // Blue
          boost: '#10b981',    // Emerald
          common: '#f43f5e'    // Rose
        }
      }
    },
  },
  plugins: [],
}
