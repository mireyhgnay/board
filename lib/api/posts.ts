// lib/api/posts.ts
// -----------------
// 게시글 관련 API 호출 함수 모음
// 컴포넌트/훅에서 직접 fetch하지 않고 여기서만 관리

import { apiRequest } from "./client";
import type {
  ApiResponse,
  CreatePostRequest,
  PaginatedResponse,
  Post,
  UpdatePostRequest,
} from "@/types/post";

/**
 * 게시글 목록 조회 (GET /posts?page=&size=)
 * 인증 불필요 - 누구나 조회 가능
 *
 * 백엔드 응답: { success, message, data: Post[], total, page, size, total_pages }
 * → 페이지네이션 메타 정보 포함해서 반환 (무한스크롤용)
 */
export async function getPosts(
  page: number = 1,
  size: number = 20
): Promise<PaginatedResponse<Post>> {
  return apiRequest<PaginatedResponse<Post>>(`/posts?page=${page}&size=${size}`);
}

/**
 * 게시글 단건 조회 (GET /posts/:id)
 * 인증 불필요
 *
 * 백엔드 응답: { success, message, data: Post }
 * → data 객체만 추출해서 반환
 */
export async function getPost(id: number): Promise<Post> {
  const res = await apiRequest<ApiResponse<Post>>(`/posts/${id}`);
  return res.data;
}

/**
 * 게시글 작성 (POST /posts)
 * 인증 필요 - JWT 토큰이 없으면 401 에러
 */
export async function createPost(body: CreatePostRequest): Promise<Post> {
  const res = await apiRequest<ApiResponse<Post>>("/posts", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res.data;
}

/**
 * 게시글 수정 (PUT /posts/:id)
 * 인증 필요 + 본인 작성글만 수정 가능
 */
export async function updatePost(
  id: number,
  body: UpdatePostRequest
): Promise<Post> {
  const res = await apiRequest<ApiResponse<Post>>(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return res.data;
}

/**
 * 게시글 삭제 (DELETE /posts/:id)
 * 인증 필요 + 본인 작성글만 삭제 가능
 */
export async function deletePost(id: number): Promise<void> {
  await apiRequest(`/posts/${id}`, { method: "DELETE" });
}
