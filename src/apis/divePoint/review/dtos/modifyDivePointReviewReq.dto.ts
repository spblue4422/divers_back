import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ModifyDivePointReviewReqDto {
  @ApiProperty({ description: '내용' })
  @IsString()
  text: string;

  @ApiProperty({ description: '별점' })
  @IsNumber()
  star: number;
}
