import { Injectable } from '@nestjs/common';
import DiveShop from 'src/entities/DiveShop';
import { Repository } from 'typeorm';

@Injectable()
export class DiveShopRepository extends Repository<DiveShop> {}
