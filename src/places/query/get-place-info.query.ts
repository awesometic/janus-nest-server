import { Point } from 'geojson';

export class GetPlaceInfoQuery {
  constructor(public readonly name: string) {}
}

export class GetPlaceInfoQueryResult {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly location: Point,
  ) {}
}
