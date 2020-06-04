<template>
<div>
  <div class="text-center">
    <h1>Edit Your Product</h1>
  </div>
  <div class="text-center">
    <Loading v-if="loading" />
  </div>
  <div class="container" v-if="!loading">
    <form @submit.prevent="editProduct">
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
</div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './loading.vue';

export default {
  computed: mapState(['editData', 'loading']),
  components: {
    Loading,
  },
  data() {
    return {
      id: null,
      name: '',
      image_url: '',
      price: '',
      stock: '',
    };
  },
  created() {
    if (this.editData === null) {
      this.$router.push({
        path: '/',
      });
    } else {
      this.id = this.editData.id;
      this.name = this.editData.name;
      this.image_url = this.editData.image_url;
      this.price = this.editData.price;
      this.stock = this.editData.stock;
    }
  },
  methods: {
    editProduct() {
      const obj = {
        id: this.id,
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      };
      this.$emit('editProduct', obj);
    },
    backHome() {
      this.$router.push({
        path: '/',
      });
    },
  },
};
</script>
