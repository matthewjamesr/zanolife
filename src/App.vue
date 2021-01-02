<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
window.$ = window.jQuery = require('jquery');
window.materialize = require('materialize-css');
export default {
  mounted () {
    window.materialize.AutoInit()
  }
}
</script>
