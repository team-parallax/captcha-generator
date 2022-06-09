import express, {Request, Response} from 'express';
import {createCaptcha} from './captcha';
import {availableLanguages} from './language';
import {ICaptchaRequest} from './interface';
import {ICaptchaQuery} from './captcha/interface';

const app = express();
const PORT = 8080;

app.get('/captcha', async (
	req: Request<{}, {}, {}, ICaptchaQuery>,
	resp: Response<ICaptchaRequest>,
) => {
	const {
		language,
		speed,
		gap,
		length,
	} = req.query;
	try {
		const captcha = await createCaptcha(language, speed, gap, length);
		resp.send(captcha);
	} catch (e: unknown) {
		resp.status(400).send({
			message: (e as Error).message,
		});
	}
});

app.get('/languages', async (req: Request, resp: Response<string[]>) => {
	resp.send(availableLanguages);
});

app.listen(PORT, () => console.log(`listening on :${PORT}`));
