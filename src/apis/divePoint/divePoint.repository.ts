import { Injectable } from '@nestjs/common';
import DivePoint from 'src/entities/DivePoint';
import { Repository } from 'typeorm';

@Injectable()
export class DivePointRepostiory extends Repository<DivePoint> {}
