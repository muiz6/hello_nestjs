import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async getUserById(id: string) {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      return response.data.data;
    } catch (e) {
      return new NotFoundException();
    }
  }

  async getUserRecordById(id: string) {
    return this.userModel.findOne({ id });
  }

  async createUser(user: User) {
    const createdUser = new this.userModel(user);
    await createdUser.save();
  }

  async getUserImage() { }

  async deleteUserImage() { }
}
