import { Body, Controller, Inject, LoggerService, Post } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CreateUserDto } from './dto/create-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    this.logger.debug(`Creating user ${JSON.stringify(createUserDto)}`);

    return this.usersService.createUser(createUserDto);
  }

  @Post('/update')
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    this.logger.debug(`Updating user ${JSON.stringify(updateUserDto)}`);

    return this.usersService.updateUser(updateUserDto);
  }

  @Post('/remove')
  removeUser(@Body() removeUserDto: RemoveUserDto) {
    this.logger.debug(`Removing user ${JSON.stringify(removeUserDto)}`);

    return this.usersService.removeUser(removeUserDto);
  }
}
