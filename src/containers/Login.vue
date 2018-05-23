<template lang="pug">
.login
  h1 Ingresa o
    router-link.create-account(to="/register")  crea una cuenta
  b-form
    b-form-group(label="email", label-for="email")
      b-form-input(type="email", placeholder="ejemplo@mail.com")
    b-form-group(label="password")
      b-form-input(type="password")
    b-button(type="submit") Entrar
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss">
.login
  form {
    width: 50%;
    margin: 30px auto;
    .btn {
      width: 100%;
    }
  }
  a {
    &.create-account {
      font-size: 1.5rem;
      text-decoration: underline !important;
    }
  }
</style>
