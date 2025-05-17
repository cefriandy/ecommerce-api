import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/modules/user/entity/user.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    company_code: string;

    @Column({ nullable: true })
    company_name: string;

    @ManyToOne(() => User, { eager: true })
    user: User;
}