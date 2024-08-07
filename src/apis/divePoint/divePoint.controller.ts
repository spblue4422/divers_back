import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { DivePointService } from './divePoint.service';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { Current } from 'src/common/decorators/current';
import { JwtAccessPayloadDto } from 'src/common/dtos/jwtPayload.dto';

@Controller('point')
export class DivePointController {
  constructor(private readonly divePointService: DivePointService) {}

  @Get('/list')
  async getDivePointList(@Query() paginationForm: PaginationReqDto) {
    const { page, pagingCount } = paginationForm;

    return this.divePointService.getDivePointList(page, pagingCount);
  }

  @Get('/:pointId')
  async getDivePointById(@Param() pointId: number) {
    return this.divePointService.getDivePoint(pointId);
  }

  // roleguard - 유저만?
  @Patch('/recommend/:pointId')
  async recommendPoint(
    @Param() pointId: number,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { userShopId } = cur;

    return this.divePointService.recommendDivePoint(pointId, userShopId);
  }
}
