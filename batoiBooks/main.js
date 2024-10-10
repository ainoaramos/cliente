import data from './src/services/datos.js'; 
import {
  booksFromUser,
  booksFromModule,
  booksWithStatus,
  incrementPriceOfbooks
} from './src/functions.js';
 


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="public/logoBatoi.png" class="logo" alt="Logo de BatoiBooks" />
    </a>
    <h1>BatoiBooks</h1>
    <p class="read-the-docs">
      Abre la consola
    </p>
  </div>
`;

const { books} = data; 

const userId = 4;
const user = booksFromUser(books, userId);
console.log(user);

const moduleCode = "5021"; 
const status = "good"; 
const booksModule = booksFromModule(books, moduleCode);
const statusBooks = booksWithStatus(booksModule, status);
console.log(statusBooks);

const incremento = incrementPriceOfbooks(books, 0.10); 
console.log(incremento);


