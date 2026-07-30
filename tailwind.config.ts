import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        ink: '#111111',
        bone: '#F2EEE7',
        orange: '#F15A24',
        clay: '#C87552',
        fog: '#D9D3C9',
      },
    },
  },
  plugins: [],
};
export default config;
