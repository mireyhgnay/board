// app/posts/[id]/page.tsx
// ------------------------
// 게시글 상세 페이지 (/posts/:id)
// usePost 훅으로 GET /posts/{post_id} 호출

"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePost, useDeletePost } from "@/hooks/usePosts";
import { formatDateTime } from "@/lib/utils/format";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id: idStr } = use(params);
  const postId = Number(idStr);
  const router = useRouter();
  const { data: post, isLoading, error } = usePost(postId);
  const { mutate: remove, isPending: isDeleting } = useDeletePost();

  function handleDelete() {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    remove(postId, {
      onSuccess: () => router.push("/posts"),
    });
  }

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="size-6 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600 dark:border-zinc-600 dark:border-t-indigo-400" />
      </div>
    );
  }

  // 에러 상태
  if (error || !post) {
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
            {error instanceof Error ? error.message : "게시글을 불러오지 못했습니다"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* 뒤로 가기 */}
      <Link
        href="/posts"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
          <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
        </svg>
        목록으로
      </Link>

      <article className="card p-6">
        {/* 게시글 헤더 */}
        <header className="mb-6 border-b border-slate-100 pb-6 dark:border-zinc-800">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-50">
            {post.title}
          </h1>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-slate-400 dark:text-zinc-500">
              {formatDateTime(post.created_at)}
            </p>
            {/* 작성자 본인에게만 노출 예정 */}
            <div className="flex gap-2">
              <Link
                href={`/posts/${post.id}/edit`}
                className="btn-ghost py-1.5 px-3 text-xs"
              >
                수정
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </header>

        {/* 게시글 본문 */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed text-slate-700 dark:text-zinc-300">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
