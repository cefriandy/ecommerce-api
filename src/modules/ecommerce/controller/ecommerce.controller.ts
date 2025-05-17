import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { EcommerceService } from '../service/ecommerce.service';
import { Request } from 'express';

@ApiTags('ecommerce')
@ApiBearerAuth()
@Controller('ecommerce')
export class EcommerceController {
    constructor(
        private readonly ecommerceService: EcommerceService,
    ) { }

    @Post('checkout')
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
        @Req() req: Request,
    ) {
        const user = req.user as { username: string };
        const username = user?.username;

        return this.ecommerceService.checkout(body.price, body.voucherKey, username);
    }
}