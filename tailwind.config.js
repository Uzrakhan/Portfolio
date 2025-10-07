/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Define your primary blue for links and highlights
        primary: '#3b82f6', // Bright Blue (similar to your screenshot)
        // Define a base dark background color
        background: '#0a0a0a',
        // Define a dark text/neutral color for body copy
        neutral: '#a0a0a0', 
      },
      fontFamily: {
        // Use a serif font for headings (like your previous setup)
        serif: ['Georgia', 'serif'], 
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

