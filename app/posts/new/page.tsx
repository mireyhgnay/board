// app/posts/new/page.tsx
// -----------------------
// 게시글 작성 페이지 (/posts/new)
// 폼 입력 상태가 필요하므로 Client Component

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: lib/api/posts.ts의 createPost() 연결 예정
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    router.push("/posts");
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* 상단 네비게이션 */}
      <Link
        href="/posts"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
          <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
        </svg>
        목록으로
      </Link>

      <div className="card p-6">
        <h1 className="mb-6 text-xl font-bold text-slate-900 dark:text-zinc-50">
          새 글 쓰기
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* 제목 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              제목
            </label>
            <input
              type="text"
              className="input text-base"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* 내용 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              내용
            </label>
            <textarea
              className="input min-h-48 resize-y leading-relaxed"
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* 버튼 영역 */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <Link href="/posts" className="btn-ghost">
              취소
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? "저장 중..." : "게시글 등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
