<template>
  <div class="book-list">
    <BookItem
      v-for="book in books"
      :key="book.id"
      :book="book"
    >
      <template #buttons>
        <button
          :class="{added: isInCart(book.id)}"
          @click="addToCart(book)"
          :disabled="isInCart(book.id)"
        >
          {{ isInCart(book.id) ? 'Añadido' : 'Añadir al Carrito' }}
        </button>
        <button @click="editBook(book.id)">Editar</button>
        <button @click="deleteBook(book.id)">Eliminar</button>
      </template>
    </BookItem>
  </div>
</template>

<script>
import {computed} from 'vue';
import {useBooksStore} from '../stores/books';
import {useCartStore} from '../stores/cart';
import BookItem from './BookItem.vue';
import {useRouter} from 'vue-router';

export default {
  components: {BookItem},
  setup() {
    const booksStore = useBooksStore();
    const cartStore = useCartStore();
    const router = useRouter();

    const books = computed(() => booksStore.books);
    const isInCart = cartStore.isInCart;

    const addToCart = (book) => {
      if (!isInCart(book.id)) {
        cartStore.addToCart(book);
      }
    };

    const deleteBook = (bookId) => {
      booksStore.deleteBook(bookId);
    };

    const editBook = (bookId) => {
      router.push(`/edit/${bookId}`);
    };

    return {
      books,
      addToCart,
      isInCart,
      deleteBook,
      editBook,
    };
  },
  mounted() {
    const booksStore = useBooksStore();
    booksStore.fetchBooks();
    booksStore.fetchModules();
  },
};
</script>






  