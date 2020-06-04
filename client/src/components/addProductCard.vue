<template>
<div>
  <div class="text-center">
    <Loading v-if="loading" />
  </div>
  <form @submit.prevent="addProduct" v-if="!loading">
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" v-model="name">
    </div>
    <div class="form-group">
      <label>Image Url</label>
      <input type="text" class="form-control" v-model="image_url">
    </div>
    <div class="form-group">
      <label>Price</label>
      <input type="number" min="1" class="form-control" v-model="price">
    </div>
    <div class="form-group">
      <label>Stock</label>
      <input type="number" min="1" class="form-control" v-model="stock">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <button class="btn btn-danger m-2" @click.prevent="backHome">Cancel</button>
  </form>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './loading.vue';

export default {
  components: {
    Loading,
  },
  computed: mapState(['loading']),
  data() {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: '',
    };
  },
  methods: {
    addProduct() {
      const obj = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      };
      this.$emit('addProduct', obj);
    },
    backHome() {
      this.$router.push({
        path: '/',
      });
    },
  },
};
</script>
