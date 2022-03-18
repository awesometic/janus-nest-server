import { Body, Controller, Inject, LoggerService, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  CreateUserCommand,
  UpdateUserCommand,
  RemoveUserCommand,
} from './command/user.command';
import { CreateUserDto, UpdateUserDto, RemoveUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    this.logger.debug(`Creating user ${JSON.stringify(createUserDto)}`);

    const { email, name, password, permission, department } = createUserDto;
    const command = new CreateUserCommand(
      email,
      name,
      password,
      permission,
      department,
    );

    return this.commandBus.execute(command);
  }

  @Post('/update')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    this.logger.debug(`Updating user ${JSON.stringify(updateUserDto)}`);

    const { email, name, password, permission, department } = updateUserDto;
    const command = new UpdateUserCommand(
      email,
      name,
      password,
      permission,
      department,
    );

    return this.commandBus.execute(command);
  }

  @Post('/remove')
  removeUser(@Body() removeUserDto: RemoveUserDto) {
    this.logger.debug(`Removing user ${JSON.stringify(removeUserDto)}`);

    const { email, password } = removeUserDto;
    const command = new RemoveUserCommand(email, password);

    return this.commandBus.execute(command);
  }
}
