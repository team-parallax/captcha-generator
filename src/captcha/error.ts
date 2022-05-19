
type TCaptchaParameter = 'language' | 'speed' | 'gap';
export class InvalidCaptchaParameterError extends Error {
	constructor(param: TCaptchaParameter, value: string) {
		super(`the ${param} parameter is invalid: ${value}`);
	}
}
