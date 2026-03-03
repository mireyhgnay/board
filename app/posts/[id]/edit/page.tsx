// app/posts/[id]/edit/page.tsx
// -----------------------------
// 게시글 수정 페이지 (/posts/:id/edit)

"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { id } = use(params);
  const router = useRouter();

  // 더미 초기값 (실제로는 getPost(id)로 불러올 예정)
  const [title, setTitle] = useState("FastAPI 첫 라우터 만들기");
  const [content, setContent] = useState("오늘은 FastAPI에서 첫 번째 라우터를 만들어봤다.");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: lib/api/posts.ts의 updatePost() 연결 예정
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    router.push(`/posts/${id}`);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={`/posts/${id}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
          <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
        </svg>
        돌아가기
      </Link>

      <div className="card p-6">
        <h1 className="mb-6 text-xl font-bold text-slate-900 dark:text-zinc-50">
          글 수정
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              제목
            </label>
            <input
              type="text"
              className="input text-base"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              내용
            </label>
            <textarea
              className="input min-h-48 resize-y leading-relaxed"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Link href={`/posts/${id}`} className="btn-ghost">
              취소
            </Link>
            <button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? "저장 중..." : "수정 완료"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
