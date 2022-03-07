import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'geojson';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { RemovePlaceDto } from './dto/remove-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    const place = new Place();

    place.name = createPlaceDto.name;
    place.location = {
      type: 'Point',
      coordinates: [createPlaceDto.longitude, createPlaceDto.latitude],
    } as Point;

    return await this.placeRepository.save(place);
  }

  async update(updatePlaceDto: UpdatePlaceDto) {
    const place = new Place();

    place.name = updatePlaceDto.name;
    place.location = {
      type: 'Point',
      coordinates: [updatePlaceDto.longitude, updatePlaceDto.latitude],
    } as Point;

    return await this.placeRepository.save(place);
  }

  async remove(removePlaceDto: RemovePlaceDto) {
    const place = await this.findPlaceByName(removePlaceDto.name);

    return await this.placeRepository.remove(place);
  }

  async findPlaceByName(name: string): Promise<Place> {
    return await this.placeRepository.findOne({ name: name });
  }

  async findAll(): Promise<Place[]> {
    return await this.placeRepository.find();
  }
}
