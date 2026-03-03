// app/layout.tsx
// ---------------
// 전체 앱의 최상위 레이아웃
//
// 핵심 포인트:
// 1. suppressHydrationWarning: 다크모드 인라인 스크립트가 html 클래스를
//    서버 렌더링 이후에 변경하므로 hydration 불일치 경고를 억제함
// 2. 인라인 <script>: 페이지 로드 즉시 실행되어 FOUC(테마 깜빡임) 방지
//    React가 마운트되기 전에 'dark' 클래스를 html에 적용함
// 3. ThemeProvider: 자식 컴포넌트가 useTheme()으로 테마 접근 가능

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Board | Frontend Goes Backend",
  description: "프론트 개발자의 풀스택 도전 - 게시판 프로젝트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: 인라인 스크립트가 class를 조작해서 생기는
    // 서버/클라이언트 HTML 불일치 경고를 무시하도록 설정
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/*
          FOUC(Flash of Unstyled Content) 방지 스크립트
          - React 마운트 이전에 동기적으로 실행됨
          - localStorage에 저장된 테마를 읽어 즉시 'dark' 클래스 적용
          - 이 스크립트가 없으면 라이트모드로 잠깐 깜빡인 후 다크모드로 바뀌는 현상 발생
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var stored = localStorage.getItem('theme');
                var theme = stored || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        {/* ThemeProvider로 감싸서 하위 컴포넌트가 useTheme() 사용 가능 */}
        <ThemeProvider>
          <Header />
          <main className="mx-auto max-w-4xl px-4 py-8 animate-fade-up">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
