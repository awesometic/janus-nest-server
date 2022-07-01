import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from 'geojson';
import { Repository } from 'typeorm';
import { Place } from '../entities/place.entity';

@Injectable()
export class PlaceRepositoryWrapper {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  public async createPlace(
    name: string,
    longitude: number,
    latitude: number,
  ): Promise<Place> {
    const place = new Place();

    place.name = name;
    place.location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    } as Point;

    return await this.placeRepository.save(place);
  }

  public async updatePlace(
    name: string,
    longitude: number,
    latitude: number,
  ): Promise<Place> {
    const place = await this.findOneByName(name);

    place.name = name;
    place.location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    } as Point;

    return await this.placeRepository.save(place);
  }

  public async removePlace(name: string): Promise<Place> {
    const place = await this.findOneByName(name);

    return await this.placeRepository.remove(place);
  }

  async findOneById(id: number): Promise<Place> {
    return await this.placeRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string): Promise<Place> {
    return await this.placeRepository.findOne({ where: { name } });
  }

  async findAll(): Promise<Place[]> {
    return await this.placeRepository.find();
  }
}
