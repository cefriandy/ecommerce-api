import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken';

@Controller('companies')
@ApiBearerAuth()
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Get()
    async getCompanies(@Headers('authorization') authHeader: string) {
        const token = authHeader?.replace('Bearer ', '');
        const decoded: any = jwt.decode(token);

        const username = decoded?.username;

        if (!username) {
            return { message: 'Invalid token: username not found' };
        }
        return this.companyService.getCompaniesByUser(username);
    }
}