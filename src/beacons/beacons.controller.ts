import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BeaconsService } from './beacons.service';
import { CreateBeaconDto } from './dto/create-beacon.dto';
import { UpdateBeaconDto } from './dto/update-beacon.dto';

@Controller('beacons')
export class BeaconsController {
  constructor(private readonly beaconsService: BeaconsService) {}

  @Post()
  create(@Body() createBeaconDto: CreateBeaconDto) {
    return this.beaconsService.create(createBeaconDto);
  }

  @Get()
  findAll() {
    return this.beaconsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beaconsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeaconDto: UpdateBeaconDto) {
    return this.beaconsService.update(+id, updateBeaconDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beaconsService.remove(+id);
  }
}
