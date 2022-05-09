import { ReactionRepository } from './reaction.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReactionService {
  constructor(private readonly repository: ReactionRepository) {}
}
