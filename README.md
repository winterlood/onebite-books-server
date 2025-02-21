## 한입 북스(ONE BITE BOOKS)

한 입 크기로 잘라먹는 Next.js 강의에 사용되는 백엔드 서버입니다.  
Node.js 22(or 그 이상의 LTS) 이상의 버전이 필요합니다. (25.02.21 기준)

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

프로젝트가 생성이 완료되면 다음과 같은 화면이 나타납니다. 이때에도 데이터베이스 등의 프로젝트의 일부 서비스는 아직 생성이 완료되지 않았을 수 있습니다. 이를 확인하려면 아래 그림에 붉은색 박스로 표시된 Project Status를 클릭하면 됩니다. 모든 서비스가 시작되기까지 통상 5~10분 정도의 시간이 소요될 수 있습니다.

<img width="452" alt="Image" src="https://github.com/user-attachments/assets/da2de705-5236-4e24-bd9e-4f4a8a62c968" />

모든 서비스의 가동이 완료되면 다음 그림과 같이 “Project Status” 버튼 앞에 초록색 불이 들어오며 추가로 이 버튼을 클릭해 상세 서비스들의 상태를 살펴보면 서비스 이름 앞에 모두 “No issues”라는 텍스트가 표시됩니다.

<img width="452" alt="Image" src="https://github.com/user-attachments/assets/eb9f890a-3497-4580-870c-8042891c79b3" />

Supabase 프로젝트 생성과 해당 프로젝트의 데이터베이스를 비롯한 모든 서비스의 가동이 다 완료되었다면 이제 앞서 다운로드 받은 백엔드 서버와 Supabase 데이터베이스를 연결할 차례입니다.

이 연결은 Connection String 이라는 일종의 주솟값을 통해 이루어지는데 이 주소값은 대시보드 상단의 “Connect” 버튼을 클릭하면 나타나는 모달 창 안에서 확인 가능합니다.

![Image](https://github.com/user-attachments/assets/33c64cd7-36bd-4eeb-b751-398bc0dfd43e)

Connect 버튼을 클릭하면 “Connect to your project” 모달 창이 나타납니다. 여기서 ORMs 탭으로 이동한 후, Tool이 Prisma로 선택되어 있는지 확인합니다.

만약 Prisma가 선택되어 있다면, 그 아래에 커넥션 스트링을 DATABASE_URL과 DIRECT_URL이라는 환경 변수에 저장하는 코드가 표시됩니다. 이 내용을 전체 복사합니다.

![Image](https://github.com/user-attachments/assets/b7fba336-420c-44d4-90e4-12018161e1cd)

복사가 완료되었다면 VSCode에서 앞서 다운로드 받은 백엔드 서버를 열고 프로젝트 루트 아래에 .env 파일을 생성하고 복사한 코드를 이 파일에 붙여넣어 줍니다.

```
// .env
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL="postgresql://postgres.uektaydysdsygkomxtuh:[YOUR-PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations.
DIRECT_URL="postgresql://postgres.uektaydysdsygkomxtuh:[YOUR-PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres"
```

복사한 `Connection String`을 `.env` 파일을 생성하여 다음과 같이 붙여넣습니다.

```
// .env
DATABASE_URL="방금 복사한 Connection String"
```

잘 붙여넣었다면, 이제 DATABASE_URL과 DIRECT_URL 환경 변수에 저장된 각 Connection String 내부의 비밀번호를 수정해야 합니다.

각 변수의 값에서 [YOUR-PASSWORD] 로 표시된 부분을 앞서 설정한 데이터베이스 비밀번호로 변경합니다. 이때 대괄호까지 함께 삭제해야 합니다.

<details>
<summary><b>비밀번호를 까먹었다면?</b></summary>
<div markdown="1">

앞서 설정해둔 데이터베이스 비밀번호를 까먹었다면 비밀번호를 재 설정해야 합니다.

비밀번호를 재 설정 하려면 아래 그림에 안내된 순서대로 `Setting 페이지 > Database 탭`으로 접속해 비밀번호 재 설정 버튼을 클릭하면 됩니다.

![Image](https://github.com/user-attachments/assets/1d06837f-d204-4eec-9751-88be3e0473da)

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
