import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.permission = createUserDto.permission;
    user.department = createUserDto.department;

    // Check if the user already exists
    const existingUser = await this.userRepository.findOne(user.email);
    if (existingUser) {
      throw new UnprocessableEntityException('Email already exists');
    }

    return await this.userRepository.save(user);
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUser(updateUserDto.email);

    user.name = updateUserDto.name;
    user.password = updateUserDto.password;
    user.permission = updateUserDto.permission;
    user.department = updateUserDto.department;

    return await this.userRepository.save(user);
  }

  async removeUser(removeUserDto: RemoveUserDto): Promise<User> {
    const user = await this.findUser(removeUserDto.email);

    if (user.password == removeUserDto.password) {
      return await this.userRepository.remove(user);
    } else {
      throw new UnprocessableEntityException('Password is incorrect');
    }
  }

  async findUser(email: string): Promise<User> {
    return await this.userRepository.findOne({ email: email });
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({ id: id });
  }

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
