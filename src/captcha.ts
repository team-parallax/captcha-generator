import captcha from 'svg-captcha';
import uuid from 'uuid4';
import fs from 'fs-extra';
import {promisify} from 'util';
import {exec} from 'child_process';
import {ICaptchaResponse} from './interface';

const runCommand = promisify(exec);

export const createCaptcha = async (
	lang?: string,
	speed?: string,
	gap?: string,
): Promise<ICaptchaResponse> => {
	const language = lang ?? 'en-us';
	const sp = speed ?? '100';
	const gp = gap ?? '10';
	const languages = await getAvailableLanguages();
	if (!languages.includes(language)) {
		throw new Error(`The requested language is not available: ${language}`);
	}

	if (!/\d/g.test(sp)) {
		throw new Error(`The set speed is not a valid number: ${sp}`);
	}

	if (!/\d/g.test(gp)) {
		throw new Error(`The set gap is not a valid number: ${gp}`);
	}

	const id = uuid();
	console.log(`generating captcha: ${id} (lang: ${language}, speed: ${sp}, gap:${gp})`);
	const cap = captcha.create();
	const {
		data: svgData,
		text: solution,
	} = cap;
	const withSpaces = solution.split('').join(' ');
	const filename = `${id}.mp3`;

	await runCommand(
		`espeak-ng "${withSpaces}" -w ${filename} -v ${language} -s ${sp} -g ${gp}`,
	);
	// TO-DO: check for error
	const fileData = fs.readFileSync(filename, {
		encoding: 'base64',
	});
	fs.removeSync(filename);
	return {
		mp3: fileData,
		svg: svgData,
		solution,
	};
};

export const getAvailableLanguages = async (): Promise<string[]> => {
	const {stdout} = await runCommand('espeak-ng --voices');
	return stdout
		.split('\n')
		.filter(l => l !== '')
		.slice(1)
		.map(l => l.split(' ').filter(w => w !== '')[1]);
};
