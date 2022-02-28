import { Body, Controller, Inject, LoggerService, Post } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { RemoveDepartmentDto } from './dto/remove-department.dto';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly departmentsService: DepartmentsService,
  ) {}

  @Post('/create')
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    this.logger.debug(
      `Creating department ${JSON.stringify(createDepartmentDto)}`,
    );

    return this.departmentsService.createDepartment(createDepartmentDto);
  }

  @Post('/remove')
  removeDepartment(@Body() removeDepartmentDto: RemoveDepartmentDto) {
    this.logger.debug(
      `Removing department ${JSON.stringify(removeDepartmentDto)}`,
    );

    return this.departmentsService.removeDepartment(removeDepartmentDto);
  }
}
