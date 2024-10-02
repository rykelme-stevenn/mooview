/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/screens/Login.tsx',
    './src/screens/Register.tsx',
    './src/screens/Home.tsx',
    './src/screens/OpenedMovie.tsx',
    './src/screens/CreateMovie.tsx',
    './src/components/Input.tsx',
    './src/components/Logo.tsx',
    './src/components/PrimaryButton.tsx',
    './src/components/SecondaryButton.tsx',
    './src/components/Heading.tsx',
    './src/components/Category.tsx',
    './src/components/Movie.tsx',
    './src/components/HeaderBack.tsx',
    './src/components/LoginCard.tsx',
    './src/components/RateMovie.tsx',
    './App.tsx'
  ],
  theme: {
    extend: {},
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#374657',
      'subgrey': '#425265',
      'gray-light': '#d3dce6',
      'black': '#141414',
      'white': '#ffffff',
      'primary': "#932192",
      "danger": "#dc3545"

    },
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif']
    }
  },
  plugins: [],
}

