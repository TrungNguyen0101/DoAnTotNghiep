/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  theme: {
    extend: {
      screens: {
        mb: "480px",

        sm: "576px",

        md: "768px",

        lg: "992px",

        xl: "1200px",

        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
