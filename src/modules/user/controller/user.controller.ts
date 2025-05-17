import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('random-users')
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUsers(
        @Query('page') page: number = 1,
        @Query('results') results: number = 10,
        @Query('search') search?: string,
    ) {
        return this.userService.fetchUsers(page, results, search);
    }
}