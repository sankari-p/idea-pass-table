<template>
  <div id="app">
    <DynamicTableLoader :id="id" :header-class-name="headerClassName"/>
  </div>
</template>

<script>
import DynamicTableLoader from './components/DynamicTableLoader.vue'

export default {
  components: { DynamicTableLoader },
  data: function () {
    return {
    }
  },
  props: {
    id: {
      required: true,
      type: String
    },
    headerClassName: {
      required: false,
      type: String
    }
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
