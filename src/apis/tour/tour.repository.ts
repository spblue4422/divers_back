import { Injectable } from '@nestjs/common';
import { Tour } from 'src/entities/Tour';
import { Repository } from 'typeorm';

@Injectable()
export class TourRepository extends Repository<Tour> {}
