import { ICommand } from '@nestjs/cqrs';

export class AuthorizationCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export class AuthorizationCommandResult {
  accessToken: string;
}
