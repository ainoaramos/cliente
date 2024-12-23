<script setup>
import AppMenu from './components/AppMenu.vue';
import AppMessages from './components/AppMessages.vue';
import BooksList from './components/BooksList.vue';
import AddBook from './components/AddBook.vue';
import AppCart from './components/AppCart.vue';
import AppAbout from './components/AppAbout.vue';
import { ref } from 'vue';
import axios from 'axios';

const messages = ref([]);
const books = ref([]);
const cart = ref([]);

const fetchBooks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/books');
    books.value = response.data;
  } catch (error) {
    console.error('Error al cargar los libros:', error);
    messages.value.push('Error al cargar los libros.');
  }
};

const deleteBook = async (bookId) => {
  try {
    await axios.delete(`http://localhost:3000/books/${bookId}`);
    books.value = books.value.filter((book) => book.id !== bookId);
    messages.value.push(`Libro con ID ${bookId} borrado.`);
  } catch (error) {
    console.error('Error al borrar el libro:', error);
    messages.value.push('Error al borrar el libro.');
  }
};

const addBook = async (book) => {
  console.log("Libro recibido en el padre:", book); 
  try {
    const response = await axios.post("http://localhost:3000/books", book);
    books.value.push(response.data);
    messages.value.push(`Libro "${book.id}" añadido correctamente.`);
  } catch (error) {
    console.error("Error al añadir el libro:", error);
    messages.value.push("Error al añadir el libro.");
  }
};

fetchBooks();
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <AppMenu />
    </div>
  </header>

  <main>
    <AppMessages :messages="messages" />
    <BooksList :books="books" @deleteBook="deleteBook" />
    <AddBook @addBook="addBook" />
    <AppCart :cart="cart" />
    <AppAbout />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.wrapper {
  margin-bottom: 2rem;
}

main {
  padding: 2rem;
}
</style>




