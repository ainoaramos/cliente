<template>
  <div class="cart">
    <h1>Carrito de Compras</h1>
    <div class="book-list">
      <BookItem
        v-for="book in cartBooks"
        :key="book.id"
        :book="book">

        <template #buttons>
          <button @click="removeFromCart(book.id)">
            <span class="icon-cart-off"></span> Eliminar
          </button>
        </template>
      </BookItem>
    </div>

    <div class="cart-summary">
      <p>Total de libros: {{ totalBooks }}</p>
      <p>Importe total: €{{ totalPrice.toFixed(2) }}</p>
      <button @click="clearCart">Vaciar Carrito</button>
      <button @click="checkout">Realizar Compra</button>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue';
import {useCartStore} from '../stores/cart';
import BookItem from './BookItem.vue';

export default {
  components: { BookItem },
  setup() {
    const cartStore = useCartStore();

    const cartBooks = computed(() => cartStore.cart);
    const totalBooks = computed(() => cartStore.totalBooks);
    const totalPrice = computed(() => cartStore.totalPrice);

    const removeFromCart = (id) => {
      cartStore.removeFromCart(id);
    };

    const clearCart = () => {
      cartStore.clearCart();
    };

    const checkout = () => {
      cartStore.checkout();
    };

    return {
      cartBooks,
      totalBooks,
      totalPrice,
      removeFromCart,
      clearCart,
      checkout,
    };
  },
};
</script>

<style scoped>
.cart {
  padding: 2rem;
}

.book-list {
  margin-bottom: 2rem;
}

.cart-summary {
  border-top: 1px solid #ccc;
  padding-top: 1rem;
}

button {
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:nth-child(2) {
  background-color: #ff5722;
}
</style>





