import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string; // e.g., "VOUCHER50"

  @Column({ unique: true })
  name: string; // e.g., "50% Discount Voucher"

  @Column('float')
  value: number; // e.g., 50 for 50%
}