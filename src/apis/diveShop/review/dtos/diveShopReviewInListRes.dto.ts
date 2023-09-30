import { ApiProperty } from '@nestjs/swagger';
import DiveShopReview from 'src/entities/DiveShopReview';

export class DiveShopReviewInListResDto {
  @ApiProperty({})
  id: number;

  @ApiProperty({})
  userId: number;

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
  likes: number;

  static makeRes(data: DiveShopReview) {
    const resDto = new DiveShopReviewInListResDto();

    resDto.id = data.id;
    resDto.nickname = data.user.nickname;
    resDto.shopId = data.shopId;
    resDto.shopName = data.diveShop.name;
    resDto.text = data.text;
    resDto.star = data.star;
    resDto.likes = data.likes;

    return resDto;
  }
}
