<template>
  <div class="cart">
    <h2>Libros en el carrito</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">{{ item.title }}</li>
    </ul>
    <p>Lorem ipsum dolor sit, amet consectetur adipiscing elit. Odit totam, adipisci iste ducimus id volupt Juan Segura - DWEC</p>
  </div>
</template>

<script>
export default {
  name: "AppCart",
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.cart {
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ccc;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 5px;
}
p {
  margin-top: 10px;
  font-size: 0.9em;
  color: #555;
}
</style>



