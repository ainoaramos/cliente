<template>
  <form @submit.prevent="addBook" class="add-book-form">
    <h2>Añadir libro</h2>

    <label>Id:</label>
    <input v-model="newBook.id" required />

    <label>Módulo:</label>
    <select v-model="newBook.module" required>
      <option disabled value="">-Seleccione un módulo-</option>
      <option v-for="module in modules" :key="module.id" :value="module.cliteral">
        {{ module.cliteral }}
      </option>
    </select>

    <label>Editorial:</label>
    <input v-model="newBook.publisher" />

    <label>Precio:</label>
    <input v-model="newBook.price" type="number" />

    <label>Páginas:</label>
    <input v-model="newBook.pages" type="number" />

    <label>Estado:</label>
    <div>
      <label><input type="radio" value="Nuevo" v-model="newBook.state" /> Nuevo</label>
      <label><input type="radio" value="Bueno" v-model="newBook.state" /> Bueno</label>
      <label><input type="radio" value="Usado" v-model="newBook.state" /> Usado</label>
      <label><input type="radio" value="Malo" v-model="newBook.state" /> Malo</label>
    </div>

    <label>Comentarios:</label>
    <textarea v-model="newBook.comments"></textarea>

    <button type="submit">Añadir</button>
    <button type="reset">Reset</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "AddBook",
  data() {
    return {
      newBook: {
        id: "",
        module: "",
        publisher: "",
        price: 0,
        pages: 0,
        state: "Nuevo", 
        comments: "",
      },
      modules: [],
    };
  },
  methods: {
 
    async fetchModules() {
      try {
        const response = await axios.get("http://localhost:3000/modules");
        this.modules = response.data;
      } catch (error) {
        console.error("Error al cargar los módulos:", error);
      }
    },

    addBook() {
      console.log("Libro enviado desde AddBook.vue:", this.newBook); 
      this.$emit("addBook", { ...this.newBook }); 
    
      this.newBook = {
        id: "",
        module: "",
        publisher: "",
        price: 0,
        pages: 0,
        state: "Nuevo", 
        comments: "",
      };
    },
  },
  mounted() {
    this.fetchModules();
  },
};
</script>

<style scoped>
.add-book-form {
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ccc;
}

label {
  font-weight: bold;
  display: block;
  margin: 10px 0 5px;
}

input,
select,
textarea {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button[type="reset"] {
  background-color: #ccc;
}
</style>



