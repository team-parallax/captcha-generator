import {isValidLanguage} from '../language';

it('should accept valid languages', () => {
	expect(isValidLanguage('en-us')).toEqual(true);
	expect(isValidLanguage('de')).toEqual(true);
});
it('should reject invalid languages', () => {
	expect(isValidLanguage('abc')).toEqual(false);
	expect(isValidLanguage('12ab')).toEqual(false);
});
