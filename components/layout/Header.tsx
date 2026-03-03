// components/layout/Header.tsx
// -----------------------------
// 상단 공통 헤더 컴포넌트
// - 브랜드 로고 (좌측)
// - 네비게이션 링크 (우측, md 이상에서만 표시)
// - 다크/라이트 모드 토글 버튼 (항상 표시)
// - 햄버거 메뉴 버튼 (md 미만 모바일에서만 표시)
//
// "use client" 필수: useState, useTheme() 훅을 사용하기 때문

"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
    >
      <path
        fillRule="evenodd"
        d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
    >
      <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.592-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.592Z" />
    </svg>
  );
}

// 햄버거(열기) 아이콘
function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

// X(닫기) 아이콘
function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

export default function Header() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3.5">

        {/* 브랜드 로고 */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-slate-900 dark:text-zinc-100"
        >
          <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
            <span className="text-xs font-bold text-white">B</span>
          </div>
          <span className="font-semibold tracking-tight">Board</span>
        </Link>

        {/* 데스크탑 네비게이션 (md 이상에서만 표시) */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/posts" className="btn-ghost text-sm px-3 py-2">
            게시글
          </Link>
          <Link href="/login" className="btn-ghost text-sm px-3 py-2">
            로그인
          </Link>
          <Link href="/signup" className="btn-primary text-sm px-3 py-2 ml-1">
            회원가입
          </Link>

          {/* 다크/라이트 모드 토글 */}
          <button
            onClick={toggle}
            aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
            className="ml-2 flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors duration-150"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* 모바일 우측 버튼 영역 (md 미만에서만 표시) */}
        <div className="flex md:hidden items-center gap-1">
          {/* 테마 토글 */}
          <button
            onClick={toggle}
            aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
            className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors duration-150"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* 햄버거 / 닫기 버튼 */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors duration-150"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
          <nav className="mx-auto max-w-4xl flex flex-col px-4 py-3 gap-1">
            <Link
              href="/posts"
              onClick={closeMenu}
              className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
            >
              게시글
            </Link>
            <Link
              href="/login"
              onClick={closeMenu}
              className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              onClick={closeMenu}
              className="mt-1 flex items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors"
            >
              회원가입
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
