import { ApiProperty } from '@nestjs/swagger';
import { SignInReqDto } from './signInReq.dto';
import { CreateDiveShopReqDto } from 'src/apis/diveShop/dtos/createDiveShopReqDto';

export class ShopSignUpReqDto extends SignInReqDto {
  @ApiProperty({ description: '다이브샵 생성에 필요한 정보' })
  createShopBody: CreateDiveShopReqDto;
}
