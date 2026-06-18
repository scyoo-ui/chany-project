$ARGUMENTS 이름으로 새 React 컴포넌트를 `components/` 폴더에 생성한다.

규칙:
- 파일명: PascalCase (예: BookmarkCard.tsx)
- 인터랙션 없으면 서버 컴포넌트 (directive 없음), 있으면 `"use client"` 상단에 추가
- Props 인터페이스를 컴포넌트 위에 정의 (inline export 금지)
- Tailwind 유틸리티 클래스만 사용
- `any` 타입 금지

생성 후:
1. 컴포넌트 파일 생성
2. 어디서 import해서 쓸지 알려줌
3. 필요 시 `lib/data.ts`에 관련 타입 추가 제안
