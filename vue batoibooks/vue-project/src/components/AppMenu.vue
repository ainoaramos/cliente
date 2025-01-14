<template>
  <nav>
    <ul>
      <li><router-link to="/">Ver Libros</router-link></li>
      <li><router-link to="/add">Nuevo Libro</router-link></li>
      <li><router-link to="/cart">Ver Carrito</router-link></li>
      <li><router-link to="/about">Acerca de...</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  margin: 10px 0;
}

nav li a {
  text-decoration: none;
  color: blue;
}

nav li a:hover {
  text-decoration: underline;
}
</style>
