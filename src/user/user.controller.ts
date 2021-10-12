import { Body, Controller, Get, Put } from '@nestjs/common';
import { UpdatePasswordDto } from 'src/dto/UpdatePasswordDto';
import { UserService } from './user.service';
import { User } from 'src/decorators/user.decorator';
import { Role } from 'src/enums/role.enum';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('api/service/user')
@Auth(Role.User)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile/get')
  getProfile(@User() user: any) {
    return this.userService.getProfile(user.id);
  }

  @Put('profile/update')
  updatePassword(@User() user: any, @Body() passDto: UpdatePasswordDto) {
    return this.userService.updatePassword(user.id, passDto);
  }
}
