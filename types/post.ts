// types/post.ts
// --------------
// 게시글 관련 TypeScript 타입 정의
// 백엔드(FastAPI) API 응답 형태와 일치시켜 관리

// ─── 백엔드 공통 응답 래퍼 ──────────────────────────────────────────────────
// FastAPI 백엔드는 모든 응답을 { success, message, data } 형태로 감싸서 반환

/** 단건 응답 래퍼 (예: 게시글 상세, 생성, 수정) */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/** 페이지네이션 응답 래퍼 (예: 게시글 목록) */
export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
}

// ─── 응답 타입 (서버 → 클라이언트) ─────────────────────────────────────────

/** 게시글 단건 (백엔드 PostResponse 스키마와 일치) */
export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;   // ISO 8601 날짜 문자열 예: "2024-01-01T00:00:00Z"
  updated_at: string;
}

// ─── 요청 타입 (클라이언트 → 서버) ─────────────────────────────────────────

/** 게시글 작성 요청 바디 */
export interface CreatePostRequest {
  title: string;
  content: string;
}

/** 게시글 수정 요청 바디 - 일부 필드만 수정 가능 (선택적 필드) */
export interface UpdatePostRequest {
  title?: string;
  content?: string;
}
