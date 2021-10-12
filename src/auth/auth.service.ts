import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ id, username, login_type }) {
    const token = this.jwtService.sign({ id, username, login_type });

    await this.usersService.updateToken(id, token);

    return { token };
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne({ username });

    if (!user) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
