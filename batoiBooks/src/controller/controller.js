import Modules from '../model/modules.class.js';
import Users from '../model/users.class.js';
import Books from '../model/books.class.js';
import View from '../view/view.js';


class Controller {
  constructor() {
    this.modules= new Modules();
    this.users = new Users();
    this.books = new Books();
    this.view = new View();
  }

  async init() {
    await this.books.populate();
    await this.modules.populate();
    await this.users.populate();
   
    this.view.renderOptions(this.books.data);
  
    this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
    this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
  }

  handleSubmitBook(book) {
    book.preventDefault();
    try {
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const moduleId = this.view.moduleSelect.value;

      const newBook = { title, author, moduleId };
      this.books.addBook(newBook);
      this.view.renderBookList(this.books.books);
      this.view.showMessage('info', 'Libro añadido');
    } catch (error) {
      this.view.showMessage('error', `Error al añadir libro: ${error.message}`);
    }
  }

  handleRemoveBook(bookId) {
    try {
      this.books.removeBook(bookId);
      this.view.renderBookList(this.books.books);
      this.view.showMessage('info', 'Libro eliminado');
    } catch (error) {
      this.view.showMessage('error', `Error al eliminar libro: ${error.message}`);
    }
  }
}

export default Controller;
