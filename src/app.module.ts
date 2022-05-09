import { PrismaModule } from './app_module/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { validate } from './app.environment';
import { BarberModule } from './barber/barber.module';
import { BookingModule } from './booking/booking.module';
import { ReactionModule } from './reaction/reaction.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          logQueries: true,
        };
      },
    }),
    ConfigModule.forRoot({
      validate: validate,
    }),
    BarberModule,
    BookingModule,
    ReactionModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
