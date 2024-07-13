import { Injectable } from '@nestjs/common';
import { DivePointReview } from 'src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DivePointReviewRepository extends Repository<DivePointReview> {
  constructor(private dataSource: DataSource) {
    super(DivePointReview, dataSource.createEntityManager());
  }
}
