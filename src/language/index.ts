import fs from 'fs-extra';
import path from 'path';

const languageFilePath = path.join(__dirname, 'languages.json');
console.log(`reading available languages from: ${languageFilePath}`);

const buff = fs.readFileSync(languageFilePath, {
	encoding: 'utf-8',
});
export const availableLanguages = JSON.parse(buff) as string[];

/**
 * Check if a given language is supported.
 * @param lang language to check
 * @return {boolean} true if the provided language is valid, false otherwise.
 */
export const isValidLanguage = (lang: string): boolean => availableLanguages.includes(lang);
