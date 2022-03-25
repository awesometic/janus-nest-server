export class GetDepartmentInfoByIdQuery {
  constructor(public readonly id: number) {}
}

export class GetDepartmentInfoByNameQuery {
  constructor(public readonly name: string) {}
}

export class GetDepartmentInfoQueryResult {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly users: number[],
    public readonly permissions: number[],
  ) {}
}
