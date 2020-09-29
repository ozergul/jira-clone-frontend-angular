import { TextMaskConfig } from 'angular2-text-mask';

// Regexs
export const STRING_REGEX = /^([a-zA-Z]+)$/;

// Masks
export const STRING_MASK = (repeat = 20) => Array(repeat).fill(STRING_REGEX);

// Mask methods
export const stringMask = (repeat = 20): TextMaskConfig => ({ mask: STRING_MASK(repeat), guide: false });
