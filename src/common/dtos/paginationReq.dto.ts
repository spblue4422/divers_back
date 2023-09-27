import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class PaginationReqDto {
  @ApiProperty({ description: '페이지 번호' })
  @IsInt()
  page: number;

  @ApiProperty({ description: '페이지당 데이터 개수' })
  @IsInt()
  pagingCount: number;
}
