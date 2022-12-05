import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/')
export class HomeController {
  constructor() {}

  @Get()
  async getAPIsList(@Res() res: Response) {
    res.sendStatus(200);
  }
}
