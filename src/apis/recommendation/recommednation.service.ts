import { Injectable } from '@nestjs/common';
import { RecommendationRepository } from './recommendation.repository';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
  ) {}

  async recommendShop(userId: number, shopId: number) {
    const recommendation =
      await this.recommendationRepository.findOneWithTarget(
        userId,
        'DIVESHOP',
        shopId,
      );

    if (!recommendation) return this.recommendationRepository.insert();
    else return this.recommendationRepository.delete();
  }

  async recommendPoint(userId: number, pointId: number) {
    const recommendation =
      await this.recommendationRepository.findOneWithTarget(
        userId,
        'DIVEPOINT',
        pointId,
      );

    if (!recommendation) return this.recommendationRepository.insert();
    else return this.recommendationRepository.delete();
  }

  async recommendShopReview(userId: number, reviewId: number) {
    const recommendation =
      await this.recommendationRepository.findOneWithTarget(
        userId,
        'DIVESHOPREVIEW',
        reviewId,
      );

    if (!recommendation) return this.recommendationRepository.insert();
    else return this.recommendationRepository.delete();
  }

  async recommendPointReview(userId: number, reviewId: number) {
    const recommendation =
      await this.recommendationRepository.findOneWithTarget(
        userId,
        'DIVEPOINTREVIEW',
        reviewId,
      );

    if (!recommendation) return this.recommendationRepository.insert();
    else return this.recommendationRepository.delete();
  }
}
