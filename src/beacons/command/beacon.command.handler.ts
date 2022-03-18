import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BeaconRepositoryWrapper } from '../repository/beacon.repository';
import {
  CreateBeaconCommand,
  RemoveBeaconCommand,
  UpdateBeaconCommand,
} from './beacon.command';

@Injectable()
@CommandHandler(CreateBeaconCommand)
export class CreateBeaconHandler
  implements ICommandHandler<CreateBeaconCommand>
{
  constructor(
    @Inject(BeaconRepositoryWrapper)
    private readonly beaconRepository: BeaconRepositoryWrapper,
  ) {}

  execute(command: CreateBeaconCommand): Promise<any> {
    const { macAddress, uuid, major, minor, threshold } = command;

    return this.beaconRepository.createBeacon(
      macAddress,
      uuid,
      major,
      minor,
      threshold,
    );
  }
}

@Injectable()
@CommandHandler(UpdateBeaconCommand)
export class UpdateBeaconHandler
  implements ICommandHandler<UpdateBeaconCommand>
{
  constructor(
    @Inject(BeaconRepositoryWrapper)
    private readonly beaconRepository: BeaconRepositoryWrapper,
  ) {}

  execute(command: UpdateBeaconCommand): Promise<any> {
    const { macAddress, uuid, major, minor, threshold } = command;

    return this.beaconRepository.updateBeacon(
      macAddress,
      uuid,
      major,
      minor,
      threshold,
    );
  }
}

@Injectable()
@CommandHandler(RemoveBeaconCommand)
export class RemoveBeaconHandler
  implements ICommandHandler<RemoveBeaconCommand>
{
  constructor(
    @Inject(BeaconRepositoryWrapper)
    private readonly beaconRepository: BeaconRepositoryWrapper,
  ) {}

  execute(command: RemoveBeaconCommand): Promise<any> {
    const { macAddress } = command;

    return this.beaconRepository.removeBeacon(macAddress);
  }
}
