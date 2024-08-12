import { Injectable } from '@nestjs/common';

import { RecommendationRepository } from '@/apis/recommendation/recommendation.repository';
import { RecommendationTarget } from '@/common/enums';
import { convertKeyToValue } from '@/common/utils/enumConverter';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
  ) {}

  async recommendTarget(userId: number, targetKey: string, targetId: number) {
    const targetVal = await convertKeyToValue(RecommendationTarget, targetKey);

    const recommendation =
      await this.recommendationRepository.findOneWithTarget(
        userId,
        targetVal,
        targetId,
      );

    if (!recommendation) {
      await this.recommendationRepository.insert({
        userId,
        target: targetVal,
        targetId,
      });
      return true;
    } else {
      await this.recommendationRepository.delete({ id: recommendation.id });
      return false;
    }
  }
}
