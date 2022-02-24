import { Body, Controller, Delete, Patch, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put('/create')
  createUser(
    @Body() createUserDto: CreateUserDto
  ){
    return this.usersService.createUser(createUserDto);
  }

  @Patch('/update')
  updateUser(
    @Body() updateUserDto: UpdateUserDto
  ){
    return this.usersService.updateUser(updateUserDto);
  }

  @Delete('/remove')
  removeUser(
    @Body() deleteUserDto: RemoveUserDto
  ){
    return this.usersService.removeUser(deleteUserDto);
  }
}
