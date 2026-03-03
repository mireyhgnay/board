// types/auth.ts
// --------------
// 인증(로그인/회원가입) 관련 TypeScript 타입 정의

// ─── 요청 타입 (클라이언트 → 서버) ─────────────────────────────────────────

/** 회원가입 요청 바디 */
export interface SignupRequest {
  email: string;
  password: string;
}

/** 로그인 요청 바디 */
export interface LoginRequest {
  email: string;
  password: string;
}

// ─── 응답 타입 (서버 → 클라이언트) ─────────────────────────────────────────

/** 로그인 성공 응답 - JWT 토큰 포함 */
export interface LoginResponse {
  access_token: string;
  token_type: string;   // 보통 "bearer"
}

/** 로그인한 유저 정보 (JWT 디코딩 후 사용) */
export interface AuthUser {
  id: string;
  email: string;
}
