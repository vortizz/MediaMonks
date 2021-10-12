import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync } from 'bcrypt';
import { Model } from 'mongoose';
import { UpdatePasswordDto } from 'src/dto/UpdatePasswordDto';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getProfile(id: string) {
    return await this.userModel.findById(id);
  }

  async updatePassword(id: string, passDto: UpdatePasswordDto) {
    passDto.password = hashSync(passDto.password, 10);
    return await this.userModel.findByIdAndUpdate(id, passDto);
  }
}
