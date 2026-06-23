/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F4EC",
        surface: "#FFFFFF",
        primary: "#BF1A1A",
        primaryBg: "#FAEAEA",
        pink: "#F2AEBB",
        pinkDark: "#D4849A",
        creamDark: "#E8E0CE",
        text: "#2A1A1A",
        textMuted: "#7A5555",
        success: "#1A7A4A",
        successBg: "#EAFAF1",
        border: "#E8E0CE",
      },
      boxShadow: {
        card: "0px 2px 8px rgba(42, 26, 26, 0.06)",
      },
      borderRadius: {
        card: 16,
        input: 12,
        badge: 8,
        button: 12,
        avatar: 9999,
      },
    },
  },
  plugins: [],
};
