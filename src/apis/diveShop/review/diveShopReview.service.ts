import { Injectable } from '@nestjs/common';
import { DiveShopReviewRepository } from './diveShopReview.repository';

@Injectable()
export class DiveShopReviewService {
  constructor(
    private readonly diveShopReviewRepository: DiveShopReviewRepository,
  ) {}
}
