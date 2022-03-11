import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Department } from "../entities/department.entity";
import { Permission } from "../entities/permission.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class UserRepositoryWrapper {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  public async createUser(
    email: string,
    name: string,
    password:string,
    permission: Permission,
    department: Department
    ): Promise<User> {

    const user = new User();

    user.email = email;
    user.name = name;
    user.password = password;
    user.permission = permission;
    user.department = department;

    // Check if the user already exists
    const existingUser = await this.userRepository.findOne(user.email);
    if (existingUser) {
      throw new UnprocessableEntityException('Email already exists');
    }

    return await this.userRepository.save(user);
  }

  public async updateUser(
    email: string,
    name: string,
    password:string,
    permission: Permission,
    department: Department
    ): Promise<User> {
    const user = await this.findOneByEmail(email);

    user.email = email;
    user.name = name;
    user.password = password;
    user.permission = permission;
    user.department = department;

    return await this.userRepository.save(user);
  }

  public async removeUser(
    email: string,
    password: string
  ): Promise<User> {
    const user = await this.findOneByEmail(email);

    if (user.password == password) {
      return await this.userRepository.remove(user);
    } else {
      throw new UnprocessableEntityException('Password is incorrect');
    }
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
