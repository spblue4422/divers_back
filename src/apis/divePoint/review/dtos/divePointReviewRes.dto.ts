import { ApiProperty } from '@nestjs/swagger';

import { DivePointReview } from '@/entities';

export class DivePointReviewResDto {
  @ApiProperty({ description: 'dive_point_review_id' })
  id: number;

  @ApiProperty({ description: 'user_handle' })
  userHandle: string;

  @ApiProperty({ description: '닉네임' })
  nickname: string;

  @ApiProperty({ description: 'point_id' })
  pointId: number;

  @ApiProperty({ description: '포인트 이름' })
  pointName: string;

  @ApiProperty({ description: '리뷰 내용' })
  text: string;

  @ApiProperty({ description: '별점' })
  star: number;

  @ApiProperty({ description: '추천' })
  recommendation: number;

  @ApiProperty({ description: '블락 여부' })
  isBlocked: boolean;

  @ApiProperty({ description: '생성일자' })
  createdAt: Date;

  static makeRes(data: DivePointReview) {
    const resDto = new DivePointReviewResDto();

    resDto.id = data.id;
    resDto.userHandle = data.user.authHandle;
    resDto.nickname = data.user.nickname;
    resDto.pointId = data.pointId;
    resDto.pointName = data.divePoint.name;
    resDto.text = data.text;
    resDto.star = data.star;
    resDto.recommendation = data.recommendation;
    resDto.isBlocked = data.isBlocked;
    resDto.createdAt = new Date(data.createdAt.toString());

    return resDto;
  }
}
