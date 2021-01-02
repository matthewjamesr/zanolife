<template>
  <div>
    <nav>
      <div class="nav-wrapper deep-purple accent-4">
        <router-link class="brand-logo left" to="/">ZanoLife</router-link>
        <ul id="nav-mobile" class="right show-on-small">
          <li v-if="!user.loggedIn"><router-link class="waves-effect waves-light btn purple accent-2" to="/login">Login</router-link></li>
          <li v-if="user.loggedIn && currentRoute != 'profile'"><router-link to="/me">My Profile</router-link></li>
          <li v-if="user.loggedIn && currentRoute == 'profile'" class="active"><router-link to="/me">My Profile</router-link></li>
          <li v-if="user.loggedIn"><a v-on:click="logUserOut()" class="waves-effect waves-light btn purple accent-2">Sign out</a></li>
        </ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down" style="margin-bottom: 0px;">
          <li><a href="https://zano.org" target="_blank"><img class="zano-nav-logo" src="../../assets/zano-logo.svg" /><span style="position: relative; top: -3px;">Zano.org</span></a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "Navigation",
  data() {
    return {
      user: {
        loggedIn: false
      }
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      if (token != null) {
        let decoded = VueJwtDecode.decode(token);
        this.user = decoded;
        this.user.loggedIn = true;
      } else {
        this.user.loggedIn = false;
      }
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      if (this.currentRoute != "home") {
        this.$router.push("/");
      } else {
        this.$router.go();
      }

    }
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    }
  },
  mounted() {
    this.getUserDetails();
  }
};
</script>
<style scoped>
  .zano-nav-logo {
    position: relative;
    top: 13px;
    height: 40px;
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
