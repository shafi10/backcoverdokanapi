import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from '../../schemas/admin.schema';
import {
  AdminDto,
  AdminLoginDto,
  AdminUpdateDto,
} from '../../dto/create-admin.dto';
import { Request, Response } from 'express';
import { AdminAuthGuard } from '../../guards/admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/signin')
  postLogin(
    @Body() adminDto: AdminLoginDto,
    @Res() res: Response,
  ): Promise<Admin | Response> {
    return this.adminService.adminLogin(adminDto, res);
  }

  @Post('/signup')
  // @UseGuards(AdminAuthGuard)
  postSignup(@Body() adminDto: AdminDto): Promise<Admin | Response> {
    return this.adminService.createAdmin(adminDto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  async getAdmin() {
    return await this.adminService.findAllAdmin();
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  delete(@Param('id') id: string): Promise<Admin> {
    return this.adminService.deleteAdmin(id);
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  update(
    @Body() updateAddressDto: AdminUpdateDto,
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Admin> {
    return this.adminService.updateAdmin(id, updateAddressDto, req);
  }
}
