import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartmentsService } from './departments.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { RemovePermissionDto } from './dto/remove-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Department } from './entities/department.entity';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @Inject(DepartmentsService)
    private departmentsService: DepartmentsService,
  ) {}

  async createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    const permission = new Permission();
    permission.name = createPermissionDto.name;
    permission.level = createPermissionDto.level;
    permission.department = await this.verifyDepartment(
      createPermissionDto.departmentId,
    );

    // If there is no permission with the same name, create a new one with level 0
    if (!(await this.findPermission(permission.name))) {
      permission.level = 0;
    }

    return await this.permissionRepository.save(permission);
  }

  async updatePermission(
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    const permission = await this.findPermission(updatePermissionDto.name);

    permission.name = updatePermissionDto.name;
    permission.level = updatePermissionDto.level;
    permission.department = await this.verifyDepartment(
      updatePermissionDto.departmentId,
    );

    return await this.permissionRepository.save(permission);
  }

  async removePermission(
    removePermissionDto: RemovePermissionDto,
  ): Promise<Permission> {
    const permission = await this.findPermission(removePermissionDto.name);

    return await this.permissionRepository.remove(permission);
  }

  async findPermission(name: string): Promise<Permission> {
    return await this.permissionRepository.findOne({ name: name });
  }

  async findAllPermissions(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }

  async verifyDepartment(departmentId: number): Promise<Department> {
    const targetDepartment = await this.departmentsService.findDepartmentById(
      departmentId,
    );

    // Do not proceed if the department does not exist
    if (!targetDepartment) {
      throw new UnprocessableEntityException('Department not found');
    }

    return targetDepartment;
  }
}
