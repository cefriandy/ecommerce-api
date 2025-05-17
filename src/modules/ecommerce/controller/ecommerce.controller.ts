import { Controller, Post, UseGuards, Body, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { EcommerceService } from '../service/ecommerce.service';
import * as jwt from 'jsonwebtoken';

@ApiTags('ecommerce')
@ApiBearerAuth()
@Controller('ecommerce')
export class EcommerceController {
    constructor(
        private readonly ecommerceService: EcommerceService,
    ) { }

    @Post('checkout')
    @UseGuards(AuthGuard('jwt'))
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                price: { type: 'number' },
                voucherKey: { type: 'string' },
            },
            required: ['price', 'voucherKey'],
        },
    })
    checkout(
        @Body() body: { price: number; voucherKey: string },
        @Headers('authorization') authHeader: string
    ) {
        const token = authHeader?.replace('Bearer ', '');
        const decoded: any = jwt.decode(token);
        const username = decoded?.username;

        return this.ecommerceService.checkout(body.price, body.voucherKey, username);
    }
}