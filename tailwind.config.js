// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust according to your project's file structure
  ],
  theme: {
    extend: {
      colors: {
        lightGray: "#F9F9F9",
        lightBeige: "#FAFAFA",

        charcoal: "#333333",

        softBlue: "#4A90E2",
        warmOrange: "#FF6F61",
        mintGreen: "#2ECC71",
      },
      fontFamily: {
        "geist-sans": ["GeistSans", "sans-serif"],
        "geist-mono": ["GeistMono", "monospace"],
      },
    },
  },
  plugins: [],
};
