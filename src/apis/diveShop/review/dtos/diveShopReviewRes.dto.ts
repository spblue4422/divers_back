import { ApiProperty } from '@nestjs/swagger';

import { DiveShopReview } from '@/entities/index';

export class DiveShopReviewResDto {
  @ApiProperty({ description: 'dive_shop_review_id', default: 1 })
  id: number;

  @ApiProperty({ description: 'user_handle', default: '123456789' })
  userHandle: string;

  @ApiProperty({ description: '닉네임', default: '닉네임' })
  nickname: string;

  @ApiProperty({ description: 'dive_shop_id' })
  shopId: number;

  @ApiProperty({ description: '다이빙 샵 이름', default: '샵어쩌구' })
  shopName: string;

  @ApiProperty({ description: '리뷰 내용', default: '여긴 어떤 곳일까' })
  text: string;

  @ApiProperty({ description: '별점', default: 4.5 })
  star: number;

  @ApiProperty({ description: '추천 수', default: 1 })
  recommendation: number;

  @ApiProperty({ description: '블락 여부', default: false })
  isBlocked: boolean;

  @ApiProperty({ description: '생성 일자', default: new Date() })
  createdAt: Date;

  static makeRes(data: DiveShopReview) {
    const resDto = new DiveShopReviewResDto();

    resDto.id = data.id;
    resDto.userHandle = data.user.authHandle;
    resDto.nickname = data.user.nickname;
    resDto.shopId = data.shopId;
    resDto.shopName = data.diveShop.name;
    resDto.text = data.text;
    resDto.star = data.star;
    resDto.recommendation = data.recommendation;
    resDto.isBlocked = data.isBlocked;
    resDto.createdAt = new Date(data.createdAt.toString());

    return resDto;
  }
}
