import { Injectable } from '@nestjs/common';
import { DiveLog } from 'src/entities/DiveLog';
import { DiveLogDetail } from 'src/entities/DiveLogDetail';
import { Repository } from 'typeorm';

@Injectable()
export class DiveLogRepository extends Repository<DiveLog> {}

@Injectable()
export class DiveLogDetailRepository extends Repository<DiveLogDetail> {}
