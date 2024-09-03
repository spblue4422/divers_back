import { Injectable } from '@nestjs/common';

import { countryRepository } from '@/apis/country/country.repository';
import { CountryResDto } from '@/apis/country/dtos/countryRes.dto';
import { ListResDto } from '@/common/dtos/listRes.dto';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: countryRepository) {}

  async getCountryList(
    page: number,
    pagingCount: number,
  ): Promise<ListResDto<CountryResDto>> {
    return this.countryRepository.findListWithCount(
      page,
      pagingCount,
      {},
      {
        countryCode: 'DESC',
      },
    );
  }

  async getCountry(countryCode: string): Promise<CountryResDto> {
    return this.countryRepository.findOneByCountryCode(countryCode);
  }
}
