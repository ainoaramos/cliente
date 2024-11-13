import Modules from '../model/modules.class.js';
import Users from '../model/users.class.js';
import Books from '../model/books.class.js';
import Cart from '../model/cart.class.js';
import View from '../view/view.js';


export default class Controller {
  constructor() {
      this.modules= new Modules();
      this.users = new Users();
      this.books = new Books();
      this.view = new View();
      this.cart = new Cart();
    
  }

  async init() {
    this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
    this.view.setBookListHandler(this.handleBookButton.bind(this));
     
    await Promise.all([
     this.books.populate(),
     this.modules.populate(),
     this.users.populate(),
     this.cart.populate()

    ]);
     
     this.view.renderModuleList(this.modules.data);
     this.books.data.forEach(book=>this.view.renderBook(book));
  
     
  }

  handleBookButton(action, bookId){
    const book = this.books.getBookById(bookId);

  if (!book) {
    view.renderMessage('error', `El libro con ID ${bookId} no fue encontrado.`);
    return;
  }

  switch (action) {
    case 'remove':
      this.handleRemoveBook(bookId);
      break;

    case 'cart':
      try {
        this.cart.addItem(book); 
        this.view.renderMessage('success', `El libro con ID ${book.id} ha sido añadido al carrito.`);
      } catch (error) {
        this.view.renderMessage('error', error.message);  
      }
       break;

        case 'edit':
          this.view.renderBookInForm(book);
          break;
      default:
        break;
    }

  }

  async handleSubmitBook(payload) {
    payload.pages=parseInt(payload.pages);
    payload.price=parseFloat(payload.price);
    try{    
      if(payload.id){
        payload.id=parseInt(payload.id);
        const edited= await this.books.changeBook(payload);
        this.view.renderMessage('info', 'Libro modificado');
        this.view.renderEditedBook(edited);
    
     }else{
        const newBook= await this.books.addBook(payload);
        this.view.renderMessage('info', 'Libro añadido');
        this.view.renderBook(newBook);
        }
    }catch(error){
      this.view.renderMessage('error', error);
      return;
    }    
this.view.renderFormToAddBook();
}

  async handleRemoveBook(id) {
    if(!confirm('¿Quieres borrar este libro?'))return;
    id=parseInt(id);
    try{
      await this.books.removeBook(id);
      this.books.removeBook(id);
      this.books.renderMessage('info', 'Libro borrado');
    }catch(error){
      this.view.renderMessage('error');
    }
    
    
  }
}


