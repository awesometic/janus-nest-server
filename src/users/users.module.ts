import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Permission } from './entities/permission.entity';
import { Department } from './entities/department.entity';
import { PermissionsController } from './permissions.controller';
import { DepartmentsController } from './departments.controller';
import { CqrsModule } from '@nestjs/cqrs';
import {
  CreateUserHandler,
  RemoveUserHandler,
  UpdateUserHandler,
  VerifyEmailHandler,
} from './command/user.command.handler';
import {
  CreatePermissionHandler,
  RemovePermissionHandler,
  UpdatePermissionHandler,
} from './command/permission.command.handler';
import {
  CreateDepartmentHandler,
  RemoveDepartmentHandler,
} from './command/department.command.handler';
import { UserRepositoryWrapper } from './repository/user.repository';
import { PermissionRepositoryWrapper } from './repository/permission.repository';
import { DepartmentRepositoryWrapper } from './repository/department.repository';
import { EmailSenderService } from 'src/email/email-sender.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission, Department]),
    CqrsModule,
  ],
  controllers: [UsersController, PermissionsController, DepartmentsController],
  providers: [
    UserRepositoryWrapper,
    PermissionRepositoryWrapper,
    DepartmentRepositoryWrapper,
    CreateUserHandler,
    UpdateUserHandler,
    RemoveUserHandler,
    CreatePermissionHandler,
    UpdatePermissionHandler,
    RemovePermissionHandler,
    CreateDepartmentHandler,
    RemoveDepartmentHandler,
    VerifyEmailHandler,
    EmailSenderService,
  ],
})
export class UsersModule {}
