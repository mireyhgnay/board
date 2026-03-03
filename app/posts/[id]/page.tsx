// app/posts/[id]/page.tsx
// ------------------------
// 게시글 상세 페이지 (/posts/:id)
// Server Component: 서버에서 데이터 가져와 렌더링

import Link from "next/link";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;

  // 더미 데이터 (백엔드 연동 전 UI 확인용)
  const mockPost = {
    id: Number(id),
    title: "FastAPI 첫 라우터 만들기",
    content: `오늘은 FastAPI에서 첫 번째 라우터를 만들어봤다.

Next.js의 app/route.ts와 비슷한 개념이라서 생각보다 어렵지 않았다. 
FastAPI에서는 @router.get("/posts") 같은 데코레이터를 사용해서 엔드포인트를 정의한다.

신기한 점은 FastAPI가 자동으로 Swagger UI 문서를 생성해준다는 것이다.
localhost:8000/docs 에 접속하면 API를 직접 테스트할 수 있어서 정말 편했다.`,
    author_id: "user-123",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

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
            {mockPost.title}
          </h1>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm text-slate-400 dark:text-zinc-500">
              {new Date(mockPost.created_at).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {/* 작성자 본인에게만 노출 예정 */}
            <div className="flex gap-2">
              <Link
                href={`/posts/${id}/edit`}
                className="btn-ghost py-1.5 px-3 text-xs"
              >
                수정
              </Link>
              <button className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                삭제
              </button>
            </div>
          </div>
        </header>

        {/* 게시글 본문 */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          {mockPost.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed text-slate-700 dark:text-zinc-300">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
