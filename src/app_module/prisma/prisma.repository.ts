/* eslint-disable prettier/prettier */
import {
  Inject,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  Injectable,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaModuleOptions, PRISMA_OPTIONS } from './prisma.providers';
import { createPrismaQueryEventHandler } from 'prisma-query-log';

@Injectable()
export class PrismaRepository
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger();

  constructor(@Inject(PRISMA_OPTIONS) options: PrismaModuleOptions) {
    super({
      errorFormat: 'minimal',
      log: options.logQueries
        ? [
            {
              level: 'query',
              emit: 'event',
            },
          ]
        : undefined,
    });

    if (options.logQueries) {
      this.$on(
        'query' as any,
        createPrismaQueryEventHandler({
          logger: (query) => {
            this.logger.verbose(query, 'PrismaClient');
          },
          format: false,
          colorQuery: '\u001B[96m',
          colorParameter: '\u001B[90m',
        }),
      );
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
