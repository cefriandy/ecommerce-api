import { Inject, Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpModuleOptions, HttpModuleOptionsFactory } from "@nestjs/axios";

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(
    private configService: ConfigService
  ) { }

  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: Number(this.configService.get('ECOMMERCE_API_HTTP_TIMEOUT', 15000)),
    }
  }
}
