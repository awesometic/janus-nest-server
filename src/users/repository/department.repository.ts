import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';

@Injectable()
export class DepartmentRepositoryWrapper {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  public async createDepartment(name: string): Promise<Department> {
    const department = new Department();

    department.name = name;

    return await this.departmentRepository.save(department);
  }

  public async removeDepartment(name: string): Promise<Department> {
    const department = await this.findOne(name);

    return await this.departmentRepository.remove(department);
  }

  public async findOne(name: string): Promise<Department> {
    return await this.departmentRepository.findOne({ where: { name } });
  }

  public async findOneById(id: number): Promise<Department> {
    return await this.departmentRepository.findOne({ where: { id } });
  }
}
