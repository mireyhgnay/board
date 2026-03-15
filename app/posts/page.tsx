// app/posts/page.tsx
// -------------------
// 게시글 목록 페이지 (/posts)
// useInfiniteQuery 기반 무한스크롤로 20개씩 로드

"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import PostCard from "@/components/posts/PostCard";

export default function PostsPage() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();

  // 무한스크롤 감지용 요소
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "200px",
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [handleObserver]);

  // 모든 페이지의 게시글을 하나의 배열로 합침
  const posts = data?.pages.flatMap((page) => page.data) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  // 초기 로딩
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="size-6 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600 dark:border-zinc-600 dark:border-t-indigo-400" />
      </div>
    );
  }

  // 에러
  if (error) {
    return (
      <div className="card flex flex-col items-center gap-3 py-16 text-center">
        <p className="text-sm text-red-500 dark:text-red-400">
          {error instanceof Error ? error.message : "목록을 불러오지 못했습니다"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 헤더 영역 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-50">게시글</h2>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-zinc-400">
            {total}개의 글
          </p>
        </div>
        <Link href="/posts/new" className="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          글 쓰기
        </Link>
      </div>

      {/* 게시글 목록 or 빈 상태 */}
      {posts.length === 0 ? (
        <div className="card flex flex-col items-center gap-4 py-20 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-zinc-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 text-slate-400 dark:text-zinc-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-700 dark:text-zinc-300">
              아직 게시글이 없어요
            </p>
            <p className="mt-1 text-sm text-slate-400 dark:text-zinc-500">
              첫 번째 글을 작성해보세요!
            </p>
          </div>
          <Link href="/posts/new" className="btn-primary mt-2">
            첫 글 쓰기
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {/* 무한스크롤 감지 영역 */}
          <div ref={observerRef} className="py-4 flex justify-center">
            {isFetchingNextPage && (
              <div className="size-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600 dark:border-zinc-600 dark:border-t-indigo-400" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
