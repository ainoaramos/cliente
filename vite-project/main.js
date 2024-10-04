import { letters, words, upperString, titleString, backwardsLetters, backwardsWords, palindromo } from './src/functions.js';

document.querySelector('#app').innerHTML = `

   <p>Abre la consola para ver los resultados.</p>
`

let frase=prompt("Introduce una frase: ");

console.log(letters(frase));
console.log(words(frase));
console.log(upperString(frase));
console.log(titleString(frase));
console.log(backwardsLetters(frase));
console.log(backwardsWords(frase));
console.log(palindromo(frase));
