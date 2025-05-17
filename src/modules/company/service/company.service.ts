import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entity/company.entity';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getCompaniesByUser(username: string) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            return [];
        }

        const companies = await this.companyRepository.find({
            where: { user: { id: user.id } },
        });

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