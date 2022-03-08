import { Module } from '@nestjs/common';
import { EntrancesService } from './entrances.service';
import { EntrancesController } from './entrances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrance } from './entities/entrance.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entrance, User])],
  controllers: [EntrancesController],
  providers: [EntrancesService, UsersService],
})
export class EntrancesModule {}
