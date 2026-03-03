// components/layout/ThemeProvider.tsx
// -------------------------------------
// 다크모드/라이트모드 상태를 앱 전체에 공유하는 Context Provider
// "use client" 필수: useState, useEffect, localStorage 사용하기 때문
//
// 사용 패턴:
//   layout.tsx에서 <ThemeProvider>로 전체를 감싸면
//   어느 컴포넌트에서나 useTheme()으로 현재 테마와 토글 함수를 꺼낼 수 있음

"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

// Context 기본값 (Provider 밖에서 잘못 사용될 때를 대비한 fallback)
const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // 마운트 시 localStorage에 저장된 테마를 읽어 적용
    // 저장된 값이 없으면 기본값 'dark' 사용
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial: Theme = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    // <html> 태그에 "dark" 클래스를 추가/제거해서 Tailwind 다크모드 활성화
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 어느 Client Component에서나 현재 테마와 토글 함수를 꺼낼 수 있는 훅
export function useTheme() {
  return useContext(ThemeContext);
}
