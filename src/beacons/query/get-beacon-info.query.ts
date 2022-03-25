export class GetBeaconInfoQuery {
  constructor(public readonly macAddress: string) {}
}

export class GetAllBeaconInfoQuery {
  constructor(public readonly placeId?: number) {}
}

export class GetBeaconInfoQueryResult {
  constructor(
    public readonly id: number,
    public readonly macAddress: string,
    public readonly placeId: number[],
    public readonly uuid: string,
    public readonly major: string,
    public readonly minor: string,
    public readonly threshold: number,
  ) {}
}

export class GetAllBeaconInfoQueryResult {
  constructor(
    public readonly beaconInfoQueryResults: GetBeaconInfoQueryResult[],
  ) {}
}
