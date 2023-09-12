import { Injectable } from '@nestjs/common';
import { DiveLog } from 'src/entities/DiveLog';
import { Repository } from 'typeorm';

@Injectable()
export class DiveLogRepository extends Repository<DiveLog> {}
