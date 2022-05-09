import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { ReactionRepository } from './reaction.repository';

@Module({
  providers: [ReactionService, ReactionRepository],
  controllers: [ReactionController],
})
export class ReactionModule {}
