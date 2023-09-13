import { Controller } from '@nestjs/common';
import { DivePointReviewService } from './divePointReview.service';

@Controller()
export class DivePointReviewController {
  constructor(
    private readonly divePointReviewService: DivePointReviewService,
  ) {}
}
