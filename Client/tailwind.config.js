/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main": "#21003f",
        "main-2": "#e92163",
        "main-3": "#cf1e72",
        "main-4": "#b61c82",
        "main-5": "#9d1a92"
      },
      minWidth: {
        "min-box": "6rem"
      }
    },
  },
  plugins: [],
}

