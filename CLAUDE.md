# CLAUDE.md — Frontend Guide (Next.js × TypeScript)

> 이 파일은 Claude가 이 레포에서 작업할 때 참고하는 가이드입니다.
> 프론트엔드 개발자가 백엔드(FastAPI)와 연동하는 게시판 클라이언트 프로젝트입니다.
> **타입 안정성**과 **폴더 구조 일관성**을 최우선으로 유지해주세요.

---

## 1. 프로젝트 개요

- **프로젝트명**: Frontend Goes Backend | 브라우저 밖으로
- **한 줄 소개**: 프론트 개발자가 직접 만든 백엔드(FastAPI)와 연동하는 게시판 클라이언트
- **레포 역할**: Frontend Only (Next.js 클라이언트)
- **백엔드**: 별도 레포에서 관리 (FastAPI + Supabase)

### 아키텍처 흐름

```
[이 레포 - Next.js Frontend]
        ↓ HTTP 요청 (REST API)
[Backend - FastAPI, 별도 레포]
        ↓
[Supabase - PostgreSQL DB / Auth]
```

---

## 2. 기술 스택

| 역할 | 기술 |
|------|------|
| 프레임워크 | Next.js 14+ (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| HTTP 클라이언트 | fetch (Next.js 내장) |
| 린터 | ESLint |
| 패키지 매니저 | npm |

---

## 3. 폴더 구조

```
board/                              # 프로젝트 루트
├── CLAUDE.md                       # Claude 작업 가이드 (이 파일)
├── README.md
├── .env.local                      # 환경변수 (git 제외)
├── .env.example                    # 환경변수 예시 (git 포함)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
│
├── app/                            # App Router 루트 (Next.js 13+ 방식)
│   ├── layout.tsx                  # 전체 레이아웃 (HTML shell, 공통 헤더/푸터)
│   ├── page.tsx                    # 메인 페이지 (/)
│   ├── globals.css                 # 전역 스타일 (Tailwind base 포함)
│   │
│   ├── (auth)/                     # Route Group: 인증 관련 페이지
│   │   │                           # (auth)는 URL에 포함되지 않음 → /login, /signup
│   │   ├── login/
│   │   │   └── page.tsx            # /login 로그인 페이지
│   │   └── signup/
│   │       └── page.tsx            # /signup 회원가입 페이지
│   │
│   └── posts/                      # 게시글 관련 페이지
│       ├── page.tsx                # /posts 게시글 목록
│       ├── new/
│       │   └── page.tsx            # /posts/new 게시글 작성
│       └── [id]/
│           ├── page.tsx            # /posts/[id] 게시글 상세
│           └── edit/
│               └── page.tsx        # /posts/[id]/edit 게시글 수정
│
├── components/                     # 재사용 가능한 UI 컴포넌트
│   ├── ui/                         # 범용 원자 컴포넌트 (Button, Input 등)
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── layout/                     # 레이아웃 관련 컴포넌트
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── posts/                      # 게시글 도메인 컴포넌트
│       ├── PostCard.tsx            # 목록에서 사용하는 카드
│       ├── PostForm.tsx            # 작성/수정 공용 폼
│       └── PostDetail.tsx          # 상세 뷰
│
├── lib/                            # 유틸리티, API 클라이언트
│   ├── api/                        # 백엔드 API 호출 함수 모음
│   │   ├── client.ts               # fetch 기반 HTTP 클라이언트 (baseURL, 인증 헤더 설정)
│   │   ├── auth.ts                 # 인증 API 함수 (signup, login)
│   │   └── posts.ts                # 게시글 API 함수 (CRUD)
│   └── utils/
│       ├── token.ts                # JWT 토큰 저장/조회/삭제 (localStorage)
│       └── format.ts               # 날짜 포맷 등 공통 유틸
│
├── hooks/                          # 커스텀 훅
│   ├── useAuth.ts                  # 로그인 상태 관리
│   └── usePosts.ts                 # 게시글 목록/상세 상태 관리
│
└── types/                          # TypeScript 타입 정의
    ├── auth.ts                     # 회원가입/로그인 요청·응답 타입
    └── post.ts                     # 게시글 요청·응답 타입
```

### 폴더별 역할 한눈에 보기

| 폴더 | 역할 |
|------|------|
| `app/` | 페이지 라우팅 (URL 경로 = 폴더 구조) |
| `components/` | 재사용 UI 컴포넌트 |
| `lib/api/` | 백엔드 통신 함수 모음 |
| `lib/utils/` | 날짜, 토큰 등 공통 유틸 |
| `hooks/` | 상태 관리 커스텀 훅 |
| `types/` | TypeScript 타입 정의 (백엔드 응답 형태 포함) |

---

## 4. 타입 정의 컨벤션 (`types/`)

> 백엔드 API 응답 타입과 프론트 폼 타입을 명확히 분리합니다.

```typescript
// types/post.ts

// 백엔드 응답 타입 (서버에서 오는 데이터)
// Python(FastAPI) 필드명은 snake_case이므로 그대로 맞춤
export interface Post {
  id: number;
  title: string;
  content: string;
  author_id: string;
  created_at: string;   // ISO 8601 형식 날짜 문자열
  updated_at: string;
}

// 게시글 작성 요청 타입 (서버로 보내는 데이터)
export interface CreatePostRequest {
  title: string;
  content: string;
}

// 게시글 수정 요청 타입 (일부 필드만 수정 가능)
export interface UpdatePostRequest {
  title?: string;
  content?: string;
}
```

---

## 5. API 클라이언트 패턴 (`lib/api/`)

```typescript
// lib/api/client.ts
// -----------------
// 모든 API 호출의 기반이 되는 fetch 래퍼
// baseURL 관리, 인증 헤더 자동 포함, 에러 처리를 담당

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  // localStorage에서 JWT 토큰을 꺼내 Authorization 헤더에 자동으로 포함
  const token = typeof window !== "undefined"
    ? localStorage.getItem("access_token")
    : null;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (!res.ok) {
    // 서버 에러 메시지를 파싱해서 던짐
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}
```

```typescript
// lib/api/posts.ts
// ----------------
// 게시글 관련 API 호출 함수 모음
// 컴포넌트나 훅에서 직접 fetch를 호출하지 않고 여기서만 관리

import { apiRequest } from "./client";
import type { Post, CreatePostRequest } from "@/types/post";

// 게시글 목록 조회 (GET /posts)
export const getPosts = () =>
  apiRequest<Post[]>("/posts");

// 게시글 단건 조회 (GET /posts/:id)
export const getPost = (id: number) =>
  apiRequest<Post>(`/posts/${id}`);

// 게시글 작성 (POST /posts) - 인증 필요
export const createPost = (body: CreatePostRequest) =>
  apiRequest<Post>("/posts", { method: "POST", body: JSON.stringify(body) });
```

---

## 6. Server vs Client 컴포넌트 구분

> Next.js App Router에서 가장 중요한 개념입니다.

| 구분 | 언제 쓰나 | 특징 |
|------|----------|------|
| **Server Component** (기본값) | 데이터 fetch, 정적 UI | `useState`, `useEffect` 사용 불가 |
| **Client Component** (`"use client"`) | 상태, 이벤트, 브라우저 API | 파일 최상단에 `"use client"` 선언 |

```typescript
// "use client" 없으면 Server Component (기본)
// 데이터를 서버에서 미리 가져와서 렌더링
export default async function PostsPage() {
  const posts = await getPosts();   // 서버에서 직접 호출 가능
  return <PostList posts={posts} />;
}

// "use client" 필요한 경우: 버튼 클릭, 폼 입력 등 인터랙션
"use client";
export default function PostForm() {
  const [title, setTitle] = useState("");
  // ...
}
```

---

## 7. 주석 컨벤션

### 파일 상단 — 파일 목적 간략히
```typescript
// components/posts/PostCard.tsx
// ------------------------------
// 게시글 목록에서 각 게시글을 카드 형태로 렌더링하는 컴포넌트
// props: Post 타입 (types/post.ts 참고)
```

### 컴포넌트 Props 타입
```typescript
interface PostCardProps {
  post: Post;               // 표시할 게시글 데이터
  onDelete?: () => void;    // 삭제 버튼 클릭 시 콜백 (없으면 삭제 버튼 미노출)
}
```

### 복잡한 로직 — 단계별 흐름 주석
```typescript
// 1. 폼 유효성 검사
// 2. POST /posts API 호출
// 3. 성공 → /posts 목록 페이지로 이동
// 4. 실패 → 에러 메시지 표시
```

---

## 8. 코딩 컨벤션

### 네이밍
- **컴포넌트** 파일/함수: `PascalCase` (예: `PostCard`, `LoginForm`)
- **훅**: `camelCase` + `use` 접두사 (예: `useAuth`, `usePosts`)
- **API/유틸 함수**: `camelCase` (예: `getPost`, `createPost`)
- **타입/인터페이스**: `PascalCase` (예: `Post`, `CreatePostRequest`)
- **환경변수**: `UPPER_SNAKE_CASE` (예: `NEXT_PUBLIC_API_URL`)

### 컴포넌트 파일 내부 순서
```
1. "use client" (필요한 경우만)
2. import
3. 타입 정의 (interface Props)
4. 컴포넌트 함수
5. export default
```

### 규칙
- `any` 타입 사용 금지
- API 직접 호출은 `lib/api/`에서만, 컴포넌트·훅에서 직접 fetch 금지
- 타입은 `types/` 폴더에서 중앙 관리
- 컴포넌트가 50줄 이상이면 분리 고려
- `pages/` 방식 사용 금지, 반드시 `app/` (App Router) 방식

---

## 9. 환경변수 목록

`.env.example`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000   # FastAPI 백엔드 주소
```

> `NEXT_PUBLIC_` 접두사가 있어야 브라우저(클라이언트)에서 접근 가능
> 접두사 없는 변수는 서버 사이드에서만 사용 가능

---

## 10. 개발 서버 실행

```bash
npm install         # 패키지 설치
npm run dev         # 개발 서버 (http://localhost:3000)
npm run build       # 프로덕션 빌드
npm run lint        # ESLint 검사
```

---

## 11. Claude 작업 지침

1. **TypeScript 필수**: `any` 타입 사용 금지, 모든 타입 명시
2. **타입은 `types/`에**: 컴포넌트 파일 안에 타입 정의 금지
3. **API 호출은 `lib/api/`에**: 컴포넌트에서 직접 fetch 금지
4. **Server/Client 컴포넌트 명확히 구분**: 불필요한 `"use client"` 남발 금지
5. **주석 한국어**: 주석은 한국어로 (코드 식별자는 영어)
6. **App Router만 사용**: `pages/` 방식 금지
7. **환경변수 하드코딩 금지**: 반드시 `.env.local`에서 로드
8. **컴포넌트는 얇게**: 비즈니스 로직은 훅(`hooks/`)으로 분리
