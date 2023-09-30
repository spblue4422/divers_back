import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDiveShopReviewReqDto {
  @ApiProperty({})
  @IsNumber()
  shopId: number;

  @ApiProperty({})
  @IsString()
  text: string;

  @ApiProperty({})
  @IsNumber()
  star: number;

  @ApiProperty({})
  @IsNumber()
  likes: number;
}
