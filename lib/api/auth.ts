// lib/api/auth.ts
// ----------------
// 인증 관련 API 호출 함수 모음
// 컴포넌트/훅에서 직접 fetch하지 않고 여기서만 관리

import { apiRequest } from "./client";
import type { LoginRequest, LoginResponse, SignupRequest } from "@/types/auth";

/**
 * 회원가입 API (POST /auth/signup)
 * 성공 시 별도 응답 없이 201 반환 (또는 생성된 유저 정보)
 */
export async function signup(body: SignupRequest): Promise<void> {
  await apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/**
 * 로그인 API (POST /auth/login)
 * 성공 시 JWT access_token 반환
 */
export async function login(body: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
