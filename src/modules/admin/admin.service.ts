import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '../../schemas/admin.schema';
import {
  AdminDto,
  AdminLoginDto,
  AdminUpdateDto,
} from '../../dto/create-admin.dto';
import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { config } from 'config';
import jwt_decode from 'jwt-decode';

const saltRounds = 10;

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}
  async adminLogin(loginDto: AdminLoginDto, response: Response): Promise<any> {
    const isAdmin = await this.adminModel.findOne({ email: loginDto?.email });
    if (!isAdmin) {
      throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
    }

    let isMatch = await bcrypt.compare(loginDto?.password, isAdmin.password);
    if (!isMatch) {
      throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
    }

    const payload = {
      admin: {
        id: isAdmin?._id,
      },
    };

    const token = await jwt.sign(payload, config?.jwtAdminSecret, {
      expiresIn: 360000,
    });
    response.json({ token });
  }

  async createAdmin(adminDto: AdminDto): Promise<Admin | Response> {
    const user = await this.adminModel.findOne({ email: adminDto?.email });
    if (user) {
      throw new HttpException(
        'User Already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(adminDto?.password, salt);

    let admin = {
      ...adminDto,
      password: hash,
    };

    const newAdmin = new this.adminModel(admin);
    return newAdmin.save();
  }

  async findAllAdmin(): Promise<Admin[]> {
    return await this.adminModel.find().select('-password');
  }

  async findAdminInfo(req: Request): Promise<Admin> {
    try {
      const decode: any = jwt_decode(req?.headers?.authorization);
      const admin = await this.adminModel
        .findById(decode?.admin?.id)
        .select('-password');
      if (admin) {
        return admin;
      } else {
        throw new HttpException('Admin not found', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAdmin(id: string): Promise<Admin> {
    return await this.adminModel.findByIdAndRemove(id);
  }

  async updateAdmin(
    id: string,
    address: AdminUpdateDto,
    req: Request,
  ): Promise<Admin> {
    const decode: any = jwt_decode(req?.headers?.authorization);
    if (decode?.admin.id !== id) {
      throw new HttpException('Admin not found', HttpStatus.BAD_REQUEST);
    }
    const isAdmin = await this.adminModel.findOne({ _id: id });
    if (isAdmin) {
      return await this.adminModel.findByIdAndUpdate(id, address, {
        new: true,
      });
    }

    throw new HttpException('Admin not found', HttpStatus.BAD_REQUEST);
  }
}
