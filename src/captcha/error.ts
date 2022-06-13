
type TCaptchaParameter = 'language' | 'speed' | 'gap' | 'length';
export class InvalidCaptchaParameterError extends Error {
	constructor(param: TCaptchaParameter, value: string | number) {
		super(`the ${param} parameter is invalid: ${value}`);
	}
}
