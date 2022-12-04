import { Injectable,HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '../../schemas/admin.schema';
import { AdminDto, AdminLoginDto } from '../../dto/create-admin.dto';
import jwt_decode from 'jwt-decode';
import { Response, Request } from 'express';
// const bcrypt = require('bcryptjs')

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}
  async adminLogin(address: AdminLoginDto, req: Request): Promise<Admin> {
    const decode: any = jwt_decode(req?.headers?.authorization);
    const newAddress = {
      ...address,
      userId: decode?.user?.id,
    };
    const newProduct = new this.adminModel(newAddress);
    return await newProduct.save();
  }

  async createAdmin(
    adminDto: AdminDto,
    response: Response,
  ): Promise<Admin | Response> {
    const user = await this.adminModel.findOne({ email: adminDto?.email });
    if (user) {
      // return response
      // .status(HttpStatus.BAD_REQUEST)
      // .send({ message: 'User Already registered' });
      throw new HttpException('User Already registered', HttpStatus.BAD_REQUEST);
    }
    // const salt = await bcrypt.genSalt(10)
    // const hashpass = await bcrypt.hash(adminDto?.password , salt)
    // let admin = {
    //   ...adminDto,
    //   password: hashpass
    // }
    const newAdmin = new this.adminModel(adminDto);
    return await newAdmin.save();
  }

  async findAllAddress(query: any, req: Request): Promise<Admin[]> {
    const decode: any = jwt_decode(req?.headers?.authorization);
    return await this.adminModel
      .find({ userId: decode?.user?.id })
      .select('-userId')
      .limit(query?.limit);
  }

  async delete(id: string): Promise<Admin> {
    return await this.adminModel.findByIdAndRemove(id);
  }

  async update(id: string, address: AdminDto): Promise<Admin> {
    return await this.adminModel.findByIdAndUpdate(id, address, {
      new: true,
    });
  }
}
