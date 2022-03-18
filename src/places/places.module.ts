import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { PlaceRepositoryWrapper } from './repository/place.repository';
import { CreatePlaceHandler, RemovePlaceHandler, UpdatePlaceHandler } from './command/place.command.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([Place]), CqrsModule],
  controllers: [PlacesController],
  providers: [PlaceRepositoryWrapper,
    CreatePlaceHandler, UpdatePlaceHandler, RemovePlaceHandler,
  ],
})
export class PlacesModule {}
