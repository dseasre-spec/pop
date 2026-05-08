module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F4EF',
        foreground: '#1A3328',
        primary: '#1B5E3B',
        'primary-foreground': '#F7F4EF',
        secondary: '#C4A265',
        card: '#FFFFFF',
        muted: '#EDE9E2',
        'muted-foreground': '#7A8E86',
        border: '#E5DFD6',
        destructive: '#EF4444',
      },
      fontFamily: {
        'tajawal': ['Tajawal'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      spacing: {
        '18': '72px',
      }
    },
  },
  plugins: [],
}
