import { ICommand } from '@nestjs/cqrs';

export class CreateBeaconCommand implements ICommand {
  constructor(
    public readonly macAddress: string,
    public readonly uuid: string,
    public readonly major: string,
    public readonly minor: string,
    public readonly threshold: number,
  ) {}
}

export class UpdateBeaconCommand implements ICommand {
  constructor(
    public readonly macAddress: string,
    public readonly uuid: string,
    public readonly major: string,
    public readonly minor: string,
    public readonly threshold: number,
  ) {}
}

export class RemoveBeaconCommand implements ICommand {
  constructor(public readonly macAddress: string) {}
}
