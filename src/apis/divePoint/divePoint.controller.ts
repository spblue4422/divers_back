import { Controller } from '@nestjs/common';
import { DivePointService } from './divePoint.service';

@Controller('point')
export class DivePointController {
  constructor(private readonly divePointService: DivePointService) {}
}
