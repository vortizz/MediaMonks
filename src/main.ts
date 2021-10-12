import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AdminService } from './admin/admin.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const apiPort = process.env.API_PORT;
  await app.listen(apiPort);
  console.log(`Running at ${apiPort}`);

  const userService = app.get(AdminService);
  await userService.create({
    name: process.env.USER_DEFAULT_NAME,
    username: process.env.USER_DEFAULT_USERNAME,
    password: process.env.USER_DEFAULT_PASSWORD,
    login_type: process.env.USER_DEFAULT_LOGIN_TYPE,
  });

  console.log(
    `Usuário ADMIN padrão criado!\nusername:${process.env.USER_DEFAULT_USERNAME}\npassword:${process.env.USER_DEFAULT_PASSWORD}`,
  );
}
bootstrap();
