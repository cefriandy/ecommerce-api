import { Controller, Get, Headers, UseGuards } from '@nestjs/common';
import { CompanyService } from '../service/company.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Controller('companies')
@ApiBearerAuth()
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
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