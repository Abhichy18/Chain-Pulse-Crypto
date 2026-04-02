/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#080A06",
        acid: "#C8F400",
        electric: "#00FF87",
        panel: "#0D110C",
        offwhite: "#EEFCE8"
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        display: ["Outfit", "sans-serif"],
        drama: ["Instrument Serif", "serif"],
        mono: ["Fira Code", "monospace"],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #C8F400, #00FF87)',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'scroll-left': 'scroll-left 30s linear infinite',
      }
    },
  },
  plugins: [],
}
