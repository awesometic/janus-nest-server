import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Permission } from './entities/permission.entity';
import { Department } from './entities/department.entity';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission, Department])],
  controllers: [UsersController, PermissionsController, DepartmentsController],
  providers: [UsersService, PermissionsService, DepartmentsService],
})
export class UsersModule {}
