import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '../routers/index';

const baseUrl = 'https://murmuring-atoll-45586.herokuapp.com';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productData: [],
    editData: null,
    loading: false,
  },
  mutations: {
    getData(state, data) {
      state.productData = data;
    },
    logout(state) {
      state.productData = [];
    },
    editData(state, data) {
      state.editData = data;
    },
    loading(state, data) {
      state.loading = data;
    },
  },
  actions: {
    getData({ commit, state }) {
      state.loading = true;
      axios({
        method: 'GET',
        url: `${baseUrl}/products`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({ data }) => {
          state.loading = false;
          data.sort((a, b) => b.id - a.id);
          commit('getData', data);
        }).catch((err) => {
          state.loading = false;
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
            onClose: () => {
              localStorage.removeItem('token');
              router.push({ path: '/login' });
            },
          });
        });
    },
    logout(context) {
      context.commit('logout');
    },
    editData(context, data) {
      context.commit('editData', data);
    },
  },
  modules: {
  },
});
