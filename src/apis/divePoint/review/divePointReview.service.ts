import { Injectable } from '@nestjs/common';
import { DivePointReviewRepository } from './divePointReview.repository';

@Injectable()
export class DivePointReviewService {
  constructor(
    private readonly divePointReviewRepository: DivePointReviewRepository,
  ) {}
}
