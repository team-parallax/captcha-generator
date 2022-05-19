import {createCaptcha} from '../captcha';
it('should generate a valid captcha w/o parameters', async () => {
	/* Assign */
	/* Act */
	const cap = await createCaptcha();
	/* Assert */
	expect(cap.solution.length).toBeGreaterThan(0);
	expect(cap.svg.length).toBeGreaterThan(0);
	expect(cap.svg.startsWith('<svg')).toEqual(true);
	expect(cap.mp3.length).toBeGreaterThan(0);
});

it('should generate a valid captcha w/ valid parameters', async () => {
	/* Assign */
	const lang = 'en-us';
	const speed = '100';
	const gap = '500';
	/* Act */
	const cap = await createCaptcha(lang, speed, gap);
	/* Assert */
	expect(cap.solution.length).toBeGreaterThan(0);
	expect(cap.svg.length).toBeGreaterThan(0);
	expect(cap.svg.startsWith('<svg')).toEqual(true);
	expect(cap.mp3.length).toBeGreaterThan(0);
});

it('should throw an error with an invalid language parameter', async () => {
	/* Assign */
	const invalidLang = 'foobar';
	/* Act */
	/* Assert */
	await expect(
		createCaptcha(invalidLang),
	).rejects.toThrow(`the language parameter is invalid: ${invalidLang}`);
});

it('should throw an error with an invalid speed parameter', async () => {
	/* Assign */
	const validLang = 'en-us';
	const invalidSpeed = 'asd';
	/* Act */
	/* Assert */
	await expect(
		createCaptcha(validLang, invalidSpeed),
	).rejects.toThrow(`the speed parameter is invalid: ${invalidSpeed}`);
});

it('should throw an error with an invalid gap parameter', async () => {
	/* Assign */
	const validLang = 'en-us';
	const validSpeed = '100';
	const invalidGap = 'asd';
	/* Act */
	/* Assert */
	await expect(
		createCaptcha(validLang, validSpeed, invalidGap),
	).rejects.toThrow(`the gap parameter is invalid: ${invalidGap}`);
});
