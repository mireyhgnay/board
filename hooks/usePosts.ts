// hooks/usePosts.ts
// ------------------
// 게시글 관련 React Query 훅 모음
// - usePosts: 게시글 목록 조회 (GET /posts)
// - usePost: 게시글 상세 조회 (GET /posts/:id)
// - useCreatePost: 게시글 작성 (POST /posts)
// - useUpdatePost: 게시글 수정 (PUT /posts/:id)
// - useDeletePost: 게시글 삭제 (DELETE /posts/:id)

"use client";

import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, getPost, createPost, updatePost, deletePost } from "@/lib/api/posts";
import type { CreatePostRequest, UpdatePostRequest } from "@/types/post";

// 쿼리 키 상수 — 캐시 무효화 시 일관된 키 사용
export const postKeys = {
  all: ["posts"] as const,
  detail: (id: number) => ["posts", id] as const,
};

/** 게시글 목록 무한스크롤 훅 — 20개씩 페이지 단위로 로드 */
export function usePosts() {
  return useInfiniteQuery({
    queryKey: postKeys.all,
    queryFn: ({ pageParam }) => getPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
}

/** 게시글 상세 조회 훅 (GET /posts/:id) */
export function usePost(id: number) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => getPost(id),
  });
}

/** 게시글 작성 훅 — 성공 시 목록 캐시 무효화 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreatePostRequest) => createPost(body),
    onSuccess: () => {
      // 작성 성공 → 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}

/** 게시글 수정 훅 — 성공 시 목록 + 상세 캐시 무효화 */
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: UpdatePostRequest }) =>
      updatePost(id, body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(variables.id) });
    },
  });
}

/** 게시글 삭제 훅 — 성공 시 목록 캐시 무효화 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}
