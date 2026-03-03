// app/(auth)/signup/page.tsx
// ---------------------------
// 회원가입 페이지 (/signup)

"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return alert("비밀번호가 일치하지 않습니다");
    setIsLoading(true);
    // TODO: useAuth 훅의 signup() 함수 연결 예정
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
  }

  return (
    <div className="mx-auto max-w-sm py-8">
      <div className="card p-8">
        {/* 타이틀 */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-xl bg-indigo-600 dark:bg-indigo-500">
            <span className="text-sm font-bold text-white">B</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-zinc-50">
            계정 만들기
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
            무료로 시작하세요
          </p>
        </div>

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              이메일
            </label>
            <input
              type="email"
              className="input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              비밀번호
            </label>
            <input
              type="password"
              className="input"
              placeholder="8자 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              비밀번호 확인
            </label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary mt-2 w-full py-2.5"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                처리 중...
              </span>
            ) : (
              "회원가입"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-zinc-400">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
