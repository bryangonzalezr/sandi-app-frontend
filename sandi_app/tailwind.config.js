/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'Poppins': 'Poppins',
      'PoppinsBold': 'PoppinsBold'
    },
    colors: {
      'white': '#FFFFFF',
      'light': '#FBF8F3',
      'black': '#000000',
      'grey': '#D9D9D9',
      'light-grey': '#FD9D1C3',
      'lightgreen': '#B9D1A7',
      'darkgreen': '#3b7a57',
      'neutral-light': '#F0EFEB',
      'warm-beige': '#E9DBCD',
      'pink': '#ECC4DC',
      'lavender': '#EBE0FE',
      'bold-red': '#DE3E3E',
      'light-green': '#B7D0A8',
      'forest-green': '#76A95C',
      'violet': '#311B58',
      'beige': "#F4E7D6"
    }
  },
  plugins: [],
}

