import { ApiProperty } from '@nestjs/swagger';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';

export class SearchLogReqDto {
  @ApiProperty({ description: '페이지네이션 형식' })
  pagination: PaginationReqDto;
}
