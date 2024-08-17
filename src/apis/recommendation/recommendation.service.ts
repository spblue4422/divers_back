import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { RecommendationRepository } from '@/apis/recommendation/recommendation.repository';
import { RecommendationTarget } from '@/common/enums';
import { convertKeyToValue } from '@/common/utils/enumConverter';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
  ) {}

  async recommendTarget(
    keyId: number,
    targetKey:
      | 'DIVESHOP'
      | 'DIVEPOINT'
      | 'DIVESHOP_REVIEW'
      | 'DIVEPOINT_REVIEW', // 나중에 깔끔하게 바꿔보자
    targetId: number,
  ): Promise<boolean> {
    const targetVal = convertKeyToValue(RecommendationTarget, targetKey);

    const recommendation =
      await this.recommendationRepository.findOneWithTarget(
        keyId,
        targetVal,
        targetId,
      );

    if (!recommendation) {
      await this.recommendationRepository.insert({
        userId: keyId,
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
