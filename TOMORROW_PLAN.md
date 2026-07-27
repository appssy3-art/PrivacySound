# 내일 작업 계획 (2026-07-27)

## ❌ 오늘 실패한 것들 - 절대 반복 금지

1. **48바이트 더미 APK로 다운로드 시도** → 가짜 파일이라 의미 없음
2. **deferredPrompt 의존** → 크롬이 쿨타임 걸면 null이 되어 무반응
3. **GitHub releases 외부 링크** → 모바일 크로스오리진 차단으로 "연결 안 됨"
4. **closePwaModalFunc 타이밍 조절** → 근본 해결 아님
5. **target="_blank" 추가** → 근본 해결 아님
6. **PowerShell Out-File로 app.js 덮어쓰기** → 한글 인코딩 깨짐 → SyntaxError
7. **캐시 버전만 바꾸기** → 진짜 APK가 없으면 무의미

## ✅ 내일 해야 할 일: 진짜 APK 빌드 (방법 A)

### 핵심: Bubblewrap(TWA)으로 실제 APK 생성
- PWA(soundcover.shop)를 Trusted Web Activity로 감싼 진짜 안드로이드 APK 빌드
- 결과물: 수 MB 크기의 실제 설치 가능한 APK 파일
- 이걸 public/assets/SoundCover.apk에 교체

### 필요 도구
- Node.js (이미 설치됨)
- Java JDK (확인 필요)
- Android SDK / Build Tools (확인 필요)
- @aspect/aspect-dev-bubblewrap 또는 @nicolo-ribaudo/pwa-to-twa

### 작업 순서
1. Java JDK 설치 확인
2. Android SDK 설치 확인
3. Bubblewrap 설치
4. bubblewrap init --manifest=https://soundcover.shop/manifest.json
5. bubblewrap build → APK 생성
6. APK를 public/assets/에 복사
7. git push → 배포
8. 폰에서 다운로드 테스트

## ⚠️ 주의사항
- PowerShell Out-File 절대 사용 금지 (인코딩 깨짐)
- 한 번에 검증 후 배포 (무의미한 반복 커밋 금지)
- 쿼터 절약 최우선
