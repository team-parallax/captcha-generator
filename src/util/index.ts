import fs from 'fs-extra';

export const isNumberString = (str: string) => /^\d+$/.test(str);

export const readAsString = (path: string) => fs.readFileSync(path, {encoding: 'utf-8'});
