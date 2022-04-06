import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import {
  AuthorizationCommand,
  AuthorizationCommandResult,
} from './authorization.command';

@Injectable()
@CommandHandler(AuthorizationCommand)
export class AuthorizationCommandHandler
  implements ICommandHandler<AuthorizationCommand>
{
  constructor(private readonly jwtService: JwtService) {}

  public async execute(
    command: AuthorizationCommand,
  ): Promise<AuthorizationCommandResult> {
    const { email, password } = command;
    const payload = { email, password };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
