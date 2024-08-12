import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { DivePointReview } from '@/entities/index';

@Injectable()
export class DivePointReviewRepository extends Repository<DivePointReview> {
  constructor(private dataSource: DataSource) {
    super(DivePointReview, dataSource.createEntityManager());
  }
}
