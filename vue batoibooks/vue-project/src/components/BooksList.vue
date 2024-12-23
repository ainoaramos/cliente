<template>
  <div id="books">
    <ul>
      <li v-for="book in books" :key="book.id">
        <div>
          <strong>Libro:</strong> {{ book.id }}
        </div>
        <div>
          <strong>{{ book.module }}</strong> ({{ book.id }})
        </div>
        <div>
          {{ book.publisher }}
        </div>
        <div>
          <strong>Precio:</strong> {{ book.price }}€
        </div>
        <div>
          <strong>Páginas:</strong> {{ book.pages }}
        </div>
        <div>
          <strong>Comentarios:</strong> {{ book.comments }}
        </div>
        <div>
          <button @click="addToCart(book)">Añadir al carrito</button>
          <button @click="editBook(book)">Editar</button>
          <button @click="confirmDelete(book)">Borrar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    books: {
      type: Array,
      required: true,
    },
  },
  methods: {

    addToCart(book) {
      this.$emit('addToCart', book.id);
    },

    editBook(book) {
      this.$emit('editBook', book.id);
    },


    confirmDelete(book) {
      const confirmation = window.confirm(
        `¿Estás seguro de que quieres borrar el libro con ID: ${book.id} y módulo: ${book.module}?`
      );

      if (confirmation) {
        this.$emit('deleteBook', book.id);  
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  background-color: #f8f8d3;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

div {
  margin-bottom: 0.5rem;
  font-family: Arial, sans-serif;
  color: #333;
}

button {
  background-color: #8f8f8f;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #6d6d6d;
}
</style>



  