/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Para procesar todos los archivos en src
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'Average Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

