import {isNumberString} from '../util';

it('should accept valid number strings', () => {
	expect(isNumberString('100')).toEqual(true);
	expect(isNumberString('1234')).toEqual(true);
});
it('should reject invalid number strings', () => {
	expect(isNumberString('abc')).toEqual(false);
	expect(isNumberString('12ab')).toEqual(false);
});
