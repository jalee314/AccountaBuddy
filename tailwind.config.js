/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          beige: "#F5F5DC", // you can now use `bg-beige`
          sky: colors.sky,
        },
      },
    },
    plugins: [],
  };
  
  const colors = require('tailwindcss/colors')