const { nextui } = require("@nextui-org/react");
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode:"class",
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "secondary-color": "#66c",
        "c-primary": "#7ca8c6",
        "body-bg": "#122638",
        "header-bg": "#0a1c30",
        "tab-bg": "#122638",
        primary: {
          100: "#f8d67a",
          200: "#f4aa5e",
          300: "#f88440",
          500:"#ff5f01",
        },
      },
    },
  },
  plugins: [nextui()],
};
export default config;
