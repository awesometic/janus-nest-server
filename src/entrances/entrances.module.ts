import { Module } from '@nestjs/common';
import { EntrancesController } from './entrances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entrance } from './entities/entrance.entity';
import { User } from 'src/users/entities/user.entity';
import { UserRepositoryWrapper } from 'src/users/repository/user.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { EntranceRepositoryWrapper } from './repository/entrance.repository';
import {
  CreateEntranceHandler,
  RemoveEntranceHandler,
} from './command/entrance.command.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Entrance, User]), CqrsModule],
  controllers: [EntrancesController],
  providers: [
    EntranceRepositoryWrapper,
    UserRepositoryWrapper,
    CreateEntranceHandler,
    RemoveEntranceHandler,
  ],
})
export class EntrancesModule {}
