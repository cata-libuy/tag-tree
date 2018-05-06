<template lang="html">
  <div class="add-link">
    <b-button class="add-btn" v-if="!showForm" variant="primary" @click="() => showForm = true">+</b-button>
    <b-form v-if="showForm" class="form" inline>
      <b-form-input v-model="url" type="text" required placeholder="url ej:http://www.google.com" />
      <b-form-input v-model="title" type="text" required placeholder="url ej: Buscador de Google" />
      <b-form-input v-model="tags" type="text" required placeholder="tags ej: buscador, google" />
      <b-button variant="primary" size="sm" @click="onSubmit()">Agregar</b-button>
      <b-button variant="secondary" size="sm" @click="() => showForm = false">Cancelar</b-button>
    </b-form>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddLink',
  data () {
    return {
      showForm: false,
      url: '',
      title: '',
      tags: ''
    }
  },
  methods: {
    ...mapActions(['addLinkToCollection']),
    onSubmit () {
      if (this.validUrl(this.url)) {
        const link = {
          url: this.url,
          title: this.title,
          tags: this.tags.split(',')
        }
        this.addLinkToCollection(link)
      }
    },
    validUrl (url) {
      return true
    }
  }
}
</script>

<style lang="scss">
.add-link {
  position: fixed;
  right: 20px;
  top: 20px;
  .btn {
    &.add-btn {
      font-weight: bold;
    }
  }
  .form {
    @media (min-width: 769px) {
      input {
        font-size: 0.9rem;
        padding: 0.25rem 0.65rem;
      }
      input, button {
        margin: 0 5px;
      }
    }
  }
}
</style>
