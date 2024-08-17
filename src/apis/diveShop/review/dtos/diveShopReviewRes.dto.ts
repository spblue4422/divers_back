import { ApiProperty } from '@nestjs/swagger';

import { DiveShopReview } from '@/entities/index';

export class DiveShopReviewResDto {
  @ApiProperty({})
  id: number;

  @ApiProperty({})
  userHandle: string;

  @ApiProperty({})
  nickname: string;

  @ApiProperty({})
  shopId: number;

  @ApiProperty({})
  shopName: string;

  @ApiProperty({})
  text: string;

  @ApiProperty({})
  star: number;

  @ApiProperty({})
  recommendation: number;

  @ApiProperty({})
  isBlocked: boolean;

  @ApiProperty({})
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
