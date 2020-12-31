<template>
  <div>
    <nav>
      <div class="nav-wrapper deep-purple accent-4">
        <a href="#" class="brand-logo left">ZanoLife</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="https://zano.org"><img class="zano-nav-logo" src="../assets/zano-logo.svg" /><span style="position: relative; top: -10px;">Zano.org</span></a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Navigation",
};
</script>
<style scoped>
  .zano-nav-logo {
    height: 32px;
    margin-top: 16px;
    margin-right: 10px;
  }
  .loading {
    z-index: +1;
    display: none;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.7;
  }

  .loading-spinner {
    z-index: +2;
    display: none;
    position: absolute;
    top: 45%;
    left: 0px;
    width: 100%;
  }

  .spinner {
    margin: 0px auto;
  }

  .container {
    margin-top: 75px;
    border-radius: 6px;
    padding: 0px;
  }

  .bevel {
    padding: 30px 40px 0px 40px;
    border-radius: 6px;
  }

  p.lead {
    font-size: 18pt;
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: -10px;
  }

  input {
    color: #fff;
  }

  button {
    width: 100%;
  }
</style>
