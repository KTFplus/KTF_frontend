# KTF 한국어 학습 도우미

외국인 한국어 학습자를 위한 화자분리를 지원하는 transcriber입니다. 추가적으로 발음 평가 기능을 제공합니다.

## 주요 기능

- 오디오 파일 업로드 및 웹 녹음
- ASR(음성 인식) 및 화자 분리
- 발음 평가 (준비된 문장 기반)

## 기술 스택

- Next.js 14
- TypeScript
- TailwindCSS
- WaveSurfer.js
- MediaStream Recording API

## 시작하기

1. 저장소 클론
```bash
git clone https://github.com/your-username/ktf_front.git
cd ktf_front
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 내용을 추가합니다:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. 개발 서버 실행
```bash
npm run dev
```

5. 브라우저에서 http://localhost:3000 접속

## API 엔드포인트

### POST /upload-audio
오디오 파일을 업로드하고 음성 인식 결과를 반환합니다.

### POST /pronunciation-evaluate
녹음된 발음을 평가하고 점수와 피드백을 반환합니다.

## 배포
Vercel
- `NEXT_PUBLIC_API_URL`: 백엔드 API 서버 URL
- vercel 배포는 organization을 지원하지 않기 때문에 이 repo는 https://github.com/UReWUI/ktf_front 의 내용을 import한 것입니다.



