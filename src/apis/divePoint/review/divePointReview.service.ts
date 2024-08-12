import { Injectable } from '@nestjs/common';

import { DivePointReviewRepository } from '@/apis/divePoint/review/divePointReview.repository';

@Injectable()
export class DivePointReviewService {
  constructor(
    private readonly divePointReviewRepository: DivePointReviewRepository,
  ) {}
}
