import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/entity/user.entity';
import { CookieOptions } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async handleGoogleRedirect(user: User) {
    const generatedId = uuidv4();
    const sanitizedUsername = user.name.replace(/\s+/g, '').toLowerCase();

    const payload = {
      sub: generatedId,
      email: user.email,
      username: sanitizedUsername,
    };

    const token = this.jwtService.sign(payload);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600 * 1000,
    };

    return {
      message: 'Login successful',
      user,
      accessToken: token,
      cookie: {
        name: 'jwt',
        value: token,
        options: cookieOptions,
      },
    };
  }
}