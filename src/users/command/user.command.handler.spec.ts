import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { UserStatus } from '../constants';
import { UserRepositoryWrapper } from '../repository/user.repository';
import {
  CreateUserCommand,
  CreateUserCommandResult,
  RemoveUserCommand,
  RemoveUserCommandResult,
  UpdateUserCommand,
  UpdateUserCommandResult,
  VerifyEmailCommand,
  VerifyEmailCommandResult,
} from './user.command';
import {
  CreateUserHandler,
  UpdateUserHandler,
  RemoveUserHandler,
  VerifyEmailHandler,
} from './user.command.handler';

class MockUser {
  constructor({
    id,
    email,
    name,
    password,
    verifyToken,
    status,
  }: {
    id: number;
    email: string;
    name: string;
    password: string;
    verifyToken: string;
    status: number;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.verifyToken = verifyToken;
    this.status = status;
  }

  id: number;
  email: string;
  name: string;
  password: string;
  verifyToken: string;
  status: number;
}

describe('UserCommandHandler', () => {
  let createUserHandler: CreateUserHandler;
  let updateUserHandler: UpdateUserHandler;
  let removeUserHandler: RemoveUserHandler;
  let verifyEmailHandler: VerifyEmailHandler;

  let mockUser: MockUser;
  const userId = 1;
  const email = 'test@test.com';
  const name = 'name';
  const password = 'password';
  const newPassword = 'newPassword';
  const verifyToken = 'verifyToken';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        UpdateUserHandler,
        RemoveUserHandler,
        VerifyEmailHandler,
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
        {
          provide: UserRepositoryWrapper,
          useValue: {
            createUser: jest
              .fn()
              .mockImplementation((email, name, password) => {
                mockUser = new MockUser({
                  id: userId,
                  email: email,
                  name: name,
                  password: password,
                  verifyToken: verifyToken,
                  status: UserStatus.Inactive,
                });

                return {
                  id: mockUser.id,
                  email: mockUser.email,
                };
              }),
            updateUser: jest.fn().mockImplementation((_, __, password) => {
              mockUser.password = password;

              return {
                id: mockUser.id,
                email: mockUser.email,
              };
            }),
            removeUser: jest.fn().mockImplementation(() => {
              mockUser = undefined;

              return {
                id: userId,
                email: email,
              };
            }),
            checkUserExists: jest
              .fn()
              .mockImplementation((email) =>
                mockUser ? email != mockUser.email : true,
              ),
            checkUserVerified: jest
              .fn()
              .mockImplementation(
                (verifyToken) =>
                  verifyToken == mockUser.verifyToken &&
                  mockUser.status == UserStatus.Active,
              ),
            verifyUserEmail: jest.fn().mockImplementation((verifyToken) => {
              if (verifyToken == mockUser.verifyToken) {
                mockUser.status = UserStatus.Active;
              }

              return {
                id: mockUser.id,
                email: mockUser.email,
                verifyToken: mockUser.verifyToken,
              };
            }),
          },
        },
      ],
    }).compile();

    createUserHandler = module.get<CreateUserHandler>(CreateUserHandler);
    updateUserHandler = module.get<UpdateUserHandler>(UpdateUserHandler);
    removeUserHandler = module.get<RemoveUserHandler>(RemoveUserHandler);
    verifyEmailHandler = module.get<VerifyEmailHandler>(VerifyEmailHandler);
  });

  describe('createUser', () => {
    it('should create user', async () => {
      const commandResults: CreateUserCommandResult = {
        userId: userId,
        email: email,
      };
      const executeResults = await createUserHandler.execute(
        new CreateUserCommand(email, name, password),
      );

      expect(executeResults).toEqual(commandResults);
    });
  });

  describe('updateUser', () => {
    it("should update user's password", async () => {
      const commandResults: UpdateUserCommandResult = {
        userId: userId,
        email: email,
      };
      const executeResults = await updateUserHandler.execute(
        new UpdateUserCommand(email, name, newPassword),
      );

      expect(executeResults).toEqual(commandResults);
      expect(mockUser.password).toEqual(newPassword);
    });
  });

  describe('verifyEmail', () => {
    it("should verify user's email", async () => {
      const commandResults: VerifyEmailCommandResult = {
        userId: userId,
        email: email,
        verifyToken: verifyToken,
      };
      const executeResults = await verifyEmailHandler.execute(
        new VerifyEmailCommand(verifyToken),
      );

      expect(executeResults).toEqual(commandResults);
      expect(mockUser.status).toEqual(UserStatus.Active);
    });
  });

  // TODO: Currently, this test should be the last one to keep the mockUser alive
  describe('removeUser', () => {
    it('should remove user', async () => {
      const commandResults: RemoveUserCommandResult = {
        userId: userId,
        email: email,
      };
      const executeResults = await removeUserHandler.execute(
        new RemoveUserCommand(email, newPassword),
      );

      expect(executeResults).toEqual(commandResults);
      expect(mockUser).toBeUndefined();
    });
  });
});
