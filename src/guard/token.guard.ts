import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly userService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, headers } = context.switchToHttp().getRequest();

    const token = headers.authorization?.replace('Bearer ', '');
    const userDb = await this.userService.findOne({ _id: user.id });

    return token === userDb.token;
  }
}
