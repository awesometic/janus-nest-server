import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import {
  CreateUserCommand,
  CreateUserCommandResult,
  RemoveUserCommand,
  RemoveUserCommandResult,
  UpdateUserCommand,
  UpdateUserCommandResult,
  VerifyEmailCommand,
} from './user.command';
import * as uuid from 'uuid';
import { UserRepositoryWrapper } from '../repository/user.repository';
import { UserCreated } from '../event/user.created';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserRepositoryWrapper)
    private userRepository: UserRepositoryWrapper,
    private eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserCommandResult> {
    const { email, name, password, permission, department } = command;

    if (!(await this.userRepository.checkUserExists(email))) {
      throw new UnprocessableEntityException('Email already exists');
    }

    const verifyToken = uuid.v1();

    // TODO: Will send the results after the email is sent but I want the results of the createUser method
    const results = await this.userRepository.createUser(
      email,
      name,
      password,
      permission,
      department,
      verifyToken,
    );

    this.eventBus.publish(new UserCreated(email, verifyToken));

    return {
      userId: results.id,
      email: results.email,
    };
  }
}

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(UserRepositoryWrapper)
    private userRepository: UserRepositoryWrapper,
  ) {}

  async execute(command: UpdateUserCommand): Promise<UpdateUserCommandResult> {
    const { email, name, password, permission, department } = command;

    const results = await this.userRepository.updateUser(
      email,
      name,
      password,
      permission,
      department,
    );

    return {
      userId: results.id,
      email: results.email,
    };
  }
}

@Injectable()
@CommandHandler(RemoveUserCommand)
export class RemoveUserHandler implements ICommandHandler<RemoveUserCommand> {
  constructor(
    @Inject(UserRepositoryWrapper)
    private userRepository: UserRepositoryWrapper,
  ) {}

  async execute(command: RemoveUserCommand): Promise<RemoveUserCommandResult> {
    const { email, password } = command;

    const results = await this.userRepository.removeUser(email, password);

    return {
      userId: results.id,
      email: results.email,
    };
  }
}

@Injectable()
@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
  constructor(
    @Inject(UserRepositoryWrapper)
    private userRepository: UserRepositoryWrapper,
  ) {}

  async execute(command: VerifyEmailCommand): Promise<any> {
    const { verifyToken } = command;

    if (await this.userRepository.checkUserVerified(verifyToken)) {
      throw new UnprocessableEntityException('Email already verified');
    }

    const results = await this.userRepository.verifyUserEmail(verifyToken);

    return {
      userId: results.id,
      email: results.email,
      verifyToken: results.verifyToken,
    };
  }
}
