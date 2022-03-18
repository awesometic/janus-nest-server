import { ICommand } from "@nestjs/cqrs";

export class CreatePlaceCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly longitude: number,
    public readonly latitude: number,
  ) { }
}

export class UpdatePlaceCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly longitude: number,
    public readonly latitude: number,
  ) { }
}

export class RemovePlaceCommand implements ICommand {
  constructor(
    public readonly name: string,
  ) { }
}
