import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  CreateUserCommand,
  UpdateUserCommand,
  RemoveUserCommand,
  VerifyEmailCommand,
} from './command/user.command';
import { CreateUserDto, UpdateUserDto, RemoveUserDto } from './dto/user.dto';
import {
  GetUserInfoByEmailQuery,
  GetUserInfoByIdQuery,
  GetUserInfoQueryResult,
} from './query/get-user-info.query';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
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

  @Get('/email-verification')
  async verifyEmail(@Query('token') token: string) {
    this.logger.debug(`Verifying token ${token}`);

    const command = new VerifyEmailCommand(token);

    return this.commandBus.execute(command);
  }

  @Get()
  getUserInfo(@Request() req): Promise<GetUserInfoQueryResult> {
    const email = req.uesr.email || null;
    const id = req.user.id || null;

    if (!(email || id)) {
      throw new BadRequestException('Email or id is required');
    }

    let query: GetUserInfoByEmailQuery | GetUserInfoByIdQuery;
    if (email) {
      query = new GetUserInfoByEmailQuery(email);
    } else {
      query = new GetUserInfoByIdQuery(id);
    }

    return this.queryBus.execute(query);
  }
}
