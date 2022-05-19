import express, {Request, Response} from 'express';
import {ICaptchaResponse, IErrorResponse} from './interface';
import {createCaptcha, getAvailableLanguages} from './captcha';

const app = express();
app.use(express.json());

const PORT = 8080;

app.get('/captcha', async (req: Request, resp: Response<ICaptchaResponse | IErrorResponse>) => {
	const lang = req.query.language as string;
	const speed = req.query.speed as string;
	const gap = req.query.gap as string;
	try {
		const captcha = await createCaptcha(lang, speed, gap);
		resp.send(captcha);
	} catch (e: unknown) {
		resp.status(400).send({
			message: (e as Error).message,
		});
	}
});

app.get('/languages', async (req: Request, resp: Response<string[]>) => {
	const languages = await getAvailableLanguages();
	resp.send(languages);
});

app.listen(PORT, () => console.log(`listening on :${PORT}`));
