import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AWSModule } from '@/apis/aws/aws.module';
import { UserController } from '@/apis/user/user.controller';
import { UserRepostiory } from '@/apis/user/user.repository';
import { UserService } from '@/apis/user/user.service';
import { User } from '@/entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AWSModule],
  controllers: [UserController],
  providers: [UserService, UserRepostiory],
  exports: [UserService],
})
export class UserModule {}
