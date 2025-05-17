import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entity/company.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) { }

    async getAllCompaniesWithUserInfo() {
        const companies = await this.companyRepository.find({ relations: ['user'] });

        return companies.map((company) => ({
            user_id: company.user.id,
            company_id: company.id,
            name: company.user.name,
            email: company.user.email,
            phone: company.user.phone,
            company_code: company.company_code,
            company_name: company.company_name,
        }));
    }
}