import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  exports: [UserController],
  providers: [UserService],
})
export class UserModule {}
