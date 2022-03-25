export class GetUserInfoByEmailQuery {
  constructor(public readonly email: string) {}
}

export class GetUserInfoByIdQuery {
  constructor(public readonly id: number) {}
}

export class GetUserInfoQueryResult {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly department: number,
    public readonly permission: number,
    public readonly places: number[],
  ) {}
}
