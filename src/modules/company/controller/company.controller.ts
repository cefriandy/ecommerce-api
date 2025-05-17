import { Controller, Get, Req } from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('companies')
@ApiBearerAuth()
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Get()
    async getCompanies(@Req() req: Request) {
        const user = req.user as any;
        const username = user?.username;

        if (!username) {
            return { message: 'Invalid token: username not found' };
        }

        return this.companyService.getCompaniesByUser(username);
    }
}