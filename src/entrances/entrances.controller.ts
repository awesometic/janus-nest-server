import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntrancesService } from './entrances.service';
import { CreateEntranceDto } from './dto/create-entrance.dto';
import { UpdateEntranceDto } from './dto/update-entrance.dto';

@Controller('entrances')
export class EntrancesController {
  constructor(private readonly entrancesService: EntrancesService) {}

  @Post()
  create(@Body() createEntranceDto: CreateEntranceDto) {
    return this.entrancesService.create(createEntranceDto);
  }

  @Get()
  findAll() {
    return this.entrancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entrancesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntranceDto: UpdateEntranceDto) {
    return this.entrancesService.update(+id, updateEntranceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entrancesService.remove(+id);
  }
}
