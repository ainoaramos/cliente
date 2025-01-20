import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  }),
  getters: {
    totalBooks: (state) => state.cart.length,
    totalPrice: (state) => state.cart.reduce((sum, book) => sum + book.price, 0),
    isInCart: (state) => (id) => state.cart.some((book) => book.id === id),
  },
  actions: {
    addToCart(book) {
      if (!this.isInCart(book.id)) {
        this.cart.push(book);
        this.saveToLocalStorage();
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((book) => book.id !== id);
      this.saveToLocalStorage();
    },
    clearCart() {
      this.cart = [];
      this.saveToLocalStorage();
    },
    checkout() {
      alert('Compra realizada con éxito');
      this.clearCart();
    },
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
  },
});
