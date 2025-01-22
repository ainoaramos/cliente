<template>
  <div>
    <h1>{{ isEdit ? 'Editar Libro' : 'Añadir Libro' }}</h1>
    <Form @submit="submitForm" :validation-schema="schema" class="add-book-form">
      <div>
        <label for="id">ID:</label>
        <Field name="id" as="input" v-model="book.id" type="text" id="id" :disabled="isEdit" />
        <ErrorMessage name="id" />
      </div>
      <div>
        <label for="module">Módulo:</label>
        <Field name="module" as="select" v-model="book.module" id="module">
          <option disabled value="">-Seleccione un módulo-</option>
          <option v-for="module in modules" :key="module.id" :value="module.cliteral">
            {{ module.cliteral }}
          </option>
        </Field>
        <ErrorMessage name="module" />
      </div>
      <div>
        <label for="publisher">Editorial:</label>
        <Field name="publisher" as="input" v-model="book.publisher" type="text" id="publisher" />
        <ErrorMessage name="publisher" />
      </div>
      <div>
        <label for="price">Precio:</label>
        <Field name="price" as="input" v-model="book.price" type="number" id="price" />
        <ErrorMessage name="price" />
      </div>
      <div>
        <label for="pages">Páginas:</label>
        <Field name="pages" as="input" v-model="book.pages" type="number" id="pages" />
        <ErrorMessage name="pages" />
      </div>
      <div>
        <label for="comments">Comentarios:</label>
        <Field name="comments" as="textarea" v-model="book.comments" id="comments"></Field>
      </div>
      <div>
        <label>Estado:</label>
        <div>
          <Field name="status" type="radio" value="Nuevo" v-model="book.state" /> Nuevo
          <Field name="status" type="radio" value="Usado" v-model="book.state" /> Usado
          <Field name="status" type="radio" value="Malo" v-model="book.state" /> Malo
        </div>
        <ErrorMessage name="status" />
      </div>
      <div>
        <button type="submit">{{ isEdit ? 'Actualizar' : 'Añadir' }}</button>
        <button type="button" @click="resetForm">Reset</button>
      </div>
    </Form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
  props: {
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
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

    const schema = yup.object({
      id: yup.string().required('El ID es obligatorio'),
      module: yup.string().required('El módulo es obligatorio'),
      publisher: yup.string().required('La editorial es obligatoria'),
      price: yup
        .number()
        .required('El precio es obligatorio')
        .min(0, 'El precio debe ser mayor o igual a 0'),
      pages: yup
        .number()
        .required('Las páginas son obligatorias')
        .integer('Las páginas deben ser un número entero')
        .min(0, 'Las páginas deben ser mayores o iguales a 0'),
      status: yup.string().required('El estado es obligatorio'),
    });

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
        if (response.data) {
          book.value = response.data;
        }
      } catch (error) {
        console.error('Error al cargar el libro:', error);
      }
    };

    const submitForm = async (values) => {
      try {
        if (props.isEdit) {
          await axios.put(`http://localhost:3000/books/${values.id}`, values);
        } else {
          await axios.post('http://localhost:3000/books', values);
        }
        router.push('/');
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
      schema,
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





