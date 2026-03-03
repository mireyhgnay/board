import type { Config } from "tailwindcss";

const config: Config = {
  // class 전략: <html class="dark"> 일 때 다크모드 활성화
  // (system은 OS 설정 따라가지만, class는 버튼으로 직접 토글 가능)
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.35s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
