import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { EcommerceService } from '../service/ecommerce.service';

@ApiTags('ecommerce')
@ApiBearerAuth()
@Controller('ecommerce')
export class EcommerceController {
    constructor(
        private readonly ecommerceService: EcommerceService,
    ) {}

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
        @Req() req: Request,
    ) {
        const user = req.user as { username: string };
        const username = user?.username;

        return this.ecommerceService.checkout(body.price, body.voucherKey, username);
    }
}
