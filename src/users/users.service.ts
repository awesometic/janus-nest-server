import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(): Promise<User> {
    const user = new User();
    user.name = 'test';
    user.email = '';
    user.password = '';
    return await this.userRepository.save(user);
  }

  async removeUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
