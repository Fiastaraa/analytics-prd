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
        "primary-bg": "#FAEAEA",
        pink: "#F2AEBB",
        "pink-dark": "#D4849A",
        "cream-dark": "#E8E0CE",
        text: "#2A1A1A",
        "text-muted": "#7A5555",
        success: "#1A7A4A",
        "success-bg": "#EAFAF1",
      },
      boxShadow: {
        card: "0px 2px 8px rgba(42, 26, 26, 0.06)",
      },
      fontSize: {
        "heading-xl": [24, { fontWeight: "700" }],
        "heading-lg": [20, { fontWeight: "600" }],
        "heading-md": [16, { fontWeight: "600" }],
        body: [14, { fontWeight: "400" }],
        caption: [12, { fontWeight: "400" }],
        "metric-number": [28, { fontWeight: "700" }],
        badge: [11, { fontWeight: "500" }],
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
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
