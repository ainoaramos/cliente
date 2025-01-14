<template>
  <div>
    <h1>{{ isEdit ? 'Editar Libro' : 'Añadir Libro' }}</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="id">ID:</label>
        <input v-model="book.id" type="text" id="id" :disabled="isEdit" />
      </div>
      <div>
        <label for="module">Módulo:</label>
        <select v-model="book.module" id="module" required>
          <option disabled value="">-Seleccione un módulo-</option>
          <option v-for="module in modules" :key="module.id" :value="module.cliteral">
            {{ module.cliteral }}
          </option>
        </select>
      </div>
      <div>
        <label for="publisher">Editorial:</label>
        <input v-model="book.publisher" type="text" id="publisher" required />
      </div>
      <div>
        <label for="price">Precio (€):</label>
        <input v-model="book.price" type="number" id="price" required />
      </div>
      <div>
        <label for="pages">Páginas:</label>
        <input v-model="book.pages" type="number" id="pages" required />
      </div>
      <div>
        <label for="comments">Comentarios:</label>
        <textarea v-model="book.comments" id="comments" required></textarea>
      </div>

      <div>
        <label>Estado:</label>
        <div>
          <label>
            <input type="radio" value="Nuevo" v-model="book.state" /> Nuevo
          </label>
          <label>
            <input type="radio" value="Usado" v-model="book.state" /> Usado
          </label>
          <label>
            <input type="radio" value="Malo" v-model="book.state" /> Malo
          </label>
        </div>
      </div>

      <div>
        <button type="submit">{{ isEdit ? 'Actualizar' : 'Añadir' }}</button>
        <button type="button" @click="resetForm">Reset</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
  props: {
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const book = ref({
      id: '',
      module: '',
      publisher: '',
      price: '',
      pages: '',
      comments: '',
      state: 'Nuevo', 
    });
    const modules = ref([]);
    const route = useRoute();
    const router = useRouter();

    const fetchModules = async () => {
      try {
        const response = await axios.get('http://localhost:3000/modules');
        modules.value = response.data;
      } catch (error) {
        console.error('Error al cargar los módulos:', error);
      }
    };

    const fetchBook = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        book.value = response.data;
      } catch (error) {
        console.error('Error al cargar el libro:', error);
      }
    };

    const submitForm = async () => {
      try {
        if (props.isEdit) {
          await axios.put(`http://localhost:3000/books/${book.value.id}`, book.value);
          router.push('/'); 
        } else {
          await axios.post('http://localhost:3000/books', book.value);
          router.push('/'); 
        }
      } catch (error) {
        console.error('Error al guardar el libro:', error);
      }
    };

    const resetForm = () => {
      if (props.isEdit) {
        fetchBook(route.params.id); 
      } else {
        book.value = {
          id: '',
          module: '',
          publisher: '',
          price: '',
          pages: '',
          comments: '',
          state: 'Nuevo', 
        };
      }
    };
    onMounted(() => {
      fetchModules(); 
      if (props.isEdit) {
        fetchBook(route.params.id);
      }
    });

    return {
      book,
      modules,
      submitForm,
      resetForm,
    };
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




