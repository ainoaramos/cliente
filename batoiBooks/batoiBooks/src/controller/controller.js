import Modules from '../model/modules.class.js';
import Users from '../model/users.class.js';
import Books from '../model/books.class.js';
import View from '../view/view.js';


export default class Controller {
  constructor() {
      this.modules= new Modules();
      this.users = new Users();
      this.books = new Books();
      this.view = new View();
    
  }

  async init() {
    await Promise.all([
      this.books.populate(),
     this.modules.populate(),
     this.users.populate()

    ]);
     

     this.view.renderModuleList(this.modules.data);
     this.books.data.forEach(book=>this.view.renderBook(book));
  
     this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
     this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
  }

  handleSubmitBook(payload) {
    const bookInDB=this.books.addBook(payload);
    this.view.renderBook(bookInDB);
    
  }

  handleRemoveBook(id) {
    this.books.removeBook(id);
    this.view.renderRemoveBook(id);
  }
}


