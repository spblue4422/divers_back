import { ApiProperty } from '@nestjs/swagger';
import { PaginationFormDto } from 'src/common/dtos/paginationForm.dto';

export class SearchLogReqDto {
  @ApiProperty({ description: '페이지네이션 형식' })
  pagination: PaginationFormDto;
}
