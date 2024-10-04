'use strict'


function letters(cadena) {
	return cadena.length;

}

function words(cadena) {
	return cadena.trim().split(/\s+/).length;

}

function upperString(cadena) {
	return cadena.toUpperCase();

}

function titleString(cadena) {

	let palabra = cadena.split(' ');

	for (let i = 0; i < palabra.length; i++) {
	palabra[i]=palabra[i].charAt(0).toUpperCase() + palabra[i].slice(1).toLowerCase();
	}
	return palabra.join(' ');
}

function backwardsLetters(cadena) {
	return cadena.split('').reverse().join('');

}

function backwardsWords(cadena) {
	return cadena.split(' ').reverse().join(' ');

}

function palindromo(cadena) {

	let frase=cadena.replace(/\s+/g, '').toLowerCase();

	let fraseReves=frase.split('').reverse().join('');

	return frase===fraseReves;

}

export{
	letters,
	words,
	upperString,
	titleString,
	backwardsLetters,
	backwardsWords,
	palindromo
}