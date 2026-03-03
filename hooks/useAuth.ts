// hooks/useAuth.ts
// -----------------
// 인증 상태를 관리하는 커스텀 훅
// 로그인/로그아웃 로직과 현재 유저 상태를 제공

"use client";

import { useState } from "react";
import { login as loginApi, signup as signupApi } from "@/lib/api/auth";
import { saveToken, removeToken } from "@/lib/utils/token";
import type { AuthUser, LoginRequest, SignupRequest } from "@/types/auth";

export function useAuth() {
  // 현재 로그인한 유저 정보 (null이면 미로그인)
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 로그인 처리
   * 1. API 호출 → JWT 토큰 수신
   * 2. 토큰 localStorage 저장
   * 3. 유저 상태 업데이트
   */
  async function login(body: LoginRequest) {
    setIsLoading(true);
    setError(null);
    try {
      const { access_token } = await loginApi(body);
      saveToken(access_token);
      // TODO: 토큰 디코딩 또는 /me API로 유저 정보 가져오기
      setUser({ id: "", email: body.email });
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인 실패");
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * 회원가입 처리
   */
  async function signup(body: SignupRequest) {
    setIsLoading(true);
    setError(null);
    try {
      await signupApi(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "회원가입 실패");
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * 로그아웃 처리
   * 토큰 삭제 + 유저 상태 초기화
   */
  function logout() {
    removeToken();
    setUser(null);
  }

  return { user, isLoading, error, login, signup, logout };
}
