import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DiveLogService } from './diveLog.service';
import { PaginationReqDto } from 'src/common/dtos/paginationReq.dto';
import { ListResDto } from 'src/common/dtos/listRes.dto';
import { DiveLogResDto } from './dtos/diveLogRes.dto';
import { DiveLogInListResDto } from './dtos/diveLogInListRes.dto';
import { CreateDiveLogReqDto } from './dtos/createDiveLogReq.dto';
import { MsgResDto } from 'src/common/dtos/msgRes.dto';
import { DiveLogDetailResDto } from './dtos/diveLogDetailRes.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { Current } from 'src/common/decorators/current';
import { JwtAccessPayloadDto } from 'src/common/dtos/jwtPayload.dto';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from 'src/common/decorators/roles';
import { Role } from 'src/common/enums';

@UseGuards(AuthGuard)
@UseGuards(RoleGuard)
@Controller('diveLog')
export class DiveLogController {
  constructor(private readonly diveLogService: DiveLogService) {}

  // 롤가드 - 일단 유저만
  @Get('/my/list')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: ListResDto<DiveLogInListResDto>,
    description: '내 다이브 로그 목록 조회',
  })
  async getMyDiveLogList(
    @Query() pagination: PaginationReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    const { userShopId } = cur;
    return this.diveLogService.getMyDiveLogList(userShopId, pagination);
  }

  @Get('/user/:userId/list')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: ListResDto<DiveLogInListResDto>,
    description: '유저 다이브 로그 목록 조회',
  })
  async getUserDiveLogList(
    @Param('userId') userId: number,
    @Query() pagination: PaginationReqDto,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    return this.diveLogService.getUserDiveLogList(userId, pagination);
  }

  // 롤 일단 유저만
  @Get('/:logId')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: DiveLogResDto,
    description: '다이브 로그 조회',
  })
  async getDiveLogById(
    @Param() logId: number,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<DiveLogResDto> {
    const { userShopId } = cur;

    return this.diveLogService.getDiveLog(logId, userShopId);
  }

  @Get('/:logId/detail')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: DiveLogDetailResDto,
    description: '상세 다이브 로그 조회',
  })
  async getDiveLogDetialById(
    @Param() logid: number,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { userShopId } = cur;
  }

  // 롤가드 - 유저만 ?
  @Post('/create')
  @Roles([Role.USER])
  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 생성' })
  async createDiveLog(
    @Body() createDiveLogBody: CreateDiveLogReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { userShopId } = cur;

    return this.diveLogService.createDiveLog(userShopId, createDiveLogBody);
  }

  // 롤가드 - 유저만 ?
  @Patch('/:logId/modify')
  @Roles([Role.USER])
  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 수정' })
  async modfiyDiveLog(
    @Param() logId: number,
    @Body() modifyDiveLogBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { userShopId } = cur;

    return this.diveLogService.modifyDiveLog(
      logId,
      userShopId,
      modifyDiveLogBody,
    );
  }

  // 롤가드 - 유저만 ?
  @Delete('/:logId/remove')
  @Roles([Role.USER])
  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 삭제' })
  async removeDiveLog(
    @Param() logId: number,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { userShopId } = cur;

    return this.diveLogService.removeDiveLog(logId, userShopId);
  }

  @Patch('/:logId/changePublic')
  @Roles([Role.USER])
  async changeIsPublic() {}
}
