export interface ICaptchaResponse {
    id: string
    svg: string
    mp3: string
    solution: string
}

export interface ICaptchaQuery {
    language?: string
    speed?: string
    gap?: string
}
