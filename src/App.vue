<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <force-component> </force-component>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import forceComponent from './components/force'

export default {
  name: 'app',
  components: {
    HelloWorld,
    forceComponent
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
