/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'inner-lg': 'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'
      }
    },
    fontFamily: {
      'Poppins': 'Poppins',
      'PoppinsBold': 'PoppinsBold'
    },
    colors: {
      'light': '#FBF8F3',
      'white': '#ffffff',
      'black': '#000000',
      'light-gray': '#D4D4D4',
      'neutral-gray': '#D9D9D9',
      'light-violet': '#EADDFF',
      'dark-violet': '#A88CD6',
      'extralight-green': '#DEE7D2',
      'light-green': '#B9D1A7',
      'mid-green': '#B8D0A7',
      'neutral-green': '#77A95C',
      'dark-green': '#34810B',
      'light-red': '#F5D2CE',
      'mid-red': '#EC9B98',
      'dark-red': '#DE3E3E',
      'light-orange': '#FCD0A7',
      'light-beige': '#D9D1C3',
      'neutral-beige': '#F3E6D6'


    }
  },
  plugins: [],
}

