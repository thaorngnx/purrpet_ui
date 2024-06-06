/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      animation: {
        'rotate': 'rotate 0.3s ease-out forwards',
        'wobble': 'wobble 0.5s ease-in-out',
      },
      keyframes: {
        'rotate': {
          '0%': { transform: 'rotateZ(-90deg)' },
          '100%': { transform: 'rotateZ(0deg)' },
        },
        'wobble': {
          '0%, 100%': { transform: 'translateX(0%)',transitionDuration: '0.5s' },
          '15%': { transform: 'translateX(-25%) rotate(-5deg)',transitionDuration: '0.5s'},
          '30%': { transform: 'translateX(20%) rotate(3deg)',transitionDuration: '0.5s'},
          '45%': { transform: 'translateX(-15%) rotate(-3deg)' ,transitionDuration: '0.5s'},
          '60%': { transform: 'translateX(10%) rotate(2deg)', transitionDuration: '0.5s' },
          '75%': { transform: 'translateX(-5%) rotate(-1deg)', transitionDuration: '0.5s' },
        },
      },
    },
  },
  plugins: [],
}

