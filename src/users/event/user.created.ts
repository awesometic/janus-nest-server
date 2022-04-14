export class UserCreated {
  constructor(
    public readonly email: string,
    public readonly verifyToken: string,
  ) {}
}
