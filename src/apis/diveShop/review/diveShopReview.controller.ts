import { Controller } from '@nestjs/common';
import { DiveShopReviewService } from './diveShopReview.service';

@Controller('')
export class DiveShopReviewController {
  constructor(private readonly diveShopReviewServcie: DiveShopReviewService) {}
}
