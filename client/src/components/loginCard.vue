<template>
<div class="container">
    <form @submit.prevent="login">
    <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" v-model="email" >
        <small class="form-text text-muted">Role Admin: admin@admin.com</small>
        <small class="form-text text-muted">Role User: user@user.com</small>
    </div>
    <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="password">
          <small class="form-text text-muted">Role Admin: admin</small>
          <small class="form-text text-muted">Role User: user</small>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: 'admin@admin.com',
      password: 'admin',
    };
  },
  methods: {
    login() {
      const data = { email: this.email, password: this.password };
      this.$emit('login', data);
    },
  },
};
</script>
