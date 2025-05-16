import { Inject, Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpModuleOptions, HttpModuleOptionsFactory } from "@nestjs/axios";

// Request scope took out by Chung, as now using axios interceptor to process the dynamic headers forwarding
// static axios/http config will still stay in original http.config.service.ts
// as previously application will create a new instance for each request...
@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(
    private configService: ConfigService 
  ) { }

  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: Number(this.configService.get('ADMIN_EXPERIENCE_API_HTTP_TIMEOUT', 15000)),
    }
  }
}
