# Board

생각을 꺼내 두는 공간 — 질문하고, 공유하고, 함께 성장하는 커뮤니티 게시판 서비스입니다.

🔗 **라이브 데모**: [https://board-mu-six.vercel.app](https://board-mu-six.vercel.app)

---

## 프로젝트 소개

FastAPI(백엔드) × Next.js(프론트엔드) 풀스택 게시판 프로젝트입니다.
이 레포지토리는 **프론트엔드(Next.js)** 코드베이스입니다.

### 주요 기능

- 게시글 목록 조회 / 작성 / 수정 / 삭제
- 회원가입 / 로그인 (JWT 인증)
- 다크 / 라이트 모드 토글 (localStorage 유지)
- 모바일 반응형 UI (햄버거 메뉴)

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| 상태 관리 | React Hooks (useState, useContext) |
| 인증 | JWT (Bearer Token) |
| 배포 | Vercel |

---

## 폴더 구조

```
board/
├── app/                    # Next.js App Router 페이지
│   ├── (auth)/             # 인증 관련 페이지 (Route Group)
│   │   ├── login/
│   │   └── signup/
│   ├── posts/              # 게시글 관련 페이지
│   │   ├── [id]/
│   │   │   ├── edit/
│   │   │   └── page.tsx
│   │   ├── new/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/             # Header, ThemeProvider
│   └── posts/              # PostCard 등 게시글 컴포넌트
├── hooks/                  # useAuth, usePosts
├── lib/
│   ├── api/                # API 호출 함수 (auth, posts, client)
│   └── utils/              # 유틸 함수 (token, format)
├── types/                  # TypeScript 타입 정의
└── .env.example
```

---

## 개발 환경 세팅

### 요구 사항

- Node.js 18+
- npm 또는 yarn

### 설치 및 실행

```bash
# 1. 레포지토리 클론
git clone https://github.com/your-username/board.git
cd board

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local 에서 NEXT_PUBLIC_API_URL 수정

# 4. 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

### 환경 변수

`.env.example` 파일을 참고해 `.env.local`을 생성합니다.

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 빌드

```bash
npm run build
npm run start
```

---

## 백엔드 레포지토리

백엔드(FastAPI × Supabase)는 별도 레포지토리에서 관리합니다.
