module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        "1/10": "10%",
        "9/10": "90%",
      },
      backgroundColor: {
        "app-black": "#121212",
      },
      backgroundImage: {
        radial: "radial-gradient(var(--tw-gradient-stops))", // ← Radial gradient
      },
    },
  },
  
  variants: {
    extend: {},
  },
  plugins: [],
};