import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Post,
  Request,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  CreateDepartmentCommand,
  RemoveDepartmentCommand,
} from './command/department.command';
import { CreateDepartmentDto, RemoveDepartmentDto } from './dto/department.dto';
import {
  GetDepartmentInfoByIdQuery,
  GetDepartmentInfoByNameQuery,
  GetDepartmentInfoQueryResult,
} from './query/get-department-info.query';

@Controller('departments')
export class DepartmentsController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
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

  @Get()
  getDepartmentInfo(@Request() req): Promise<GetDepartmentInfoQueryResult> {
    const name = req.department.name || null;
    const id = req.department.id || null;

    if (!(name || id)) {
      throw new BadRequestException('Department name or id is required');
    }

    let query: GetDepartmentInfoByNameQuery | GetDepartmentInfoByIdQuery;
    if (name) {
      query = new GetDepartmentInfoByNameQuery(name);
    } else {
      query = new GetDepartmentInfoByIdQuery(id);
    }

    return this.queryBus.execute(query);
  }
}
