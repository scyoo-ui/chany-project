# Curately — AI 북마크 큐레이터

저장한 링크를 AI가 자동으로 요약하고 분류해주는 북마크 관리 웹앱입니다.
단순한 링크 저장을 넘어, 미읽음 알림·중요도 분석·태그 기반 필터링으로 지식을 실제로 활용할 수 있도록 돕습니다.

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| **AI 자동 요약** | URL 저장 시 AI가 아티클 내용을 2-3줄로 요약 |
| **AI Insight** | 미읽음 기간, 유사 아티클 그룹, 해지 추천 등 맥락 분석 |
| **태그 자동 분류** | 수동 태그 추가 및 사이드바 멀티 태그 필터 |
| **미읽음 / 중요 관리** | 카드별 읽음 토글·별표로 중요 표시 |
| **실시간 검색** | 제목·요약·태그 전체를 대상으로 즉시 필터링 |
| **그리드 / 리스트 뷰** | 상황에 맞는 레이아웃 전환 |

---

## 기술 스택

### 프레임워크 & 런타임

| 기술 | 버전 | 역할 |
|------|------|------|
| [Next.js](https://nextjs.org) | 16.2.9 | 풀스택 React 프레임워크, App Router + Turbopack |
| [React](https://react.dev) | 19.2.4 | UI 라이브러리, `use()` 훅 · Server Actions |
| [TypeScript](https://typescriptlang.org) | 5.x | 정적 타입 시스템 |
| [Node.js](https://nodejs.org) | 20.x | 서버 런타임 |

### 스타일링

| 기술 | 버전 | 역할 |
|------|------|------|
| [Tailwind CSS](https://tailwindcss.com) | 4.x | CSS-first 유틸리티 프레임워크 (Lightning CSS 기반) |
| [@tailwindcss/postcss](https://tailwindcss.com/docs/installation/using-postcss) | 4.x | PostCSS 통합 플러그인 |

### UI 라이브러리

| 기술 | 버전 | 역할 |
|------|------|------|
| [lucide-react](https://lucide.dev) | 1.20.0 | SVG 아이콘 컴포넌트 |
| [Geist](https://vercel.com/font) | — | 본문 폰트 (next/font/google 로드) |

### 개발 도구

| 기술 | 역할 |
|------|------|
| [pnpm](https://pnpm.io) | 패키지 매니저 (workspace 지원) |
| [ESLint](https://eslint.org) | 코드 품질 검사 (`eslint-config-next`) |
| [Turbopack](https://turbo.build/pack) | 개발 서버 번들러 (Rust 기반, Webpack 대비 최대 10× 빠름) |

---

## 프로젝트 구조

```
chany-project/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (메타데이터, 폰트)
│   ├── page.tsx            # 진입점 — BookmarkApp 렌더링
│   └── globals.css         # Tailwind v4 import + CSS 변수
│
├── components/
│   ├── BookmarkApp.tsx     # 메인 클라이언트 컴포넌트 (모든 state 관리)
│   ├── BookmarkCard.tsx    # 북마크 카드 (AI insight, 태그, 읽음/중요 토글)
│   ├── Sidebar.tsx         # 좌측 네비게이션 + 태그 필터
│   └── AddBookmarkModal.tsx # 북마크 추가 폼 모달
│
├── lib/
│   ├── data.ts             # Bookmark 타입 정의 + 목 데이터 (8개)
│   └── utils.ts            # 태그 색상, 도메인 색상, 날짜 포맷 유틸
│
├── .claude/
│   ├── settings.json       # Claude Code 권한 설정 + 작업 완료 알림 hook
│   └── commands/
│       ├── commit.md       # /commit — conventional commits 자동화
│       ├── pr.md           # /pr — GitHub PR 생성
│       ├── review.md       # /review — 코드 리뷰
│       └── new-component.md # /new-component — 컴포넌트 스캐폴딩
│
├── CLAUDE.md               # Claude Code 프로젝트 지시사항
├── AGENTS.md               # AI 에이전트 규칙 (Next.js 버전 주의)
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── pnpm-workspace.yaml
```

---

## 아키텍처 결정

### Server Component vs Client Component

- `app/page.tsx` — **Server Component**. 정적 진입점 역할만 하며 `BookmarkApp`을 렌더링
- `components/BookmarkApp.tsx` — **Client Component** (`"use client"`). 검색·필터·모달 등 모든 인터랙티브 상태를 단일 경계에서 관리
- 나머지 컴포넌트들은 Client Component인 `BookmarkApp` 하위에 렌더링되므로 별도 directive 없이 클라이언트에서 동작

### 태그 / 도메인 색상 시스템

`lib/utils.ts`의 해시 함수로 문자열 → 고정 색상을 결정론적으로 매핑합니다.
같은 태그는 항상 같은 색상을 가지며 별도 상태 관리가 필요 없습니다.

### AI Insight 타입

```ts
type InsightType = "warning" | "info" | "success"
```

- `warning` (amber) — 장기 미읽음, 해지 추천
- `info` (blue) — 최근 저장, 연관 아티클
- `success` (emerald) — 읽음 완료, 긍정적 분석

---

## 시작하기

### 사전 요구사항

- Node.js 20 이상
- pnpm 9 이상

```bash
# pnpm 설치 (없는 경우)
npm install -g pnpm
```

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (Turbopack)
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### 린트

```bash
pnpm lint
```

---

## 향후 개발 계획

- [ ] Claude / OpenAI API 연동 — 실제 AI 요약 및 인사이트 생성
- [ ] 크롬 익스텐션 — 브라우저에서 원클릭 저장
- [ ] 벡터 검색 — 의미 기반 시맨틱 검색 (pgvector / Pinecone)
- [ ] 사용자 인증 — NextAuth.js 기반 로그인
- [ ] 데이터베이스 연동 — Prisma + PostgreSQL
- [ ] 공유 기능 — 북마크 컬렉션 퍼블리시
- [ ] 다크 모드 — 시스템 테마 연동
