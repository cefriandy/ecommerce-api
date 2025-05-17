import { Observable } from 'rxjs';
import { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestContext } from 'nestjs-request-context';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RestService {
    private readonly logger = new Logger(RestService.name);

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {
        this.axiosRef.interceptors.request.use((config) => {
            const request = RequestContext.currentContext?.req;
            const configHeaders = { ...config.headers };
            const requestHeaders = { ...(request?.headers as AxiosRequestHeaders) };

            const acceptHeaders = (this.configService.get('ACCEPT_HEADERS') || '').toLowerCase().split(',');
            Object.keys(requestHeaders).forEach((key) => {
                if (!acceptHeaders.includes(key.toLowerCase())) {
                    delete requestHeaders[key];
                }
            });

            const headers: RawAxiosRequestHeaders = {
                ...configHeaders,
                ...requestHeaders,
            };

            ['content-length', 'accept'].forEach((key) => {
                delete headers[key];
            });

            config.headers = { ...headers } as AxiosRequestHeaders;

            config.headers['Authorization'] = config.headers?.['Authorization'] ?? '';
            return config;
        });
    }

    get axiosRef(): AxiosInstance {
        return this.httpService.axiosRef;
    }

    request<T = any>(config: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        return this.httpService.request(config);
    }

    delete<T = any>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        return this.httpService.delete(url, config);
    }

    get<T = any>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        return this.httpService.get(url, config);
    }

    head<T = any>(url: string, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        return this.httpService.head(url, config);
    }

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        return this.httpService.patch(url, data, config);
    }

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        return this.httpService.post(url, data, config);
    }

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Observable<AxiosResponse<T>> {
        return this.httpService.put(url, data, config);
    }

    //optional: we can add logger here
}