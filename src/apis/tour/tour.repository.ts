import { Injectable } from '@nestjs/common';
import { Tour } from 'src/entities/Tour';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TourRepository extends Repository<Tour> {
  constructor(private dataSource: DataSource) {
    super(Tour, dataSource.createEntityManager());
  }
}
