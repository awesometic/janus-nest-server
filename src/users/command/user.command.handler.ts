import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand, RemoveUserCommand, UpdateUserCommand } from "./user.command";
import { UserRepositoryWrapper } from "../repository/user.repository";

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserRepositoryWrapper)
    private userRepository: UserRepositoryWrapper,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
      const { email, name, password, permission, department } = command;

      return await this.userRepository.createUser(
        email,
        name,
        password,
        permission,
        department
      );
  }
}

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(UserRepositoryWrapper)
    private userRepository: UserRepositoryWrapper,
  ) {}

  async execute(command: UpdateUserCommand): Promise<any> {
      const { email, name, password, permission, department } = command;

      return await this.userRepository.updateUser(
        email,
        name,
        password,
        permission,
        department
      );
  }
}

@Injectable()
@CommandHandler(RemoveUserCommand)
export class RemoveUserHandler implements ICommandHandler<RemoveUserCommand> {
  constructor(
    @Inject(UserRepositoryWrapper)
    private userRepository: UserRepositoryWrapper,
  ) {}

  async execute(command: RemoveUserCommand): Promise<any> {
      const { email, password } = command;

      return await this.userRepository.removeUser(
        email,
        password,
      );
  }
}