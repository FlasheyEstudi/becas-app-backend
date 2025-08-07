// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return await this.usersRepository.save(user);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ username });
    return user || undefined;
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}