import { Controller, Get, UseGuards } from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('companies')
@ApiBearerAuth()
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getCompanies() {
        return this.companyService.getAllCompaniesWithUserInfo();
    }
}
