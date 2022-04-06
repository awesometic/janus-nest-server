import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserInfoByEmailQuery } from 'src/users/query/get-user-info.query';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryBus: QueryBus) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const getUserInfoQuery = new GetUserInfoByEmailQuery(email);
    const userInfo = await this.queryBus.execute(getUserInfoQuery);

    if (!userInfo) {
      throw new UnprocessableEntityException('User not found');
    }

    if (userInfo.password !== password) {
      throw new UnauthorizedException('Wrong password');
    }

    return {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
    };
  }
}
