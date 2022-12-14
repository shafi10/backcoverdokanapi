import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from '../../schemas/address.schema';
import { AddressDto, GetAddressQueryDto } from '../../dto/create-address.dto';
import jwt_decode from 'jwt-decode';
import { Request } from 'express';
import { GetStatus } from '../../../utils/types';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
  ) {}
  async createAddress(address: AddressDto, req: Request): Promise<Address> {
    const decode: any = jwt_decode(req?.headers?.authorization);
    const newAddress = {
      ...address,
      userId: decode?.user?.id,
    };
    const newProduct = new this.addressModel(newAddress);
    return await newProduct.save();
  }

  async findAllAddress(
    query: GetAddressQueryDto,
    req: Request,
  ): Promise<Address[]> {
    const decode: any = jwt_decode(req?.headers?.authorization);
    return await this.addressModel
      .find({ userId: decode?.user?.id })
      .select('-userId')
      .limit(+query?.limit);
  }

  async findAddressById(id: string): Promise<Address> {
    try {
      return await this.addressModel.findById(id);
    } catch (error) {}
  }

  async delete(id: string): Promise<Address | GetStatus> {
    try {
      await this.addressModel.findByIdAndRemove(id);
      return {
        status: 'Success',
        message: 'Delete address successful',
      };
    } catch (error) {}
  }

  async update(id: string, address: AddressDto): Promise<Address | GetStatus> {
    try {
      await this.addressModel.findByIdAndUpdate(id, address, {
        new: true,
      });
      return {
        status: 'Success',
        message: 'Delete address successful',
      };
    } catch (error) {}
  }
}
