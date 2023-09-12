import { Injectable } from '@nestjs/common';
import DivePointReview from 'src/entities/DivePointReview';
import { Repository } from 'typeorm';

@Injectable()
export class DivePointReviewRepository extends Repository<DivePointReview> {}
