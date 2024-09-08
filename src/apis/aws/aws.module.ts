import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AWSService } from '@/apis/aws/aws.service';

@Module({
  imports: [ConfigService],
  providers: [AWSService],
  exports: [AWSService],
})
export class AWSModule {}
