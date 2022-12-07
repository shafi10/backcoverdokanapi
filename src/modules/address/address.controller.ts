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
} from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from '../../schemas/address.schema';
import { AddressDto, GetAddressQueryDto } from 'src/dto/create-address.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { GetStatus } from 'utils/types';

@Controller('address')
@UseGuards(AuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  postAddress(
    @Body() address: AddressDto,
    @Req() req: Request,
  ): Promise<Address> {
    return this.addressService.createAddress(address, req);
  }

  @Get()
  async getAddress(@Query() query: GetAddressQueryDto, @Req() req: Request) {
    return await this.addressService.findAllAddress(query, req);
  }

  @Get(':id')
  async getAddressbyId(@Param('id') id: string) {
    return await this.addressService.findAddressById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Address | GetStatus> {
    return this.addressService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateAddressDto: AddressDto,
    @Param('id') id: string,
  ): Promise<Address | GetStatus> {
    return this.addressService.update(id, updateAddressDto);
  }
}
