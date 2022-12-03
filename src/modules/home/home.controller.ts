import {
  Controller,
  Get,
  HttpCode,
  Res
} from '@nestjs/common';
import { Response } from 'express';

@Controller('/')
export class HomeController {
  constructor() {}

  @Get()
  @HttpCode(200)
  async getAPIsList(@Res() res: Response) {
    res.sendStatus(200)
  }
}
