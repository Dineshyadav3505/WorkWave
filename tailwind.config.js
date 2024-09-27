/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-dark': '#FFFFFF',
        'text-light': '#000000',
        'second-text-dark':'#AAB0B9',
        'second-text-light':'#AAB0B9',
        'bg-dark': '#3C3D37',
        'bg-light': '#EBF8FF',
        'bg-button-light':'#01756A',
        'bg-button-dark':'#01756A',
        'text-button-light':'#FFFFFF',
        'text-button-dark':'#FFFFFF',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        kalnia: ['Kalnia', 'sans-serif'], 

      },
    },
  },
  plugins: [],
};
