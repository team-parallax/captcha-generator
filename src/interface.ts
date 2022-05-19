import {ICaptchaResponse} from './captcha/interface';

export interface IErrorResponse {
    message: string
}

export type ICaptchaRequest = ICaptchaResponse | IErrorResponse
