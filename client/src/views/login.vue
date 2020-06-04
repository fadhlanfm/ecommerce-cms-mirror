<template>
<div class="container text-center" style="max-width: 50%;">
  <h1>Login to E-Commerce CMS</h1>
  <loading v-if="loading"/>
  <LoginCard @login="login" />
</div>
</template>

<script>

import { mapState } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoginCard from '../components/loginCard.vue';
import Loading from '../components/loading.vue';

const baseUrl = 'https://murmuring-atoll-45586.herokuapp.com';
export default {
  components: {
    LoginCard,
    Loading,
  },
  created() {
    this.$store.commit('loading', false);
  },
  computed: mapState(['loading']),
  methods: {
    login(payload) {
      const obj = {
        email: payload.email,
        password: payload.password,
      };
      this.$store.commit('loading', true);
      axios({
        method: 'POST',
        url: `${baseUrl}/users/login`,
        data: obj,
      }).then(({ data }) => {
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
          title: 'Signed in successfully',
        });
        this.$store.commit('loading', false);
        localStorage.setItem('token', data.token);
        this.$router.push({ path: '/' });
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
