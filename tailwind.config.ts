import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",  // ←ここ重要！
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config