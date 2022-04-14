import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EmailSenderService } from 'src/email/email-sender.service';
import { UserCreated } from './user.created';

@EventsHandler(UserCreated)
export class UserCreatedEventHandler implements IEventHandler<UserCreated> {
  constructor(
    @Inject(EmailSenderService)
    private readonly emailSenderService: EmailSenderService,
  ) {}

  async handle(event: UserCreated) {
    const { email, verifyToken } = event;

    await this.emailSenderService.sendVerification(email, verifyToken);
  }
}
