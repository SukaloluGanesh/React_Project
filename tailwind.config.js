const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    safelist: [
      ...labelsClasses.map((lbl) => `bg-${lbl}-200`), 
      ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
    ],
  },
  darkMode: false, 
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};