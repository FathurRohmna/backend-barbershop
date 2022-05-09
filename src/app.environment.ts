/* eslint-disable prettier/prettier */
import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum NodeEnvironment {
  Develoment = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(NodeEnvironment)
  NODE_ENV: NodeEnvironment;

  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_EXPIRATION_TIME: number;

  @IsString()
  MAIL_USER: string;

  @IsString()
  MAIL_PASSWORD: string;

  @IsString()
  MAIL_FROM: string;

  @IsString()
  MAIL_CLIENT_ID: string;

  @IsString()
  MAIL_CLIENT_SECRET: string;

  @IsString()
  MAIL_REFRESH_TOKEN: string;

  @IsString()
  MAIL_ACCESS_TOKEN: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
