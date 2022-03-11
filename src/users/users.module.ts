import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Permission } from './entities/permission.entity';
import { Department } from './entities/department.entity';
import { PermissionsController } from './permissions.controller';
import { DepartmentsController } from './departments.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler, UpdateUserHandler } from './command/user.command.handler';
import { RemoveUserCommand } from './command/user.command';
import { CreatePermissionHandler, RemovePermissionHandler, UpdatePermissionHandler } from './command/permission.command.handler';
import { CreateDepartmentHandler, RemoveDepartmentHandler } from './command/department.command.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission, Department]),
    CqrsModule,
  ],
  controllers: [UsersController, PermissionsController, DepartmentsController],
  providers: [
    CreateUserHandler, UpdateUserHandler, RemoveUserCommand,
    CreatePermissionHandler, UpdatePermissionHandler, RemovePermissionHandler,
    CreateDepartmentHandler, RemoveDepartmentHandler,
  ],
})
export class UsersModule {}
