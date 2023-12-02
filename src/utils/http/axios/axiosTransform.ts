/**
 * 数据处理类，可根据项目配置
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { RequestOptions, Result } from '/#/axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
    authenticationScheme?: string;
    transform?: AxiosTransform;
    requestOptions?: RequestOptions;
}
/**
 *
 */
export abstract class AxiosTransform {
    /**
     * @description: 请求前的流程配置|Process configuration before request
     */
    beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

    /**
     * @description: 请求已成功处理|Request successfully processed
     */
    transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

    /**
     * @description: 请求失败处理
     */
    requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

    /**
     * @description: 请求之前的拦截器
     */
    requestInterceptors?: (config: InternalAxiosRequestConfig, options: CreateAxiosOptions) => InternalAxiosRequestConfig;

    /**
     * @description: 请求之后的拦截器
     */
    responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

    /**
     * @description: 请求之前的拦截器错误处理
     */
    requestInterceptorsCatch?: (error: Error) => void;

    /**
     * @description: 请求之后的拦截器错误处理
     */
    responseInterceptorsCatch?: (axiosInstance: AxiosResponse, error: Error) => void;
}