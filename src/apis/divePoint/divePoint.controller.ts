import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@/apis/auth/guards/auth.guard';
import { DivePointService } from '@/apis/divePoint/divePoint.service';
import { DivePointInListResDto } from '@/apis/divePoint/dtos/divePointInListRes.dto';
import { Current } from '@/common/decorators/current';
import { JwtAccessPayloadDto } from '@/common/dtos/jwtPayload.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { MsgResDto } from '@/common/dtos/msgRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';

@UseGuards(AuthGuard)
@Controller('point')
export class DivePointController {
  constructor(private readonly divePointService: DivePointService) {}

  @Get('/list')
  async getDivePointList(
    @Query() paginationForm: PaginationReqDto,
  ): Promise<ListResDto<DivePointInListResDto>> {
    return this.divePointService.getDivePointList(paginationForm);
  }

  @Get('/:pointId')
  async getDivePointById(@Param('pointId') pointId: number) {
    return this.divePointService.getDivePoint(pointId);
  }

  // roleguard - 유저만?
  @Patch('/:pointId/recommend')
  async recommendPoint(
    @Param('pointId') pointId: number,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { userId } = cur;

    return this.divePointService.recommendDivePoint(pointId, userId);
  }
}
