import { User } from 'src/users/entities/user.entity';

export class GetEntranceInfoQuery {
  constructor(public readonly id: number, public readonly accessTime: Date) {}
}

export class GetAllEntranceInfoQuery {
  constructor(public readonly id: number) {}
}

export class GetEntranceInfoQueryResult {
  constructor(
    public readonly id: number,
    public readonly user: User,
    public readonly accessTime: Date,
  ) {}
}

export class GetAllEntranceInfoQueryResult {
  constructor(
    public readonly entranceQueryResults: GetEntranceInfoQueryResult[],
  ) {}
}
