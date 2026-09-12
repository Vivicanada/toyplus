import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Macaron Pastel Theme
        cream: "#FAF8F5",
        "pastel-yellow": "#FDE68A",
        "pastel-yellow-dark": "#F59E0B",
        "pastel-peach": "#FDBA74",
        "pastel-mint": "#A7F3D0",
        "pastel-blue": "#BAE6FD",
        "pastel-lavender": "#DDD6FE",
        "pastel-pink": "#FBCFE8",
        charcoal: "#374151",
        "soft-gray": "#9CA3AF",
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "soft-lg": "0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 10px -2px rgba(0, 0, 0, 0.04)",
        "warm": "0 4px 20px -2px rgba(251, 191, 36, 0.15)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
