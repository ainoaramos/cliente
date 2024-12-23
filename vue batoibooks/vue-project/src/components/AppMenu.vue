<template>
  <header>
    <h1>BatoiBooks</h1>
    <nav>
      <ul>
        <li><a href="#">Ver Libros</a></li>
        <li><a href="#">Añadir Libro</a></li>
        <li><a href="#">Acerca de...</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppMenu",
};
</script>

<style scoped>
header {
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
}
h1 {
  font-size: 1.8em;
  color: #000;
}
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
nav ul li {
  margin: 5px 0;
}
nav ul li a {
  text-decoration: none;
  color: #0000ee;
  font-size: 1em;
}
nav ul li a:hover {
  text-decoration: underline;
}
</style>