// src/users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userData: Omit<User, 'id'>) {
    try {
      const user = await this.usersService.create(userData);
      return { message: 'Usuario registrado exitosamente', user };
    } catch (error) {
      return { message: 'Error al registrar usuario', error: error.message };
    }
  }
}