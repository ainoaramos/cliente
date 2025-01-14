import { createRouter, createWebHistory } from 'vue-router';
import BooksList from '../components/BooksList.vue';
import AddBook from '../components/AddBook.vue';
import AppCart from '../components/AppCart.vue';
import AppAbout from '../components/AppAbout.vue';

const routes = [
  {
    path: '/',
    name: 'books',
    component: BooksList,
  },
  {
    path: '/add',
    name: 'add-book',
    component: AddBook,
    props: { isEdit: false },
  },
  {
    path: '/edit/:id',
    name: 'edit-book',
    component: AddBook,
    props: { isEdit: true },
  },
  {
    path: '/cart',
    name: 'cart',
    component: AppCart,
  },
  {
    path: '/about',
    name: 'about',
    component: AppAbout,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
