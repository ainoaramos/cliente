import { describe, expect, test } from 'vitest';
import {
	letters,
	words,
	upperString,
	titleString,
	backwardsLetters,
	backwardsWords,
	palindromo
} from '../src/functions';

describe('Funciones sobre la frase "Una frase para probar"', () => {
    const frase = 'Una frase para probar';
    const frase2 = 'La ruta nos aporto otro paso natural';

    test('letters de frase devuelve 21', () => {
      expect(letters(frase)).toBe(21);
    });
    test('words devuelve 4', () => {
      expect(words(frase)).toBe(4);
    });
    test('upperString devuelve UNA FRASE PARA PROBAR', () => {
      expect(upperString(frase)).toBe('UNA FRASE PARA PROBAR');
    });
    test('titleString devuelve Una Frase Para Probar ', () => {
      expect(titleString(frase)).toBe('Una Frase Para Probar');
    });
    test('backwardsLetters devuelve raborp arap esarf anU', () => {
      expect(backwardsLetters(frase)).toBe('raborp arap esarf anU');
    });
    test('backwardsWords devuelve probar para frase Una', () => {
      expect(backwardsWords(frase)).toBe('probar para frase Una');
    });

    test('Un no palíndromo devuelve FALSE', () => {
      expect(palindromo(frase)).toBe(false);
    });
    test('Un palíndromo devuelve TRUE', () => {
      expect(palindromo(frase2)).toBeTruthy();
    });
});