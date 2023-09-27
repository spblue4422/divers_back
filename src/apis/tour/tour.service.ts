import { Injectable } from '@nestjs/common';
import { TourRepository } from './tour.repository';

@Injectable()
export class TourService {
  constructor(private readonly tourRepository: TourRepository) {}
}
