// app/page.tsx
// -------------
// 메인 랜딩 페이지 (/)
// Server Component (기본값) - 상태/이벤트 없으므로 "use client" 불필요

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-8 py-12 sm:gap-10 sm:py-20 text-center">

      {/* 히어로 타이틀 */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-zinc-50">
          생각을 꺼내 두는 곳,{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Board
          </span>
        </h1>
        <p className="text-base text-slate-500 sm:text-lg dark:text-zinc-400">
          질문하고, 공유하고, 함께 성장하세요. <br />
          누구나 자유롭게 글을 쓸 수 있는 커뮤니티입니다.
        </p>
      </div>

      {/* CTA 버튼 */}
      <div className="flex items-center gap-3">
        <Link href="/posts" className="btn-primary px-6 py-2.5 text-sm">
          글 둘러보기
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      {/* 서비스 특징 카드 3개 */}
      <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
              </svg>
            ),
            title: "자유로운 글쓰기",
            desc: "형식 없이 생각을 그대로 적어보세요",
          },
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            ),
            title: "댓글로 소통",
            desc: "다양한 시각을 나누고 대화해보세요",
          },
          {
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            ),
            title: "좋아요 & 공감",
            desc: "마음에 드는 글에 공감을 표현하세요",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="card flex flex-col items-center gap-3 p-5 text-center"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              {feature.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                {feature.title}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-zinc-500">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
