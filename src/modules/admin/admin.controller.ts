import {
  Controller,
  Get,
  Body,
  Post,
  Query,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from '../../schemas/admin.schema';
import { AdminDto, AdminLoginDto } from 'src/dto/create-admin.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request,Response } from 'express';

@Controller('admin')
// @UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("signin")
  postLogin(
    @Body() adminDto: AdminLoginDto,
    @Req() req: Request,
  ): Promise<Admin> {
    return this.adminService.adminLogin(adminDto, req);
  }

  @Post("signup")
  postSignup(
    @Body() adminDto: AdminDto,
    @Res() response: Response,
  ): Promise<Admin|Response> {
    return this.adminService.createAdmin(adminDto, response);
  }

  @Get()
  async getAddress(@Query() query: any, @Req() req: Request) {
    return await this.adminService.findAllAddress(query, req);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Admin> {
    return this.adminService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateAddressDto: AdminDto,
    @Param('id') id: string,
  ): Promise<Admin> {
    return this.adminService.update(id, updateAddressDto);
  }
}
