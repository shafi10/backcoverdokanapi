import {
  Controller,
  Get,
  Body,
  Post,
  Res,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from '../../schemas/auth.schema';
import {
  CreateAuthDto,
  LoginAuthDto,
  UpdateAuthDto,
} from '../../dto/create-auth.dto';
import { Response, Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  postLogin(@Body() user: LoginAuthDto, @Res() response: Response) {
    return this.authService.loginUser(user, response);
  }

  @Post('signup')
  postSignUp(
    @Body() user: CreateAuthDto,
    @Res() response: Response,
  ): Promise<Auth> {
    return this.authService.createUser(user, response);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getUser(@Req() req: Request) {
    return await this.authService.findAnUser(req);
  }

  @Put('profile')
  @UseGuards(AuthGuard)
  update(@Body() updateProfile: UpdateAuthDto, @Req() req: Request) {
    return this.authService.update(updateProfile, req);
  }
}
