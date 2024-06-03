## 한입 북스(ONE BITE BOOKS)

한 입 크기로 잘라먹는 Next.js 강의에 사용되는 백엔드 서버입니다.  
Node.js 20(or LTS) 이상의 버전이 필요합니다. (24.06.03 기준)

## 시작하기 (Getting Started)

### 1. 코드를 다운로드하세요

이 저장소를 Clone 또는 Fork 하세요 (별표도 찍어주시면 정말 감사 ... 👍)

<img width="1483" alt="image" src="https://github.com/winterlood/onebite-books-server/assets/46296754/6e984ada-dc30-46a8-8cf2-abaf4c6feae9">

### 2. 의존성 설치

로컬에서 다음 명령어를 통해 의존성을 모두 설치하세요

```
> npm install
```

### 3. Supabse 설정하기

Supabase에 가입한 다음 새로운 프로젝트를 생성합니다.

프로젝트 생성이 완료되었다면 Settings 페이지로 이동한 다음  
좌측 사이드바의 `Configuration > Database` 섹션에서 `Connection String`을 복사합니다.  
(하단의 그림 자료 참고)

<img width="1361" alt="image" src="https://github.com/winterlood/onebite-books-server/assets/46296754/8576abcd-084a-4648-a8a7-7c15adb821a3">

복사한 `Connection String`을 `.env` 파일을 생성하여 다음과 같이 붙여넣습니다.

```
// .env
DATABASE_URL="방금 복사한 Connection String"
```

이때 `Connection String`의 `[YOUR-PASSWORD]` 부분을 자신이 설정한 비밀번호로 수정합니다.

<details>
<summary><b>비밀번호를 까먹었다면?</b></summary>
<div markdown="1">

앞서 `Connection String`을 복사한 페이지에서 드래그를 내려보면 아래 그림과 같이 `Reset Password` 버튼을 발견할 수 있습니다.  
해당 버튼을 클릭해 새로운 비밀번호로 재 설정한 다음 `.env` 파일에 붙여넣습니다.

<img width="1333" alt="image" src="https://github.com/winterlood/onebite-books-server/assets/46296754/effe86fe-8b0d-43a4-9368-6bf2a0b42806">

</div>
</details>

### 4. 데이터베이스 스키마 설정하기

다음 명령어를 입력해 데이터베이스(Supabase) 스키마를 자동 설정합니다.

```
npx prisma db push
```

### 5. 시드 데이터 삽입하기

다음 명령어를 입력해 시드(기초) 데이터를 데이터베이스에 삽입합니다.

> (참고) 삽입되는 시드 데이터는 프로젝트 `prisma/seed/data.ts` 파일에서 확인할 수 있습니다.

```
npm run seed
```

### 6. 서버 실행하기

다음 명령어를 통해 프로젝트를 빌드한 다음 서버를 실행합니다.

```
> npm run build
> npm run start
```

(참고) 개발모드로 서버를 실행하고 싶다면 다음 명령어를 입력합니다.

```
> npm run start:dev
```

### 7. 데이터베이스 실시간 확인하기

다음 명령어를 입력하면 데이터베이스를 실시간으로 조회가능한 URL로 접속됩니다.

```
npx prisma studio
```

<img width="1222" alt="image" src="https://github.com/winterlood/onebite-books-server/assets/46296754/5c06d9aa-8f8b-4d9d-9763-9408e1724b13">

### 8. API 문서 확인하기

다음 주소로 접속하면 Swagger로 제작된 API 문서를 확인하실 수 있습니다.  
단 서버가 가동중일 때에만 동작하니 꼭 서버를 가동한 뒤 접속해주세요!

**http://localhost:12345/api**

<img width="1496" alt="image" src="https://github.com/winterlood/onebite-books-server/assets/46296754/e55f176b-8641-4484-bf36-9a3bc7590ac5">
