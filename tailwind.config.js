/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-dark': '#6153cc',
        'text-light': '#44ffd1',
        'second-text-dark':'#AAB0B9',
        'second-text-light':'#AAB0B9',
        'bg-dark': '#000',
        'bg-light': '#F4F5F8',
        'bg-button-light':'#01756A',
        'bg-button-dark':'#01756A',
        'text-button-light':'#FFFFFF',
        'text-button-dark':'#FFFFFF',
      },
    },
  },
  plugins: [],
};
