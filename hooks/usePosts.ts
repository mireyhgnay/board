// hooks/usePosts.ts
// ------------------
// 게시글 상태를 관리하는 커스텀 훅
// 목록 조회, 작성, 수정, 삭제 로직과 로딩/에러 상태를 제공

"use client";

import { useState } from "react";
import { getPosts, createPost, updatePost, deletePost } from "@/lib/api/posts";
import type { CreatePostRequest, Post, UpdatePostRequest } from "@/types/post";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** 게시글 목록 불러오기 */
  async function fetchPosts() {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "목록 조회 실패");
    } finally {
      setIsLoading(false);
    }
  }

  /** 게시글 작성 */
  async function addPost(body: CreatePostRequest) {
    setIsLoading(true);
    setError(null);
    try {
      const newPost = await createPost(body);
      // 목록 맨 앞에 새 게시글 추가 (재조회 없이 낙관적 업데이트)
      setPosts((prev) => [newPost, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "게시글 작성 실패");
    } finally {
      setIsLoading(false);
    }
  }

  /** 게시글 수정 */
  async function editPost(id: number, body: UpdatePostRequest) {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await updatePost(id, body);
      // 수정된 게시글만 교체
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "게시글 수정 실패");
    } finally {
      setIsLoading(false);
    }
  }

  /** 게시글 삭제 */
  async function removePost(id: number) {
    setIsLoading(true);
    setError(null);
    try {
      await deletePost(id);
      // 삭제된 게시글 제거
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "게시글 삭제 실패");
    } finally {
      setIsLoading(false);
    }
  }

  return { posts, isLoading, error, fetchPosts, addPost, editPost, removePost };
}
