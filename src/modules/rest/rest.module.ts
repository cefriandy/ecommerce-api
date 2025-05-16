import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HttpConfigService } from '../../config/http.config.service';
import { RestService } from './service/rest.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule,
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useClass: HttpConfigService,
        }),
    ],
    providers: [RestService],
    exports: [RestService],
})
export class RestModule { }