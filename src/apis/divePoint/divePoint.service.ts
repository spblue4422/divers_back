import { Injectable } from '@nestjs/common';
import { DivePointRepostiory } from './divePoint.repository';

@Injectable()
export class DivePointService {
  constructor(private readonly divePointRepository: DivePointRepostiory) {}
}
