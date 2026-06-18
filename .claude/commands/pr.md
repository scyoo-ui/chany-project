현재 브랜치의 변경사항을 바탕으로 GitHub PR을 생성한다.

1. `git log main..HEAD`로 커밋 목록 파악
2. `git diff main...HEAD`로 전체 변경 내용 파악
3. PR 제목: 70자 이내, 핵심 변경사항 요약
4. PR 본문 구성:
   - **Summary**: 변경 이유와 핵심 내용 (bullet 2-3개)
   - **Changes**: 주요 파일/기능 변경 목록
   - **Test plan**: 확인해야 할 항목 체크리스트
5. `gh pr create`로 생성, remote push 필요 시 먼저 수행
6. 생성된 PR URL을 반환한다
