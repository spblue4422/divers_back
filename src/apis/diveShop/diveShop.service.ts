import { Injectable } from '@nestjs/common';

@Injectable()
export class DiveShopService {
  constructor(private readonly diveShopService: DiveShopService) {}
}
