import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { AuthRoleGuard } from '@/apis/auth/guards/authAndRole.guard';
import { CountryService } from '@/apis/country/country.service';
import { CountryResDto } from '@/apis/country/dtos/countryRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';
import { PaginationReqDto } from '@/common/dtos/paginationReq.dto';

@UseGuards(AuthRoleGuard)
@ApiBearerAuth('accessToken')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/list')
  @ApiOperation({ description: '국가 목록 조회' })
  @ApiOkResponse({
    type: ListResDto<CountryResDto>,
    description: '국가 목록',
  })
  async getCountryList(
    @Query() paginationForm: PaginationReqDto,
  ): Promise<ListResDto<CountryResDto>> {
    const { page, pagingCount } = paginationForm;

    return this.countryService.getCountryList(page, pagingCount);
  }

  @Get('')
  @ApiOperation({ description: '국가 정보 조회' })
  @ApiOkResponse({
    type: CountryResDto,
    description: '국가 정보',
  })
  async getCountry(@Query('code') countryCode: string): Promise<CountryResDto> {
    return this.countryService.getCountry(countryCode);
  }
}
