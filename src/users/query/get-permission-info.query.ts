export class GetPermissionInfoQuery {
  constructor(
    public readonly name: string,
    public readonly departmentId: number,
  ) {}
}

export class GetPermissionInfoQueryResult {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly level: number,
  ) {}
}
