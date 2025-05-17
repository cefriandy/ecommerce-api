import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { Public } from 'src/decorator/public.decorator';
import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
    user: any;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile(@Req() req: AuthenticatedRequest) {
        return req.user;
    }

    @Get('google')
    @Public()
    @UseGuards(AuthGuard('google'))
    async googleAuth() { }

    @Get('google/redirect')
    @Public()
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: AuthenticatedRequest, @Res() res: Response) {
        const result = await this.authService.handleGoogleRedirect(req.user);
        res.cookie(result.cookie.name, result.cookie.value, result.cookie.options);
        return res.redirect('http://localhost:5173/home');
    }
}