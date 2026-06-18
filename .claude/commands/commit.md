staged된 변경사항을 확인하고 conventional commits 형식으로 커밋한다.

1. `git diff --cached`로 변경 내용 파악
2. 아래 타입 중 적절한 것 선택:
   - `feat` 새 기능
   - `fix` 버그 수정
   - `refactor` 동작 변경 없는 코드 개선
   - `style` 포맷, 공백 등 (로직 무관)
   - `test` 테스트 추가/수정
   - `docs` 문서
   - `chore` 빌드, 설정, 패키지 등
3. 메시지 형식: `type(scope): 설명` — 설명은 한국어, 72자 이내
4. staged 없으면 무엇을 stage할지 먼저 물어본다
5. `--no-verify` 절대 사용 금지
