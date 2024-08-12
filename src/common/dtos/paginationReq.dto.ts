import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class PaginationReqDto {
  @ApiProperty({ description: '페이지 번호' })
  @IsNumber()
  page: number;

  @ApiProperty({ description: '페이지당 데이터 개수' })
  @IsNumber()
  pagingCount: number;
}
