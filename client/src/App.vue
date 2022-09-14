<template>
  <table-vue />
</template>

<script>
import TableVue from './components/Table.vue';

export default {
  name: 'App',
  components: {
    TableVue
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
body {
  margin: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h1, h2, h3, h4, h5, p {
  margin: 0;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
</style>
