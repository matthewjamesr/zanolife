<template>
  <div class="login">
    <nav>
      <div class="nav-wrapper deep-purple accent-4">
        <a href="#" class="brand-logo left">ZanoLife</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="https://zano.org"><img class="zano-nav-logo" src="../assets/zano-logo.svg" /><span style="position: relative; top: -10px;">Zano.org</span></a></li>
        </ul>
      </div>
    </nav>
    <login />
  </div>
</template>
<script>
import login from "@/components/auth/login";
export default {
  components: {
    login
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
