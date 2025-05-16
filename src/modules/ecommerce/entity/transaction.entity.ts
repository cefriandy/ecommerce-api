import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Voucher } from './voucher.entity';
import { User } from 'src/modules/user/entity/user.entity';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    originalPrice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    discount: number;

    @Column('decimal', { precision: 10, scale: 2 })
    finalPrice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    rewardPoints: number;

    @ManyToOne(() => Voucher, { eager: true })
    voucher: Voucher;

    @ManyToOne(() => User, { eager: true })
    user: User;

    @CreateDateColumn()
    createdAt: Date;
}