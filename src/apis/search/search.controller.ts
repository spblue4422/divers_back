import { Controller } from '@nestjs/common';

import { SearchService } from '@/apis/search/search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  async searchUser() {}

  async searchShop() {}

  async searchPoint() {}

  async searchLog() {}
}
