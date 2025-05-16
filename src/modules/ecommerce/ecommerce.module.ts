import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcommerceController } from './controller/ecommerce.controller';
import { EcommerceService } from './service/ecommerce.service';
import { Voucher } from './entity/voucher.entity';
import { Transaction } from './entity/transaction.entity';
import { User } from '../user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Voucher, Transaction, User]),
    ],
    controllers: [EcommerceController],
    providers: [EcommerceService],
})
export class EcommerceModule { }