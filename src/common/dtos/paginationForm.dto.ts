import { ApiProperty } from '@nestjs/swagger';

export class PaginationFormDto {
  @ApiProperty({ description: '페이지 번호' })
  page: number;

  @ApiProperty({ description: '데이터 개수' })
  count: number;
}
