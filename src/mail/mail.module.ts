import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: configService.get('MAIL_USER'),
              clientId: configService.get('MAIL_CLIENT_ID'),
              clientSecret: configService.get('MAIL_CLIENT_SECRET'),
              refreshToken: configService.get('MAIL_REFRESH_TOKEN'),
              accessToken: configService.get('MAIL_ACCESS_TOKEN'),
            },
          },
          defaults: {
            from: '"No Reply"<>',
          },
          template: {
            dir: process.cwd() + '/templates/',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
