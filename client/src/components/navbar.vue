<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <button class="btn btn-success m-1" @click="addProduct">
            <i class="fas fa-plus"></i> Add Product
          </button>
        </li>
      </ul>
    </div>
    <div class="mx-auto order-0">
      <a class="navbar-brand mx-auto" href="#">E-Commerce CMS</a>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <button class="btn btn-warning m-1" @click="logout">
            <i class="fas fa-sign-out-alt"></i> Log Out
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  methods: {
    logout() {
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
        title: 'Signed out successfully',
      });
      localStorage.removeItem('token');
      this.$router.push({ path: '/login' });
      this.$store.dispatch('logout');
    },
    addProduct() {
      this.$router.push({ path: '/addproduct' });
    },
  },
};
</script>
