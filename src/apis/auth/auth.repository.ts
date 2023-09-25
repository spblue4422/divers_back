import { Injectable } from '@nestjs/common';
import AuthDiveShop from 'src/entities/AuthDiveShop';
import AuthUser from 'src/entities/AuthUser';
import { Repository } from 'typeorm';

@Injectable()
export class AuthUserRepository extends Repository<AuthUser> {}

@Injectable()
export class AuthShopRepository extends Repository<AuthDiveShop> {}
