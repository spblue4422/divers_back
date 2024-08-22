import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Recommendation } from '@/entities/index';

@Injectable()
export class RecommendationRepository extends Repository<Recommendation> {
  constructor(private dataSource: DataSource) {
    super(Recommendation, dataSource.createEntityManager());
  }

  async findOneByTarget(
    userId: number,
    target: number,
    targetId: number,
  ): Promise<Recommendation> {
    return this.findOne({ where: { userId, target, targetId } });
  }
}
