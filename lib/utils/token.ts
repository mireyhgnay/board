// lib/utils/token.ts
// -------------------
// JWT 액세스 토큰을 localStorage에서 관리하는 유틸 함수 모음
// 로그인 시 저장, 로그아웃 시 삭제, API 호출 시 조회

const TOKEN_KEY = "access_token";

/** 토큰 저장 (로그인 성공 시 호출) */
export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/** 토큰 조회 (API 호출 시 인증 헤더에 사용) */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/** 토큰 삭제 (로그아웃 시 호출) */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/** 토큰 존재 여부 확인 (로그인 상태 체크) */
export function hasToken(): boolean {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}
