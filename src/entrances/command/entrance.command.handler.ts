import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EntranceRepositoryWrapper } from '../repository/entrance.repository';
import {
  CreateEntranceCommand,
  RemoveEntranceCommand,
} from './entrance.command';

@Injectable()
@CommandHandler(CreateEntranceCommand)
export class CreateEntranceHandler
  implements ICommandHandler<CreateEntranceCommand>
{
  constructor(
    @Inject(EntranceRepositoryWrapper)
    private entranceRepository: EntranceRepositoryWrapper,
  ) {}

  async execute(command: CreateEntranceCommand): Promise<any> {
    const { userId, accessTime } = command;

    return await this.entranceRepository.createEntrance(userId, accessTime);
  }
}

@Injectable()
@CommandHandler(RemoveEntranceCommand)
export class RemoveEntranceHandler
  implements ICommandHandler<RemoveEntranceCommand>
{
  constructor(
    @Inject(EntranceRepositoryWrapper)
    private entranceRepository: EntranceRepositoryWrapper,
  ) {}

  async execute(command: RemoveEntranceCommand): Promise<any> {
    const { userId, accessTime } = command;

    return await this.entranceRepository.removeEntrance(userId, accessTime);
  }
}
