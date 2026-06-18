export type InsightType = "warning" | "info" | "success";
export type Filter = "all" | "unread" | "important";

export interface Bookmark {
  id: string;
  url: string;
  domain: string;
  title: string;
  summary: string;
  tags: string[];
  savedAt: string;
  isRead: boolean;
  isImportant: boolean;
  aiInsight: string;
  insightType: InsightType;
}

export const MOCK_BOOKMARKS: Bookmark[] = [
  {
    id: "1",
    url: "https://react.dev",
    domain: "react.dev",
    title: "React 19 — 새로운 기능 완벽 정리",
    summary:
      "use() 훅, Server Actions, 폼 상태 관리 개선, 낙관적 업데이트 등 React 19의 핵심 변경사항을 실제 코드 예시와 함께 상세히 설명합니다. 기존 프로젝트 마이그레이션 체크리스트 포함.",
    tags: ["React", "프론트엔드", "개발"],
    savedAt: "2026-06-10",
    isRead: false,
    isImportant: true,
    aiInsight: "8일째 미읽음 · 태그 기준 중요도 높음",
    insightType: "warning",
  },
  {
    id: "2",
    url: "https://tailwindcss.com",
    domain: "tailwindcss.com",
    title: "Tailwind CSS v4 — 마이그레이션 가이드",
    summary:
      "PostCSS에서 Lightning CSS로 전환된 v4의 빌드 파이프라인 변화와 새로운 CSS-first 설정 방식을 단계별로 안내합니다. @theme 지시어와 새 유틸리티 변경 사항 포함.",
    tags: ["CSS", "Tailwind", "마이그레이션"],
    savedAt: "2026-06-14",
    isRead: true,
    isImportant: false,
    aiInsight: "유사 아티클 3개 보유 · 시리즈로 묶기 추천",
    insightType: "info",
  },
  {
    id: "3",
    url: "https://nextjs.org",
    domain: "nextjs.org",
    title: "Next.js 16 App Router 심층 분석",
    summary:
      "Partial Prerendering(PPR)의 실전 적용 방법, 새로운 캐싱 전략, Server Actions 개선 사항을 실제 프로덕션 사례와 함께 분석한 심층 아티클입니다.",
    tags: ["Next.js", "프론트엔드", "성능"],
    savedAt: "2026-06-16",
    isRead: false,
    isImportant: true,
    aiInsight: "2일째 미읽음 · 최근 저장 항목",
    insightType: "info",
  },
  {
    id: "4",
    url: "https://anthropic.com",
    domain: "anthropic.com",
    title: "Claude API — Tool Use & MCP 완벽 가이드",
    summary:
      "Claude 4 시리즈의 Tool Use 기능과 Model Context Protocol(MCP)을 활용한 AI 에이전트 구축 방법을 코드 예시와 함께 단계별로 설명합니다.",
    tags: ["AI", "Claude", "API"],
    savedAt: "2026-06-12",
    isRead: false,
    isImportant: false,
    aiInsight: "AI 태그 중 가장 많이 저장된 도메인",
    insightType: "success",
  },
  {
    id: "5",
    url: "https://github.com",
    domain: "github.com",
    title: "shadcn/ui — 2026 업데이트 변경 로그",
    summary:
      "새로운 Chart, DatePicker, DataTable 컴포넌트 추가와 함께 Tailwind v4 대응, React 19 호환성 개선 내용을 담은 공식 변경 로그입니다.",
    tags: ["UI", "React", "오픈소스"],
    savedAt: "2026-06-15",
    isRead: true,
    isImportant: false,
    aiInsight: "이미 읽음 · 관련 컴포넌트 3개와 연결됨",
    insightType: "success",
  },
  {
    id: "6",
    url: "https://vercel.com",
    domain: "vercel.com",
    title: "Vercel AI SDK 4.0 — 새로운 스트리밍 API",
    summary:
      "useChat, useCompletion 훅의 개선된 스트리밍 처리와 멀티모달 지원, 에러 핸들링 패턴을 실제 예시로 설명하는 공식 발표 글입니다.",
    tags: ["AI", "Vercel", "SDK"],
    savedAt: "2026-06-08",
    isRead: false,
    isImportant: false,
    aiInsight: "10일째 미읽음 · 해지 후보",
    insightType: "warning",
  },
  {
    id: "7",
    url: "https://typescriptlang.org",
    domain: "typescriptlang.org",
    title: "TypeScript 5.7 — 새로운 타입 기능 정리",
    summary:
      "satisfies 연산자 개선, 개선된 타입 추론, 새로운 유틸리티 타입 등 TypeScript 5.7의 핵심 기능을 예시 코드와 함께 정리한 아티클입니다.",
    tags: ["TypeScript", "개발"],
    savedAt: "2026-06-05",
    isRead: true,
    isImportant: false,
    aiInsight: "13일째 읽은 상태 · 아직 실무 적용 안 됨",
    insightType: "info",
  },
  {
    id: "8",
    url: "https://bun.sh",
    domain: "bun.sh",
    title: "Bun 2.0 — Node.js 대체제로서의 성숙도",
    summary:
      "Bun 2.0의 Node.js 호환성 개선, 빌드 속도 벤치마크, 실제 프로덕션 적용 사례 분석. Next.js 및 주요 프레임워크와의 통합 현황 포함.",
    tags: ["Bun", "Node.js", "성능"],
    savedAt: "2026-06-17",
    isRead: false,
    isImportant: false,
    aiInsight: "어제 저장 · 연관 아티클 2개 있음",
    insightType: "info",
  },
];
