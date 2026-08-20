/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        surface: '#18181B',
        surfaceElevated: '#27272A',
        surfaceStrong: '#3F3F46',
        primary: '#8B5CF6',
        primaryHover: '#7C3AED',
        primaryPressed: '#6D28D9',
        textPrimary: '#FAFAFA',
        textSecondary: '#A1A1AA',
        border: '#27272A',
        success: '#10B981',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
