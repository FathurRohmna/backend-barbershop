/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from '@nestjs/common';
import { createRepositoryProviders } from './inject-repository.decorator';
import {
  createAsyncProviders,
  defaultPrismaOptions,
  PrismaModuleAsyncOptions,
  PrismaModuleOptions,
  PRISMA_OPTIONS,
} from './prisma.providers';
import { PrismaRepository } from './prisma.repository';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule
  ]
})
export class PrismaModule {
  static register(options: PrismaModuleOptions): DynamicModule {
    const repositoryProviders = createRepositoryProviders();
    options = { ...defaultPrismaOptions, ...options };

    return {
      global: true,
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA_OPTIONS,
          useValue: options,
        },
        PrismaRepository,
        ...repositoryProviders,
      ],
      exports: [...repositoryProviders, PrismaRepository],
    };
  }

  static registerAsync(options: PrismaModuleAsyncOptions): DynamicModule {
    const repositoryProviders = createRepositoryProviders();

    return {
      global: true,
      module: PrismaModule,
      imports: options.imports || [],
      providers: [
        ...createAsyncProviders(options),
        ...repositoryProviders,
        PrismaRepository,
      ],
      exports: [...repositoryProviders, PrismaRepository],
    };
  }
}
