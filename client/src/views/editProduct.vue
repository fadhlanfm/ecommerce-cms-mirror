<template>
  <div>
    <EditProduct
      @editProduct="editProduct"
    />
  </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2';
import EditProduct from '../components/editProductCard.vue';

const baseUrl = 'https://murmuring-atoll-45586.herokuapp.com';
export default {
  components: {
    EditProduct,
  },
  methods: {
    editProduct(payload) {
      this.$store.commit('loading', true);
      const obj = {
        name: payload.name,
        image_url: payload.image_url,
        price: payload.price,
        stock: payload.stock,
      };
      axios({
        method: 'PUT',
        url: `${baseUrl}/products/${payload.id}`,
        data: obj,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(() => {
          this.$store.commit('loading', false);
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
            title: 'Your product have been edited',
          });
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
