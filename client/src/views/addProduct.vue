<template>
<div>
  <Navbar />
  <div class="text-center m-2">
    <h1>Add a New Product</h1>
  </div>
  <div class="container">
    <AddProductCard
      @addProduct="addProduct"
    />
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/navbar.vue';
import AddProductCard from '../components/addProductCard.vue';

const baseUrl = 'https://murmuring-atoll-45586.herokuapp.com';
export default {
  components: {
    Navbar,
    AddProductCard,
  },
  methods: {
    addProduct(payload) {
      this.$store.commit('loading', true);
      axios({
        method: 'POST',
        url: `${baseUrl}/products`,
        headers: {
          token: localStorage.getItem('token'),
        },
        data: payload,
      })
        .then(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Your product have been added',
          });
          this.$store.commit('loading', false);
          this.$router.push({
            path: '/',
          });
        }).catch((err) => {
          this.$store.commit('loading', false);
          let msg = null;
          if (err.response) {
            if (Array.isArray(err.response.data.msg)) {
              msg = err.response.data.msg.join('<br>');
            } else {
              msg = err.response.data.msg;
            }
          } else if (err.request) {
            msg = err.request;
          } else {
            msg = err.message;
          }
          Swal.fire({
            icon: 'error',
            title: 'Error',
            html: `${msg}`,
          });
        });
    },
  },
};
</script>
