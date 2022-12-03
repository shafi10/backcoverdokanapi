import {
  Controller,
  Get,
  HttpCode,
} from '@nestjs/common';

@Controller('/')
export class HomeController {
  constructor() {}

  @Get()
  @HttpCode(200)
  async getAPIsList() {
    return "Home APIs List";
  }
}
