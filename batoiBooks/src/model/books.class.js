import Book from './book.class.js';
import { getDBBooks, addDBBook, removeDBBook, changeDBBook } from '../services/books.api.js'; 

const NOTES = 'Apunts'
const SERVER = 'http://localhost:3000';
export default class Books {
  constructor() {
    this.data = [];
  }

  async populate() {
     this.data = await getDBBooks()
    this.data = this.data.map(item => new Book(item))
  }

  async addBook(book) {
    const dataAdded = await addDBBook(book)
    const newBook = new Book(dataAdded)
    this.data.push(newBook)
    return newBook
  }

  async removeBook(bookId) {
    await removeDBBook(bookId)
    
    const index = this.getBookIndexById(bookId)
    this.data.splice(index, 1);
  }

  async changeBook(book) {
    const dataChanged = await changeDBBook(book)
    const index = this.getBookIndexById(book.id)
    const modifiedBook = new Book(dataChanged)
    this.data.splice(index, 1, modifiedBook)
    return modifiedBook
  }

  toString() {
    let text = `Books: ${this.data.length}`;
    this.data.forEach(item => {
      text += `\n${item.toString()}`;
    });
    return text;
  }

  getBookById(bookId) {
    console.log('ID del libro:', bookId)
    
    if (typeof bookId !== 'string') {
        throw new Error(`El ID del libro no es una cadena válida: ${bookId}`);
    }

    const book = this.data.find((item) => item.id.toString() === bookId.toString());

    console.log("Libro encontrado:", book);

    if (!book) {
        throw new Error(`No existe el libro con id ${bookId}`);
    }

    return book;
  }
  
  getBookIndexById(bookId) {
    const bookIndex = this.data.findIndex((item) => item.id === bookId)
    if (bookIndex === -1) {
      throw new Error(`No existe el libro con id ${bookId}`)
    }
    return bookIndex
  }
  
  async bookExists(userId, moduleCode) {
    const url = `${SERVER}/books?userId=${userId}&moduleCode=${moduleCode}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
     
      return data.length > 0; 
    } catch (error) {
      console.error("Error al verificar si el libro ya existe:", error);
      return false; 
    }
  }
  
  
  booksFromUser(userId) {
    return this.data.filter((item) => item.userId === userId)
  }
  
  booksFromModule(moduleCode) {
    return this.data.filter((item) => item.moduleCode === moduleCode)
  }
  
  booksCheeperThan(price) {
    return this.data.filter((item) => item.price <= price)
  }
  
  booksWithStatus(status) {
    return this.data.filter((item) => item.status === status)
  }
  
  averagePriceOfBooks(books) {
    const sum = this.data.reduce((total, item) => total + item.price, 0)
    return this.data.length
      ? (sum / this.data.length).toFixed(2) + ' €'
      : '0.00 €'
  }
  
  booksOfTypeNotes(books) {
    return this.data.filter((item) => item.publisher === NOTES)
  }
  
  booksNotSold(books) {
    return this.data.filter((item) => !item.soldDate)
  }
  
  incrementPriceOfbooks(increment) {
    return this.data.map((book) => ({
      ...book,
      price: Math.round(book.price * (1 + increment) * 100) / 100
    }))
  }
}