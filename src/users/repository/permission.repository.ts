import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { DepartmentRepositoryWrapper } from './department.repository';

@Injectable()
export class PermissionRepositoryWrapper {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @Inject(DepartmentRepositoryWrapper)
    private readonly departmentRepositoryWrapper: DepartmentRepositoryWrapper,
  ) {}

  public async createPermission(
    name: string,
    level: number,
    departmentId: number,
  ): Promise<Permission> {
    const permission = new Permission();

    permission.name = name;
    permission.level = level;
    permission.department = await this.departmentRepositoryWrapper.findOneById(
      departmentId,
    );

    return await this.permissionRepository.save(permission);
  }

  public async updatePermission(
    name: string,
    level: number,
    departmentId: number,
  ): Promise<Permission> {
    const permission = await this.findOne(name, departmentId);

    permission.name = name;
    permission.level = level;
    permission.department = await this.departmentRepositoryWrapper.findOneById(
      departmentId,
    );

    return await this.permissionRepository.save(permission);
  }

  public async removePermission(
    name: string,
    departmentId: number,
  ): Promise<Permission> {
    const permission = await this.findOne(name, departmentId);

    return await this.permissionRepository.remove(permission);
  }

  public async findOne(
    name: string,
    departmentId: number,
  ): Promise<Permission> {
    const department = await this.departmentRepositoryWrapper.findOneById(
      departmentId,
    );

    return await this.permissionRepository.findOne({
      where: {
        name: name,
        department: {
          id: department.id,
        },
      },
    });
  }

  public async findAll(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }
}
