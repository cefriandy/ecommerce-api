import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voucher } from '../entity/voucher.entity';
import { Transaction } from '../entity/transaction.entity';
import { User } from 'src/modules/user/entity/user.entity';

@Injectable()
export class EcommerceService {
    private readonly configReward = 0.02;

    constructor(
        @InjectRepository(Voucher)
        private readonly voucherRepo: Repository<Voucher>,
        @InjectRepository(Transaction)
        private readonly transactionRepo: Repository<Transaction>,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    async checkout(price: number, voucherKey: string, username: string) {
        const voucher = await this.voucherRepo.findOne({ where: { key: voucherKey } });

        if (!voucher) throw new NotFoundException('Voucher not found');

        const user = await this.userRepo.findOne({ where: { username: username } });
        if (!user) throw new NotFoundException('User not found');

        const discount = price * (voucher.value / 100);
        const finalPrice = price - discount;
        const rewardPoints = discount * this.configReward;

        const transaction = this.transactionRepo.create({
            originalPrice: price,
            discount,
            finalPrice,
            rewardPoints,
            voucher,
            user,
        });

        await this.transactionRepo.save(transaction);

        return {
            transactionId: transaction.id,
            originalPrice: price,
            discount,
            finalPrice,
            rewardPoints,
            message: `You saved Rp. ${discount.toLocaleString()} and earned ${rewardPoints.toFixed(2)} points.`,
        };
    }
}