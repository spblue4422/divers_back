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
// roleguard를 authguard안에 집어넣어서 한번에 검증하는 로직을 만들어야 할 것 같음.
// @UseGuards(RoleGuard)
@Controller('diveLog')
export class DiveLogController {
  constructor(private readonly diveLogService: DiveLogService) {}

  @Get('/my/list')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: ListResDto<DiveLogInListResDto>,
    description: '내 다이브 로그 목록 조회',
  })
  async getMyDiveLogList(
    @Query() paginationForm: PaginationReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    const { userId } = cur;

    return this.diveLogService.getUserDiveLogList(userId, true, paginationForm);
  }

  @Get('/user/:userId/list')
  @Roles([Role.USER])
  @ApiOkResponse({
    type: ListResDto<DiveLogInListResDto>,
    description: '유저 다이브 로그 목록 조회',
  })
  async getUserDiveLogList(
    @Param('userId') userId: number,
    @Query() paginationForm: PaginationReqDto,
  ): Promise<ListResDto<DiveLogInListResDto>> {
    return this.diveLogService.getUserDiveLogList(
      userId,
      false,
      paginationForm,
    );
  }

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
    const { userId } = cur;

    return this.diveLogService.getDiveLog(logId, userId);
  }

  @Post('/create')
  @Roles([Role.USER])
  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 생성' })
  async createDiveLog(
    @Body() createDiveLogBody: CreateDiveLogReqDto,
    @Current() cur: JwtAccessPayloadDto,
  ): Promise<MsgResDto> {
    const { userId } = cur;

    return this.diveLogService.createDiveLog(userId, createDiveLogBody);
  }

  @Patch('/:logId/modify')
  @Roles([Role.USER])
  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 수정' })
  async modfiyDiveLog(
    @Param() logId: number,
    @Body() modifyDiveLogBody,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { userId } = cur;

    return this.diveLogService.modifyDiveLog(logId, userId, modifyDiveLogBody);
  }

  @Delete('/:logId/remove')
  @Roles([Role.USER])
  @ApiOkResponse({ type: MsgResDto, description: '다이브 로그 삭제' })
  async removeDiveLog(
    @Param() logId: number,
    @Current() cur: JwtAccessPayloadDto,
  ) {
    const { userId } = cur;

    return this.diveLogService.removeDiveLog(logId, userId);
  }

  @Patch('/:logId/changePublic')
  @Roles([Role.USER])
  async changeIsPublic() {}
}
