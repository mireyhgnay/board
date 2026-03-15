// app/posts/[id]/edit/page.tsx
// -----------------------------
// 게시글 수정 페이지 (/posts/:id/edit)
// usePost로 기존 데이터 조회, useUpdatePost로 PUT /posts/{post_id} 호출

"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePost, useUpdatePost } from "@/hooks/usePosts";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { id: idStr } = use(params);
  const postId = Number(idStr);
  const router = useRouter();

  const { data: post, isLoading: isFetching, error: fetchError } = usePost(postId);
  const { mutate: update, isPending, error: updateError } = useUpdatePost();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 기존 게시글 데이터를 폼에 채우기
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    update(
      { id: postId, body: { title, content } },
      {
        onSuccess: () => router.push(`/posts/${postId}`),
      }
    );
  }

  // 로딩 상태
  if (isFetching) {
    return (
      <div className="flex justify-center py-20">
        <div className="size-6 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600 dark:border-zinc-600 dark:border-t-indigo-400" />
      </div>
    );
  }

  // 조회 에러
  if (fetchError || !post) {
    return (
      <div className="mx-auto max-w-2xl">
        <Link
          href="/posts"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
          </svg>
          목록으로
        </Link>
        <div className="card flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-sm text-red-500 dark:text-red-400">
            {fetchError instanceof Error ? fetchError.message : "게시글을 불러오지 못했습니다"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href={`/posts/${postId}`}
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

        {/* 수정 에러 메시지 */}
        {updateError && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {updateError.message}
          </div>
        )}

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
            <Link href={`/posts/${postId}`} className="btn-ghost">
              취소
            </Link>
            <button type="submit" disabled={isPending} className="btn-primary">
              {isPending ? "저장 중..." : "수정 완료"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
