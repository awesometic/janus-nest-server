import { ICommand } from '@nestjs/cqrs';

export class CreateEntranceCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly accessTime: Date,
  ) {}
}

export class RemoveEntranceCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly accessTime: Date,
  ) {}
}
