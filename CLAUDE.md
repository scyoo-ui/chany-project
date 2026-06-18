@AGENTS.md

# 프로젝트

**Curately** — AI 북마크 큐레이터
저장한 링크를 AI가 자동으로 요약·분류하고 미읽음/중요도 인사이트를 제공하는 웹앱.

# Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- lucide-react (아이콘)
- Package manager: pnpm

# 구조

```
app/
  page.tsx              ← 진입점 (Server Component)
  layout.tsx            ← 루트 레이아웃
components/
  BookmarkApp.tsx       ← 메인 클라이언트 앱 (모든 state)
  BookmarkCard.tsx      ← 북마크 카드
  Sidebar.tsx           ← 좌측 네비게이션
  AddBookmarkModal.tsx  ← 북마크 추가 모달
lib/
  data.ts               ← Bookmark 타입 + 목 데이터
  utils.ts              ← 태그 색상, 날짜 포맷 유틸
```

# Rules

- 컴포넌트는 App Router 규칙 따름 — 인터랙션 필요한 것만 `"use client"`
- 스타일은 Tailwind 유틸리티 클래스만. 인라인 style 금지
- `any` 타입 사용 금지 — 모르면 `unknown` 후 좁히기
- 주석은 WHY가 명확할 때만, 한국어로 작성
- 새 컴포넌트 추가 시 → `components/` 폴더
- 새 유틸/타입 추가 시 → `lib/` 폴더
- 코드 작성 전 반드시 `node_modules/next/dist/docs/` 관련 가이드 확인

# Commands

- `/commit` — conventional commits 형식으로 커밋
- `/pr` — GitHub PR 생성
- `/review` — 변경사항 코드 리뷰
- `/new-component` — 새 컴포넌트 스캐폴딩
