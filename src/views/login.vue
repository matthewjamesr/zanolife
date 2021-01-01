<template>
  <div class="login">
    <navigation />
    <login />
  </div>
</template>
<script>
import login from "@/components/auth/login";
import Navigation from "@/components/shared/navigation";
export default {
  components: {
    login,
    Navigation
  }
};
</script>
<style scoped>
  .zano-nav-logo {
    height: 32px;
    margin-top: 16px;
    margin-right: 10px;
  }
</style>
