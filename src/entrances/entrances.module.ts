import { Module } from '@nestjs/common';
import { EntrancesService } from './entrances.service';
import { EntrancesController } from './entrances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrance } from './entities/entrance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entrance])
  ],
  controllers: [EntrancesController],
  providers: [EntrancesService]
})
export class EntrancesModule {}
