import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { randomUUID } from 'crypto';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const nodeEnv = config.get<string>('NODE_ENV', 'development');
        const logLevel = config.get<string>('LOG_LEVEL', 'info');
        const isProduction = nodeEnv === 'production';

        return {
          pinoHttp: {
            level: logLevel,
            // Assign a unique request ID to every incoming request
            genReqId: (req, res) => {
              const existing = req.headers['x-request-id'];
              if (existing) return existing as string;
              const id = randomUUID();
              res.setHeader('x-request-id', id);
              return id;
            },
            // Pretty-print in non-production environments
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    singleLine: false,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname',
                  },
                },
            // Redact sensitive headers from logs
            redact: ['req.headers.authorization', 'req.headers.cookie'],
          },
        };
      },
    }),
  ],
})
export class LoggerModule {}
