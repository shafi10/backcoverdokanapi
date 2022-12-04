import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from '../../schemas/auth.schema';
import {
  CreateAuthDto,
  LoginAuthDto,
  UpdateAuthDto,
} from '../../dto/create-auth.dto';
import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import { config } from '../../../config';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}
  async createUser(
    user: CreateAuthDto,
    response: Response,
  ): Promise<{ token: string } | any> {
    if (!user?.token) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Invalid request' });
    }
    const decode: any = jwt_decode(user?.token);
    const isUser = await this.authModel.findOne({ AuthId: decode.user_id });
    if (isUser) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'User Already registered' });
    }

    const newUser = {
      name: user?.name,
      AuthId: decode?.user_id,
      age: user?.age,
      gender: user?.gender,
      address: user?.address,
      phone: user?.phone,
      email: decode?.email ? decode?.email : '',
      avatar: '',
    };
    const createdUser = await new this.authModel(newUser).save();
    const payload = {
      user: {
        id: createdUser?._id,
        authId: createdUser?.AuthId,
      },
    };

    jwt.sign(
      payload,
      config?.jwtSecret,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        response.json({ token });
      },
    );
  }

  async loginUser(
    user: LoginAuthDto,
    response: Response,
  ): Promise<LoginAuthDto | any> {
    if (!user?.token) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Invalid request' });
    }
    const decode: any = jwt_decode(user?.token);
    const isUser = await this.authModel.findOne({ AuthId: decode.user_id });
    if (!isUser) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Patient not registered' });
    }

    const payload = {
      user: {
        id: isUser?._id,
        authId: isUser?.AuthId,
      },
    };

    jwt.sign(
      payload,
      config?.jwtSecret,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        response.json({ token });
      },
    );
  }

  async findAnUser(req: Request): Promise<Auth> {
    const decode: any = jwt_decode(req?.headers?.authorization);
    return await this.authModel.findOne({ _id: decode?.user?.id });
  }

  async update(updateProfile: UpdateAuthDto, req: Request): Promise<Auth> {
    const decode: any = jwt_decode(req?.headers?.authorization);
    return await this.authModel.findByIdAndUpdate(
      decode?.user?.id,
      updateProfile,
      { new: true },
    );
  }
}
