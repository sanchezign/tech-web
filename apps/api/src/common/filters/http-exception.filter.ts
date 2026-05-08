import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

interface ErrorResponseBody {
  statusCode: number;
  message: string | string[];
  error: string;
  path: string;
  timestamp: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<{ url: string }>();

    const isHttpException = exception instanceof HttpException;

    const statusCode = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = isHttpException
      ? exception.getResponse()
      : undefined;

    let message: string | string[] = 'Internal server error';
    let error = 'Internal Server Error';

    if (isHttpException) {
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
        error = exception.message;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const resp = exceptionResponse as Record<string, unknown>;
        message = (resp['message'] as string | string[]) ?? exception.message;
        error = (resp['error'] as string) ?? exception.message;
      }
    }

    const responseBody: ErrorResponseBody = {
      statusCode,
      message,
      error,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    if (statusCode >= 500) {
      this.logger.error(
        `Unhandled exception at ${request.url}: ${String(exception)}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else {
      this.logger.warn(
        `HTTP ${statusCode} at ${request.url}: ${JSON.stringify(message)}`,
      );
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
