import Book from './book.class.js';
import { getDBBooks, addDBBook, removeDBBook, changeDBBook } from '../services/books.api.js'; 

export default class Books{
        constructor(){
            this.data=[]
        }

        toString() {
          return this.data.map(book => book.toString()).join();
      }

        async populate(){
          try{
            const books = await getDBBooks();
            this.data=books.map(bookData=>new Book(bookData));
        }catch(error){
          console.error("Error al obtener los libros");
        
        }
      }


        async addBook(bookData){
          try{
            const newBookData=await addDBBook(bookData);
            const newBook=new Book(newBookData);
            this.data.push(newBook);
            return newBook;
          }catch(error){
            console.error("Error al añadir el libro");
            throw error
          }
      }
       
      async removeBook(id) {
        const posicion = this.data.findIndex(book => book.id === id);

        if (posicion === -1) {
            throw new Error("Libro no encontrado");
        }
        try {
            await removeDBBook(id); 
            this.data.splice(posicion, 1); 
            return "Libro eliminado";
        } catch (error) {
            throw new Error("Error al eliminar el libro de la base de datos");
        }
    }


        async changeBook(cambiarBook) {
          try {
            const updateBookData = await changeDBBook(cambiarBook); 
            const posicion = this.data.findIndex(book => book.id === updateBookData.id);
    
            if (posicion === -1) {
                throw new Error("Libro no encontrado");
            }

            this.data[posicion] = new Book(updateBookData); 
            return this.data[posicion];
        } catch (error) {
            console.error("Error al modificar el libro"); 
            throw error; 
        }
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
      
       





    
}