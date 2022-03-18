import { Inject, Injectable } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PlaceRepositoryWrapper } from "../repository/place.repository";
import { CreatePlaceCommand, RemovePlaceCommand, UpdatePlaceCommand } from "./place.command";

@Injectable()
@CommandHandler(CreatePlaceCommand)
export class CreatePlaceHandler implements ICommandHandler<CreatePlaceCommand> {
  constructor(
    @Inject(PlaceRepositoryWrapper)
    private placeRepository: PlaceRepositoryWrapper,
  ) {}

  async execute(command: CreatePlaceCommand): Promise<any> {
    const { name, longitude, latitude } = command;

    return await this.placeRepository.createPlace(
      name,
      longitude,
      latitude,
    );
  }
}

@Injectable()
@CommandHandler(UpdatePlaceCommand)
export class UpdatePlaceHandler implements ICommandHandler<UpdatePlaceCommand> {
  constructor(
    @Inject(PlaceRepositoryWrapper)
    private placeRepository: PlaceRepositoryWrapper,
  ) {}

  async execute(command: UpdatePlaceCommand): Promise<any> {
    const { name, longitude, latitude } = command;

    return await this.placeRepository.updatePlace(
      name,
      longitude,
      latitude,
    );
  }
}

@Injectable()
@CommandHandler(RemovePlaceCommand)
export class RemovePlaceHandler implements ICommandHandler<RemovePlaceCommand> {
  constructor(
    @Inject(PlaceRepositoryWrapper)
    private placeRepository: PlaceRepositoryWrapper,
  ) {}

  async execute(command: RemovePlaceCommand): Promise<any> {
    const { name } = command;

    return await this.placeRepository.removePlace(
      name,
    );
  }
}
