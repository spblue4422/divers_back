import { Injectable } from '@nestjs/common';
import DiveShopReview from 'src/entities/DiveShopReview';
import { Repository } from 'typeorm';

@Injectable()
export class DiveShopReviewRepository extends Repository<DiveShopReview> {}
