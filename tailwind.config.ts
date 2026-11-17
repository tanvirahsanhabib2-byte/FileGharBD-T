import type { Config } from "tailwindcss";

// Design tokens: change colors here to re-theme the whole site.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#0C7C3E", dark: "#095F2F", light: "#1FAE5B", tint: "#E6F3EA" },
        navy: { DEFAULT: "#0B1F3A", 2: "#14304F", 3: "#31475F" },
        mist: "#F2F7F4",
        line: "#DCE6DF",
      },
      fontFamily: {
        sans: ['Poppins', '"Hind Siliguri"', "system-ui", "sans-serif"],
      },
      borderRadius: { card: "20px", pill: "999px" },
      maxWidth: { page: "1160px" },
    },
  },
  plugins: [],
};
export default config;
