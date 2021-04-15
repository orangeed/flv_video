<template>
  <div id="app">
    <!-- <index /> -->
    <flv />
  </div>
</template>

<script>
// import index from "./views/index1.vue";
import Flv from './views/flv.vue';

export default {
  name: "App",
  components: {
    // index,
    Flv
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
