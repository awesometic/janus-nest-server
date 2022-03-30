import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CreateUserCommand,
  RemoveUserCommand,
  UpdateUserCommand,
  VerifyEmailCommand,
} from './user.command';
import * as uuid from 'uuid';
import { UserRepositoryWrapper } from '../repository/user.repository';
import { EmailSenderService } from 'src/email/email-sender.service';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserRepositoryWrapper)
    private userRepository: UserRepositoryWrapper,
    @Inject(EmailSenderService)
    private emailSenderService: EmailSenderService,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const { email, name, password, permission, department } = command;

    if (!(await this.userRepository.checkUserExists(email))) {
      throw new UnprocessableEntityException('Email already exists');
    }

    const verifyToken = uuid.v1();

    // TODO: Will send the results after the email is sent but I want the results of the createUser method
    const createReturns = await this.userRepository.createUser(
      email,
      name,
      password,
      permission,
      department,
      verifyToken,
    );

    await this.emailSenderService.sendVerification(email, verifyToken);

    return createReturns;
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
      department,
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

    return await this.userRepository.removeUser(email, password);
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

    return await this.userRepository.verifyUserEmail(verifyToken);
  }
}
