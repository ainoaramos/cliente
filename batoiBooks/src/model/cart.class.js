export default class Cart {
  constructor() {
    this.data = [];
  }

  async populate() {
 
  }
  getBookById(bookId) {
    const book = this.data.find(item => item.id === id);
    return book || {};
  }

  addItem(book){
    const existingBook = this.getBookById(book.id);
    if (Object.keys(existingBook).length > 0) {
      throw new Error(`El libro con ID ${book.id} ya está en el carrito.`);
    }
    this.data.push({ ...book });
  }

  removeItem(bookId){
    const index=this.data.findIndex((item)=>item.id===bookId);
    if(index===-1){
      throw new Error(`No existe el libro`);
    }
    this.data.splice(index, 1);
  }
  

  toString() {
    let text = `Cart: ${this.data.length}`;
    this.data.forEach(item => {
      text += `\n${item.toString()}`;
    });
    return text;
  }


}