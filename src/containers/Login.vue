<template lang="pug">
.login
  h1 Ingresa o
    router-link.create-account(to="/register")  crea una cuenta
  b-form
    b-form-group(label="email", label-for="email")
      b-form-input(v-model="email", type="email", placeholder="ejemplo@mail.com")
      b-alert(variant="danger", :show="emailError") Por favor ingresa un email
    b-form-group(label="password")
      b-form-input(v-model="password", type="password")
      b-alert(variant="danger", :show="passwordError") Por favor ingresa una password
    b-button(type="submit", @click="onSubmit()", :disabled="!formValid") Entrar

  //- Modal
  b-modal(ref="errorModal", hide-footer, title="oops")
    .d-block.text-center {{ errorMsg }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: '',
      errorMsg: 'Error al iniciar sesión'
    }
  },
  computed: {
    ...mapGetters(['user', 'loginError']),
    emailError () {
      return this.email.length > 0 && (this.email.indexOf('@') < 0 || this.email.indexOf('.') < 0 || this.email.length < 4)
    },
    passwordError () {
      return this.password.length > 0 && this.password.length < 6
    },
    formValid () {
      return this.email.length > 0 && this.password.length > 0  && !this.emailError && !this.passwordError
    }
  },
  methods: {
    checkAuth() {
      if (this.user) {
        this.$router.push({ path: '/' })
      }
    },
    onSubmit() {
      if (this.formValid) {
        this.login({ email: this.email, password: this.password })
      }
    },
    ...mapActions(['login'])
  },
  created () {
    this.checkAuth()
  },
  watch: {
    user: function () {
      this.checkAuth()
    },
    loginError: function (message) {
      const self = this
      if (message) {
        self.errorMsg = message
        this.$refs.errorModal.show()
      }
    },
  }
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
