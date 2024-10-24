import data from './batoibooks.json'; 
import Modules from './src/model/modules.class.js';
import Users from './src/model/users.class.js';
import Books from './src/model/books.class.js';

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



const myModules = new Modules();
const myUsers = new Users();
const myBooks = new Books();

Promise.all([
    myModules.populate(data.modules),
    myUsers.populate(data.users),
    myBooks.populate(data.books)
]);
    
    console.log(myBooks.booksFromModule('5021'));
    console.log(myBooks.booksWithStatus('new'));
    





