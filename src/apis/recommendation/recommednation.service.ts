import { Injectable } from '@nestjs/common';
import { RecommendationRepository } from './recommendation.repository';
import { convertKeyToValue } from 'src/common/utils/enumConverter';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';

@Injectable()
export class RecommendationService {
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
  ) {}

  async recommendTarget(userId: number, targetKey: string, targetId: number) {
    const targetVal = await convertKeyToValue('RT', targetKey);

    const recommendation =
      await this.recommendationRepository.findOneWithTarget(
        userId,
        targetVal,
        targetId,
      );

    if (!recommendation)
      await this.recommendationRepository.insert({
        userId,
        target: targetVal,
        targetId,
      });
    else await this.recommendationRepository.delete({ id: recommendation.id });

    return MsgResDto.success();
  }
}
