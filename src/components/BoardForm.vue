<template lang="pug">
b-modal(ref="formModal", :title="action === 'create' ? 'Crear Colección' : 'Editar Colección'", @ok="onSubmit", @hidden="callback")
  b-form
    b-form-group(label="nombre", label-for="name")
      b-form-input(v-model="name", type="text", placeholder="Ej: Mi nueva colección")
      b-alert(variant="danger", :show="nameError") Por favor ingresa un nombre
    b-form-group(label="descripción", label-for="description")
      b-form-input(v-model="description", type="text", placeholder="Descripción breve (opcional)")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BoardForm',
  props: ['action', 'callback', 'show'],
  data () {
    return {
      name: '',
      description: '',
      nameError: false,
      submitAttempted: false
    }
  },
  methods: {
    ...mapActions(['createBoard']),
    cleanForm () {
      this.name = ''
      this.description = ''
      this.nameError = false
      this.submitAttempted = false
    },
    onSubmit () {
      this.submitAttempted = true
      if (this.nameError) {
        return
      }
      if (this.action === 'create') {
        this.createBoard({ name: this.name, description: this.description })
        this.callback()
        this.cleanForm()
      }
    }
  },
  watch: {
    name: function () {
      if (this.name.length === 0 && this.submitAttempted) {
        return this.nameError = true
      }
    },
    show: function (val) {
      this.cleanForm()
      if (val) {
        return this.$refs.formModal.show()
      }
      this.$refs.formModal.hide()
    }
  },
  mounted () {
    this.cleanForm()
    if (this.$refs.formModal) {
      if (this.show) {
        return this.$refs.formModal.show()
      }
      this.$refs.formModal.hide()
    }
  }
}
</script>

<style lang="css">
</style>
