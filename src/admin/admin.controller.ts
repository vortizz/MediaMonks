import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { UpdatePasswordDto } from 'src/dto/UpdatePasswordDto';
import { UpdateUserDto } from 'src/dto/UpdateUserDto';
import { AdminService } from './admin.service';
import { User } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('api/service/master')
@Auth(Role.Admin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('profile/get')
  getProfile(@User() user: any) {
    return this.adminService.findOne({ _id: user.id });
  }

  @Put('profile/update')
  updatePassword(@User() user: any, @Body() passDto: UpdatePasswordDto) {
    return this.adminService.updatePassword(user.id, passDto);
  }

  @Post('user/create')
  create(@Body() userDto: CreateUserDto) {
    return this.adminService.create(userDto);
  }

  @Put('user/update/:userId')
  update(@Param('userId') id, @Body() userDto: UpdateUserDto) {
    return this.adminService.update(id, userDto);
  }

  @Delete('user/delete/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('userId') id) {
    return this.adminService.delete(id);
  }

  @Get('user/list')
  findAll() {
    return this.adminService.findAll();
  }
}
