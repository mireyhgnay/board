// lib/api/client.ts
// ------------------
// 모든 API 호출의 기반이 되는 fetch 래퍼 함수
// - 백엔드 baseURL 관리
// - 공통 에러 처리

// 백엔드 FastAPI 서버 주소 (환경변수에서 로드)
// NEXT_PUBLIC_ 접두사가 있어야 브라우저에서 접근 가능
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/**
 * 백엔드 API를 호출하는 공통 함수
 *
 * @param endpoint - API 경로 (예: "/posts")
 * @param options  - fetch RequestInit 옵션 (method, body 등)
 * @returns 파싱된 JSON 응답 데이터
 * @throws 응답이 ok가 아닐 때 에러 발생
 */
export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    // FastAPI는 에러 시 { "detail": "에러 메시지" } 형태로 응답
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      (errorBody as { detail?: string }).detail ?? `HTTP ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}
