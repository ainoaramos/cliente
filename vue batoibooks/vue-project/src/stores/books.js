import {defineStore} from 'pinia';
import axios from 'axios';

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
    modules: [],
  }),
  getters: {
    getModuleDescription: (state) => (moduleCode) => {
      const module = state.modules.find((mod) => mod.cliteral === moduleCode);
      return module ? module.description : moduleCode;
    },
  },
  actions: {
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3000/books');
        this.books = response.data;
      } catch (error) {
        console.error('Error al cargar los libros:', error);
      }
    },
    async fetchModules() {
      try {
        const response = await axios.get('http://localhost:3000/modules');
        this.modules = response.data;
      } catch (error) {
        console.error('Error al cargar los módulos:', error);
      }
    },
    async deleteBook(bookId) {
      try {
        await axios.delete(`http://localhost:3000/books/${bookId}`);
        this.books = this.books.filter((book) => book.id !== bookId);
      } catch (error) {
        console.error('Error al borrar el libro:', error);
      }
    },
  },
});
