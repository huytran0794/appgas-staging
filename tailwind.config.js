/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    extend: {
      colors: {
        "blue-ribbon": {
          DEFAULT: "#1765FD",
          50: "#CDDEFF",
          100: "#B9D0FE",
          200: "#90B6FE",
          300: "#689BFE",
          400: "#3F80FD",
          500: "#1765FD",
          600: "#024BDA",
          700: "#0138A2",
          800: "#01256B",
          900: "#001233",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
};
