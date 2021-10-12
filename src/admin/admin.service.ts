import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { UpdateUserDto } from 'src/dto/UpdateUserDto';
import { UpdatePasswordDto } from 'src/dto/UpdatePasswordDto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const checkUser = await this.findOne({ username: userDto.username });

    if (checkUser) {
      return checkUser;
    }

    userDto.password = hashSync(userDto.password, 10);
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  async updatePassword(id: string, passDto: UpdatePasswordDto) {
    passDto.password = hashSync(passDto.password, 10);
    return await this.userModel.findByIdAndUpdate(id, passDto);
  }

  async updateToken(id: string, token: string) {
    return await this.userModel.findByIdAndUpdate(id, { token });
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    const checkUser = await this.findAll({ username: userDto.username });

    if (checkUser.some((user) => user._id != id)) {
      throw new BadRequestException('Username já em uso');
    }

    return await this.userModel.findByIdAndUpdate(id, {
      name: userDto.name,
      username: userDto.username,
    });
  }

  async findAll(filter = {}): Promise<User[]> {
    return await this.userModel.find(filter).exec();
  }

  async findOne(filter = {}): Promise<User> {
    return await this.userModel.findOne(filter).exec();
  }

  async delete(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
