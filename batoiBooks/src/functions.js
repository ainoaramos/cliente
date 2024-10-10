
function getBookById(books, bookId){
  let libro=books.find((book) => book.id===bookId);
  
  if(libro){
    return libro;
    
  }throw new Error("No se ha encontrado el libro");

  }
  
function getBookIndexById(books, bookId) {
  let libro=books.findIndex((book) => book.id===bookId);

  if(libro!==-1){
    return libro;

  }throw new Error("No se ha encontrado el libro");

}

function bookExists(books, userId, moduleCode){

  let libro = books.filter(book => book.userId === userId && book.moduleCode === moduleCode);

  if (libro.length > 0) {
      return true; 
  } else {
      return false; 
  }
}
function booksFromUser(books, userId){

  let libro = books.filter(book => book.userId === userId);
  return libro;
}

function booksFromModule(books, moduleCode){

  let libro = books.filter(book => book.moduleCode === moduleCode);
  return libro;
}

function booksCheeperThan(books, price){

  let libro =  books.filter(book => book.price <= price);
  return libro;
}

function booksWithStatus(books, status){

  let libro=books.filter (book => book.status === status);
  return libro;
}

function averagePriceOfBooks(books){
  if (books.length === 0) return "0.00 €"; 

  let precio=books.reduce((sum, book)=> sum+book.price, 0);

  let precioMedio=precio/books.length;

  return precioMedio.toFixed(2)+ " €";
}

function booksOfTypeNotes(books){

  let libro= books.filter(book => book.publisher === "Apunts");
  return libro;
}

function booksNotSold(books){

  let libro=books.filter(book=> !book.soldDate || book.soldDate.trim()==="");
  return libro;

}

function incrementPriceOfbooks(books, percentage){


  return books.map(book => {
    
    let nuevoPrecio = book.price + (book.price * percentage);

    return {
       
        price: nuevoPrecio
       
      
    };
});
}

function getUserById(users, userId){

  let user=users.find(user => user.id===userId);

  if(!user){
    throw new Error("Usuario no encontrado");
  }
  return user;


}
function getUserIndexById(users, userId){
  let user=users.findIndex(user => user.id===userId);

  if(user===-1){
    throw new Error("Usuario no encontrado");
  }
  return user;

}

function getUserByNickName(users, nick){

  let user=users.find(user => user.nick===nick);

  if(!user){
    throw new Error("Usuario no encontrado");
  }
  return user;

}

function getModuleByCode(modules, moduleCode){
  let module=modules.find(mod => mod.code===moduleCode);

  if(!module){
    throw new Error("Modulo no encontrado");
  }
  return module;
    
}


export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
  }