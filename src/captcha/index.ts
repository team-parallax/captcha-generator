import captcha from 'svg-captcha';
import uuid from 'uuid4';
import fs from 'fs-extra';
import {promisify} from 'util';
import {exec} from 'child_process';
import {ICaptchaResponse} from './interface';
import {isValidLanguage} from '../language/';
import {isNumberString, readAsString} from '../util';
import {InvalidCaptchaParameterError} from './error';

const runCommand = promisify(exec);

/**
 * Generate a captcha and return a response containing the captcha or throw an error if it fails
 * @param lang specifies the language used for the voice
 * @param speed specifies the speed of the spoken words
 * @param gap specifies the length of time between words
 * @return {Promise<ICaptchaResponse>} contains the svg, mp3 and solution for the captcha
 */
export const createCaptcha = async (
	lang?: string,
	speed?: string,
	gap?: string,
	length?: number,
): Promise<ICaptchaResponse> => {
	const id = uuid();
	const language = lang ?? 'en-us';
	const sp = speed ?? '100';
	const gp = gap ?? '10';
	const lg = length ?? 6;
	console.log(`generating captcha: ${id} (length: ${lg}, lang: ${language}, speed: ${sp}, gap:${gp})`);

	if (!isValidLanguage(language)) {
		throw new InvalidCaptchaParameterError('language', language);
	}

	if (!isNumberString(sp)) {
		throw new InvalidCaptchaParameterError('speed', sp);
	}

	if (!isNumberString(gp)) {
		throw new InvalidCaptchaParameterError('gap', gp);
	}

	if (lg <= 0) {
		throw new InvalidCaptchaParameterError('length', lg);
	}

	const cap = captcha.create({
		size: lg,
	});
	const {
		data: svgData,
		text: solution,
	} = cap;
	const withSpaces = solution.split('').join(' ');
	const filename = `${id}.wav`;

	await runCommand(
		`espeak-ng "${withSpaces}" -w ${filename} -v ${language} -s ${sp} -g ${gp}`,
	);

	if (!fs.existsSync(filename)) {
		throw new Error('failed to create captcha audio');
	}

	const convertedFilename = `${id}.mp3`;
	await runCommand(
		`ffmpeg -i ${filename} ${convertedFilename}`,
	);

	if (!fs.existsSync(convertedFilename)) {
		throw new Error('failed to convert captcha audio');
	}

	const fileData = readAsString(convertedFilename);
	fs.removeSync(filename);
	fs.removeSync(convertedFilename);
	return {
		id,
		mp3: fileData,
		svg: svgData,
		solution,
	};
};

