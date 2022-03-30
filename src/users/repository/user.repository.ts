import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { Permission } from '../entities/permission.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepositoryWrapper {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async createUser(
    email: string,
    name: string,
    password: string,
    permission: Permission,
    department: Department,
    verifyToken: string,
  ): Promise<User> {
    const user = new User();

    user.email = email;
    user.name = name;
    user.password = password;
    user.permission = permission;
    user.department = department;
    user.verifyToken = verifyToken;

    return await this.userRepository.save(user);
  }

  public async updateUser(
    email: string,
    name: string,
    password: string,
    permission: Permission,
    department: Department,
  ): Promise<User> {
    const user = await this.findOneByEmail(email);

    user.email = email;
    user.name = name;
    user.password = password;
    user.permission = permission;
    user.department = department;

    return await this.userRepository.save(user);
  }

  public async removeUser(email: string, password: string): Promise<User> {
    const user = await this.findOneByEmail(email);

    if (user.password == password) {
      return await this.userRepository.remove(user);
    } else {
      throw new UnprocessableEntityException('Password is incorrect');
    }
  }

  public async checkUserExists(email: string): Promise<boolean> {
    return (await this.findOneByEmail(email)) !== null;
  }

  public async checkUserVerified(verifyToken: string): Promise<boolean> {
    // TODO: 0 means active/verified, but also means not blocked or at another condition
    return (await this.userRepository.findOne({ verifyToken })).status == 0;
  }

  public async verifyUserEmail(verifyToken: string): Promise<User | null> {
    const user = await this.findOneByToken(verifyToken);

    if (user !== null) {
      user.status = 0;
      return await this.userRepository.save(user);
    } else {
      throw new UnprocessableEntityException('User not found');
    }
  }

  public async findOneByToken(verifyToken: string): Promise<User | null> {
    return await this.userRepository.findOne({ verifyToken });
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ email });
  }

  public async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ id });
  }

  public async findAll(): Promise<User[] | null> {
    return await this.userRepository.find();
  }
}
