import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import {
  AuthorizationCommand,
  AuthorizationCommandResult,
} from 'src/auth/command/authorization.command';
import * as winston from 'winston';
import {
  CreateUserCommand,
  CreateUserCommandResult,
  RemoveUserCommand,
  RemoveUserCommandResult,
  UpdateUserCommand,
  UpdateUserCommandResult,
  VerifyEmailCommand,
} from './command/user.command';
import {
  GetUserInfoByEmailQuery,
  GetUserInfoByIdQuery,
  GetUserInfoQueryResult,
} from './query/get-user-info.query';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  const userId = 1;
  const email = 'test@test.com';
  const name = 'name';
  const password = 'password';
  const newPassword = 'newPassword';
  const verifyToken = 'verifyToken';
  const accessToken = 'accessToken';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        WinstonModule.forRoot({
          transports: [
            new winston.transports.Console({
              level: 'debug',
              format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
              ),
            }),
          ],
        }),
      ],
      controllers: [UsersController],
      providers: [
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    commandBus = module.get(CommandBus);
    queryBus = module.get(QueryBus);
  });

  describe('create-update-remove', () => {
    it('should call command bus', async () => {
      const commandResult: CreateUserCommandResult = {
        userId: userId,
        email: email,
      };
      commandBus.execute = jest.fn().mockReturnValueOnce(commandResult);

      const result = await controller.createUser({ email, name, password });

      expect(commandBus.execute).toBeCalledWith(
        new CreateUserCommand(email, name, password),
      );
      expect(result).toEqual(commandResult);
    });

    it('should call command bus', async () => {
      const commandResult: UpdateUserCommandResult = {
        userId: userId,
        email: email,
      };
      commandBus.execute = jest.fn().mockReturnValueOnce(commandResult);

      const result = await controller.updateUser({
        email,
        name,
        password: newPassword,
      });

      expect(commandBus.execute).toBeCalledWith(
        new UpdateUserCommand(email, name, newPassword),
      );
      expect(result).toEqual(commandResult);
    });

    it('should call command bus', async () => {
      const commandResult: RemoveUserCommandResult = {
        userId: userId,
        email: email,
      };
      commandBus.execute = jest.fn().mockReturnValueOnce(commandResult);

      const result = await controller.removeUser({
        email,
        password: newPassword,
      });

      expect(commandBus.execute).toBeCalledWith(
        new RemoveUserCommand(email, newPassword),
      );
      expect(result).toEqual(commandResult);
    });
  });

  describe('verifyEmail', () => {
    it('should call command bus', async () => {
      const commandResult = verifyToken;
      commandBus.execute = jest.fn().mockReturnValueOnce(commandResult);

      const result = await controller.verifyEmail(verifyToken);

      expect(commandBus.execute).toBeCalledWith(
        new VerifyEmailCommand(verifyToken),
      );
      expect(result).toEqual(commandResult);
    });
  });

  describe('getProfile', () => {
    it('should return the given argument itself', async () => {
      const getProfileDto = {
        email: email,
      };
      const commandResult = getProfileDto;
      commandBus.execute = jest.fn().mockReturnValueOnce(commandResult);

      const result = await controller.getProfile(getProfileDto);

      expect(result).toEqual(commandResult);
    });
  });

  describe('signIn', () => {
    it('should call command bus', async () => {
      const commandResult: AuthorizationCommandResult = {
        accessToken: accessToken,
      };
      commandBus.execute = jest.fn().mockReturnValueOnce(commandResult);

      const result = await controller.signIn({ email, password });

      expect(commandBus.execute).toBeCalledWith(
        new AuthorizationCommand(email, password),
      );
      expect(result).toEqual(commandResult);
    });
  });

  describe('getUserInfo', () => {
    it('should call query bus using email', async () => {
      const queryResult: GetUserInfoQueryResult = {
        id: userId,
        name: name,
        email: email,
        password: password,
        department: -1,
        permission: -1,
        places: [],
      };
      queryBus.execute = jest.fn().mockReturnValueOnce(queryResult);

      const result = await controller.getUserInfo({
        user: {
          email: email,
        },
      });

      expect(queryBus.execute).toBeCalledWith(
        new GetUserInfoByEmailQuery(email),
      );
      expect(result).toEqual(queryResult);
    });

    it('should call query bus using id', async () => {
      const queryResult: GetUserInfoQueryResult = {
        id: userId,
        name: name,
        email: email,
        password: password,
        department: -1,
        permission: -1,
        places: [],
      };
      queryBus.execute = jest.fn().mockReturnValueOnce(queryResult);

      const result = await controller.getUserInfo({
        user: {
          id: userId,
        },
      });

      expect(queryBus.execute).toBeCalledWith(new GetUserInfoByIdQuery(userId));
      expect(result).toEqual(queryResult);
    });
  });
});
