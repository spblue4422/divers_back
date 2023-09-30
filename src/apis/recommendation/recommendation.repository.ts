import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Recommendation } from 'src/entities/Recommendation';

@Injectable()
export class RecommendationRepository extends Repository<Recommendation> {
  async findOneWithTarget(userId: number, target: string, targetId: number) {
    return this.findOne({ where: { userId, target, targetId } });
  }
}
