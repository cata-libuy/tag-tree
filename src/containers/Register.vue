<template lang="pug">
.register
  h1 Crea una cuenta
  b-form
    b-form-group(label="email", label-for="email")
      b-form-input(type="email", v-model="email", placeholder="ejemplo@mail.com")
      b-alert(variant="danger", :show="emailError") Por favor ingresa un email correcto
    b-form-group(label="password")
      b-form-input(type="password", v-model="password")
      b-alert(variant="danger", :show="passwordError") La password debe tener al menos 6 caracteres
    b-form-group(label="repite password")
      b-form-input(type="password", v-model="passwordRepeat")
      b-alert(variant="danger", :show="repeatPasswordError") Las passwords no coinciden
    b-button(@click="this.registerUser", :disabled="!this.formValid") Enviar
    p.back-to-login
      router-link(to="/login") O ingresa si ya tienes

    //- Modal
    b-modal(ref="errorModal", hide-footer, title="oops")
      .d-block.text-center {{ errorMsg }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Register',
  data: function () {
    return {
      email: '',
      password: '',
      passwordRepeat: '',
      errorMsg: 'Error'
    }
  },
  computed: {
    ...mapGetters([ 'registerError', 'user' ]),
    emailError () {
      return this.email.length > 0 && (this.email.indexOf('@') < 0 || this.email.indexOf('.') < 0 || this.email.length < 4)
    },
    passwordError () {
      return this.password.length > 0 &&this.password.length < 6
    },
    repeatPasswordError () {
      return this.password.length > 0 && this.passwordRepeat !== this.password
    },
    formValid () {
      return this.email.length > 0 && this.password.length > 0 && this.passwordRepeat.length > 0 && !this.emailError && !this.passwordError && !this.repeatPasswordError
    }
  },
  methods: {
    ...mapActions([ 'register' ]),
    registerUser () {
      const userData = { email: this.email, password: this.password }
      if (this.formValid) {
        this.register(userData)
      }
    },
    clearForm () {
      this.email = ''
      this.password = ''
      this.passwordRepeat = ''
      this.alertShown = false
    },
  },
  watch: {
    registerError: function (message) {
      const self = this
      if (message) {
        self.errorMsg = message
        this.$refs.errorModal.show()
      }
    },
    user: function (userData) {
      if (userData && userData.token) {
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>

<style lang="scss">
.register {
  form {
    width: 50%;
    margin: 30px auto;
    .btn {
      width: 100%;
    }
  }
  .back-to-login {
    margin-top: 20px;
    a {
      font-size: 1rem;
      text-decoration: underline !important;
    }
  }
}
</style>
