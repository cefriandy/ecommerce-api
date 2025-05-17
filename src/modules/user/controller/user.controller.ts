import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('external-users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUsers(
        @Query('page') page: number = 1,
        @Query('results') results: number = 10,
    ) {
        return this.userService.fetchUsers(page, results);
    }
}