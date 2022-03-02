import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const stackFirstLine = exception.stack.split('\n')[0];

    const log = {
      timestamp: new Date(),
      path: req.url,
      statusCode: status,
      detail: stackFirstLine,
    };

    // Log the error to winston
    this.logger.error(`${exception.constructor.name} occurs: `, log);

    // Send the error to the client
    res.json(log);
  }
}
