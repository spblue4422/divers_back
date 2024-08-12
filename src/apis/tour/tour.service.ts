import { Injectable } from '@nestjs/common';

import { TourRepository } from '@/apis/tour/tour.repository';

@Injectable()
export class TourService {
  constructor(private readonly tourRepository: TourRepository) {}

  async getTourList(userId: number) {
    return this.tourRepository.findListWithCount(1, 10, { userId });
  }
}
