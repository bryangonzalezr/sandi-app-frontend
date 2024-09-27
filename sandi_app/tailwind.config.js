/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'lightgreen': '#78f0a2',
      'darkgreen': '#3b7a57',
      'neutral-light': '#F0EFEB',
      'warm-beige': '#E9DBCD',
      'pink': '#ECC4DC',
      'lavender': '#EBE0FE',
      'bold-red': '#DE3E3E',
      'light-green': '#B7D0A8',
      'forest-green': '#76A95C',
      'violet': '#311B58',
    }
  },
  plugins: [],
}

