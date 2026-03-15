// lib/query/QueryProvider.tsx
// ----------------------------
// React Query의 QueryClientProvider를 제공하는 클라이언트 컴포넌트
// app/layout.tsx에서 감싸서 전역에서 React Query 사용 가능

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState로 QueryClient를 생성해야 서버/클라이언트 간 인스턴스 공유 방지
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 탭 전환 시 자동 재요청 비활성화
            refetchOnWindowFocus: false,
            // 재시도 1회만
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
