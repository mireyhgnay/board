// components/posts/PostCard.tsx
// ------------------------------
// 게시글 목록에서 각 게시글을 카드 형태로 보여주는 컴포넌트
// (현재는 posts/page.tsx에서 인라인으로 렌더링 중, 추후 이 컴포넌트로 교체 예정)

import Link from "next/link";
import { formatDate } from "@/lib/utils/format";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="group card p-5 transition-all duration-150 hover:border-indigo-300 hover:shadow-sm dark:hover:border-indigo-500/50"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate group-hover:text-indigo-600 dark:text-zinc-100 dark:group-hover:text-indigo-400 transition-colors">
            {post.title}
          </h3>
          <p className="mt-1.5 text-sm text-slate-500 line-clamp-2 dark:text-zinc-400">
            {post.content}
          </p>
          <p className="mt-3 text-xs text-slate-400 dark:text-zinc-500">
            {formatDate(post.created_at)}
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-4 mt-0.5 shrink-0 text-slate-300 group-hover:text-indigo-500 dark:text-zinc-600 dark:group-hover:text-indigo-400 transition-colors"
        >
          <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
        </svg>
      </div>
    </Link>
  );
}
