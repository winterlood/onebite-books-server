import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @ApiExcludeEndpoint()
  helloWorld() {
    return `
    <title>한입 북스 서버</title>
    <h2>한입 북스 서버</h2>
    안녕하세요 Onebite Books 서버입니다 😃
    <br/>
    이 서버는 수강생 분들의 즐겁고 현장감 있는 실습을 위해 특별 제작되었습니다.
    <br/>
    <br/>
    자세한 API 호출 안내는 <a href="/api">/api</a>로 접속해주세요!`;
  }
}
