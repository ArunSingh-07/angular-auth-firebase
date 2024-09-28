/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'secondary': "#6C6C6C",
        'icons': "#6C6C6C",
        'placeholder': " #ADADAF",
        'primary':"#363636"
      }
    },
  },
  plugins: [],
}


