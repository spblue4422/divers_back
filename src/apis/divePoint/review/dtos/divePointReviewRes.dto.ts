import { ApiProperty } from '@nestjs/swagger';

import { DivePointReview } from '@/entities';

export class DivePointReviewResDto {
  @ApiProperty({ description: 'dive_point_review_id', default: 1 })
  id: number;

  @ApiProperty({ description: 'user_handle', default: 'abcdefgaadfasdf' })
  userHandle: string;

  @ApiProperty({ description: '닉네임', default: '닉뭐로하지' })
  nickname: string;

  @ApiProperty({ description: 'point_id', default: 1 })
  pointId: number;

  @ApiProperty({ description: '포인트 이름', default: '엄바위' })
  pointName: string;

  @ApiProperty({ description: 'shop_id' })
  shopId: number;

  @ApiProperty({ description: '다이빙 샵 이름', default: '샵 이름' })
  shopName: string;

  @ApiProperty({ description: '리뷰 내용', default: '리뷰 내용' })
  text: string;

  @ApiProperty({ description: '별점', default: 5.0 })
  star: number;

  @ApiProperty({ description: '추천', default: 0 })
  recommendation: number;

  @ApiProperty({ description: '블락 여부', default: false })
  isBlocked: boolean;

  @ApiProperty({ description: '생성일자', default: new Date() })
  createdAt: Date;

  static makeRes(data: DivePointReview) {
    const resDto = new DivePointReviewResDto();

    const { diveShop } = data;

    resDto.id = data.id;
    resDto.userHandle = data.user.authHandle;
    resDto.nickname = data.user.nickname;
    resDto.pointId = data.pointId;
    resDto.pointName = data.divePoint.name;
    resDto.shopId = data.shopId;
    diveShop // shopId가 null일 경우에는 그냥 리뷰에 등록된 shopName으로(이것도 null일수 있음.)
      ? (resDto.shopName = diveShop.name)
      : (resDto.shopName = data.shopName);

    resDto.text = data.text;
    resDto.star = data.star;
    resDto.recommendation = data.recommendation;
    resDto.isBlocked = data.isBlocked;
    resDto.createdAt = new Date(data.createdAt.toString());

    return resDto;
  }
}
