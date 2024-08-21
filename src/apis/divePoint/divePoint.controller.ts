import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { DivePointResDto } from './dtos/divePointRes.dto';
import { AuthRoleGuard } from '@/apis/auth/guards/authAndRole.guard';
import { DivePointService } from '@/apis/divePoint/divePoint.service';
import { DivePointInListResDto } from '@/apis/divePoint/dtos/divePointInListRes.dto';
import { Current } from '@/common/decorators/current';
import { Roles } from '@/common/decorators/roles';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';
import { Role } from '@/common/enums';

@ApiTags('DivePoint')
@ApiBearerAuth('accessToken')
@UseGuards(AuthRoleGuard)
@Controller('point')
export class DivePointController {
  constructor(private readonly divePointService: DivePointService) {}

  @Get('/list')
  @ApiOperation({ description: '다이빙 포인트 목록 조회 API' })
  @ApiOkResponse({
    type: ListResDto<DivePointInListResDto>,
    description: '다이빙 포인트 목록',
  })
  async getDivePointList(
    @Query() paginationForm: PaginationReqDto,
  ): Promise<ListResDto<DivePointInListResDto>> {
    const { page, pagingCount } = paginationForm;

    return this.divePointService.getDivePointList(page, pagingCount);
  }

  @Get('/:pointId')
  @ApiOperation({ description: '다이빙 포인트 상세 조회 API' })
  @ApiOkResponse({ type: DivePointResDto, description: '다이빙 포인트 정보' })
  async getDivePointById(
    @Param('pointId') pointId: number,
  ): Promise<DivePointResDto> {
    return this.divePointService.getDivePoint(pointId);
  }

  @Patch('/:pointId/recommend')
  @Roles([Role.USER])
  @ApiOperation({ description: '다이빙 포인트 추천 API' })
  @ApiOkResponse({ type: MsgResDto, description: '추천/추천 취소 성공' })
  async recommendPoint(
    @Param('pointId') pointId: number,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { keyId: userId } = cur;

    return this.divePointService.recommendDivePoint(pointId, userId);
  }
}
