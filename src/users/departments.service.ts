import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { RemoveDepartmentDto } from "./dto/remove-department.dto";
import { Department } from "./entities/department.entity";

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async createDepartment(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = new Department();
    department.name = createDepartmentDto.name;

    return await this.departmentRepository.save(department);
  }

  async removeDepartment(removeDepartmentDto: RemoveDepartmentDto): Promise<Department> {
    const department = await this.findDepartmentByName(removeDepartmentDto.name);

    return await this.departmentRepository.remove(department);
  }

  async findDepartmentByName(name: string): Promise<Department> {
    return await this.departmentRepository.findOne({ name: name });
  }

  async findDepartmentById(id: number): Promise<Department> {
    return await this.departmentRepository.findOne({ id: id });
  }

  async findAllDepartment(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }
}