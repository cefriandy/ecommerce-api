import { Controller, Get } from '@nestjs/common';
import { CompanyService } from '../service/company.service';

@Controller('companies')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Get()
    async getCompanies() {
        return this.companyService.getAllCompaniesWithUserInfo();
    }
}
