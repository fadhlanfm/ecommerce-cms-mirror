import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login.vue';
import Home from '../views/home.vue';
import AddProduct from '../views/addProduct.vue';
import EditProduct from '../views/editProduct.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/addproduct',
    name: 'addProduct',
    component: AddProduct,
    meta: { requiresAuth: true },
  },
  {
    path: '/editproduct',
    name: 'editProduct',
    component: EditProduct,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
