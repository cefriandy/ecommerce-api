import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { CompanyController } from './controller/company.controller';
import { CompanyService } from './service/company.service';
import { User } from '../user/entity/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Company, User])],
    providers: [CompanyService],
    controllers: [CompanyController],
})
export class CompanyModule { }