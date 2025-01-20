<template>
    <div class="book-card">
      <h3>Libro: {{ book.id }}</h3>
      <p>Módulo: {{ (book.module) }}</p>
      <p>Editorial: {{ book.publisher }}</p>
      <p>Precio: €{{ book.price }}</p>
      <slot name="buttons"></slot>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useBooksStore } from '../stores/books';
  
  export default {
    props: {
      book: {
        type: Object,
        required: true,
      },
    },
    setup() {
      const booksStore = useBooksStore();
      const getModuleDescription = (module) => booksStore.getModuleDescription(module);
  
      return {
        getModuleDescription,
      };
    },
  };
  </script>
  
  <style scoped>
  .book-card {
    border: 1px solid #ccc;
    padding: 1rem;
    background-color: #f9f9f9;
    margin-bottom: 1rem;
  }
  </style>
  