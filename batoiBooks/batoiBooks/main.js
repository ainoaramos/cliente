import data from './src/services/datos.js'; 
import Modules from './src/model/modules.class.js';
import Users from './src/model/users.class.js';
import Books from './src/model/books.class.js';
import Module from './src/model/module.class.js';
import User from './src/model/user.class.js';
import Book from './src/model/book.class.js';



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


const myModules=new Modules();
myModules.populate(data.modules);

const myUsers=new Users();
myUsers.populate(data.users);

const myBooks=new Books()
myBooks.populate(data.books)
console.log(`Devuelve ${data.books}`);

console.log(myBooks.toString());
console.log(myBooks.booksFromModule('5021'));
console.log(myBooks.booksWithStatus('new'));
console.log(myBooks.incrementPriceOfbooks(0.1));

