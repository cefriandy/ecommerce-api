import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { User } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { RestService } from '../rest/service/rest.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        HttpModule,
    ],
    providers: [UserService, RestService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }