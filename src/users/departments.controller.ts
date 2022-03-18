import { Body, Controller, Inject, LoggerService, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  CreateDepartmentCommand,
  RemoveDepartmentCommand,
} from './command/department.command';
import { CreateDepartmentDto, RemoveDepartmentDto } from './dto/department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('/create')
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    this.logger.debug(
      `Creating department ${JSON.stringify(createDepartmentDto)}`,
    );

    const { name } = createDepartmentDto;
    const command = new CreateDepartmentCommand(name);

    return this.commandBus.execute(command);
  }

  @Post('/remove')
  removeDepartment(@Body() removeDepartmentDto: RemoveDepartmentDto) {
    this.logger.debug(
      `Removing department ${JSON.stringify(removeDepartmentDto)}`,
    );

    const { name } = removeDepartmentDto;
    const command = new RemoveDepartmentCommand(name);

    return this.commandBus.execute(command);
  }
}
