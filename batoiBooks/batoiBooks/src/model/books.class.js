import Book from './book.class.js';

export default class Books{
        constructor(){
            this.data=[]
        }

        toString() {
          return this.data.map(book => book.toString()).join();
      }

        populate(books){
            this.data=books.map(bookData=>new Book(bookData));
        }

        addBook(bookData){
            
          let ultimoId = 0;  

          if (this.data.length > 0) {
              for (let i = 0; i < this.data.length; i++) {
                  let book = this.data[i];
                  if (book.id > ultimoId) {
                      ultimoId = book.id; 
              }
          }
      }
          let nuevoId = ultimoId + 1;  
          let nuevoBook = new Book( { id: nuevoId, userId: bookData.userId,moduleCode: bookData.moduleCode, publisher: bookData.publisher,
            price: bookData.price,pages: bookData.pages,status: bookData.status,photo: bookData.photo,comments: bookData.comments,soldDate: bookData.soldDate}); 
          this.data.push(nuevoBook);  
          return nuevoBook;  
        }

        removeBook(id){
            let posicion = this.data.findIndex(book => book.id === id);
            if (posicion === -1) {
                throw new Error(`Libro con id ${id} no encontrado`);
            }
            this.data.splice(posicion, 1); 
        }

        changeBook(cambiarBook) {
          let posicion = this.data.findIndex(book => book.id === cambiarBook.id);   
          if (posicion === -1) {
              throw new Error(`Libro con id ${cambiarBook.id} no encontrado`);  
          }
          let book = this.data[posicion];  
          book.userId = cambiarBook.userId;  
          book.moduleCode = cambiarBook.moduleCode; 
          book.publisher = cambiarBook.publisher; 
          book.price = cambiarBook.price;  
          book.pages = cambiarBook.pages; 
          book.status = cambiarBook.status; 
          book.photo = cambiarBook.photo;  
          book.comments = cambiarBook.comments; 
          book.solDate = cambiarBook.soldDate; 
      
          return book;  
      }


     getBookById(bookId){
    let libro=this.data.find((book) => book.id===bookId);
    
    if(libro){
      return libro;
      
    }throw new Error("No se ha encontrado el libro");
  
    }

     getBookIndexById(bookId) {
        let libro=this.data.findIndex((book) => book.id===bookId);
      
        if(libro!==-1){
          return libro;
      
        }throw new Error("No se ha encontrado el libro");
      
      }
      
       bookExists( userId, moduleCode){
        let libro = this.data.filter(book => book.userId === userId && book.moduleCode === moduleCode);
      
        if (libro.length > 0) {
            return true; 
        } else {
            return false; 
        }
      }

       booksFromUser(userId){
        let libro = this.data.filter(book => book.userId === userId);
        return libro;
      }
      
       booksFromModule(moduleCode){
        let libro = this.data.filter(book => book.moduleCode === moduleCode);
        return libro;
      }

       booksCheeperThan(price){
        let libro =  this.data.filter(book => book.price <= price);
        return libro;
      }
      
       booksWithStatus(status){
        let libro=this.data.filter (book => book.status === status);
        return libro;
      }

       averagePriceOfBooks(){
        if (this.data.length === 0) return "0.00 €"; 
      
        let precio=this.data.reduce((sum, book)=> sum+book.price, 0);
      
        let precioMedio=precio/this.data.length;
      
        return precioMedio.toFixed(2)+ " €";
      }
      
       booksOfTypeNotes(){
        let libro= this.data.filter(book => book.publisher === "Apunts");
        return libro;
      }

       booksNotSold(){
        let libro=this.data.filter(book=> !book.soldDate || book.soldDate.trim()==="");
        return libro;
      
      }
      
       incrementPriceOfbooks(percentage){
        return this.data.map(book => {
          
          let nuevoPrecio = book.price + (book.price * percentage);
      
          return {
             
              price: nuevoPrecio
             
            
          };
      });
      }




    
}