import { Body, Controller, Post } from "@nestjs/common";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { RemoveDepartmentDto } from "./dto/remove-department.dto";
import { DepartmentsService } from "./departments.service";

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post('/create')
  createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto
  ){
    return this.departmentsService.createDepartment(createDepartmentDto);
  }

  @Post('/remove')
  removeDepartment(
    @Body() removeDepartmentDto: RemoveDepartmentDto
  ){
    return this.departmentsService.removeDepartment(removeDepartmentDto);
  }
}