import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Recommendation } from 'src/entities';

@Injectable()
export class RecommendationRepository extends Repository<Recommendation> {
  constructor(private dataSource: DataSource) {
    super(Recommendation, dataSource.createEntityManager());
  }

  async findOneWithTarget(userId: number, target: number, targetId: number) {
    return this.findOne({ where: { userId, target, targetId } });
  }
}
