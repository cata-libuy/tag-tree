<template>
  <div id="app">
    <add-link> </add-link>
    <router-view></router-view>
  </div>
</template>

<script>
import forceComponent from './components/force'
import AddLink from './components/addLink'

export default {
  name: 'app',
  components: {
    forceComponent,
    AddLink
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
