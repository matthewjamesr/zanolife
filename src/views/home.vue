<template>
  <div class="grey darken-4">
    <nav>
      <div class="nav-wrapper deep-purple accent-4">
        <a href="#" class="brand-logo left">ZanoLife</a>
        <ul id="nav-mobile" class="right show-on-small">
          <li v-if="user.loggedIn == false"><router-link class="waves-effect waves-light btn purple accent-2" to="/login">Login</router-link></li>
          <li v-if="user.loggedIn == true"><a v-on:click="logUserOut()" class="waves-effect waves-light btn purple accent-2">Sign out</a></li>
        </ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="https://zano.org"><img class="zano-nav-logo" src="../assets/zano-logo.svg" /><span style="position: relative; top: -3px;">Zano.org</span></a></li>
        </ul>
      </div>
    </nav>
    <div class="row">
      <div class="container grey darken-4">
        <div class="col s12 m8 offset-m2 hero white-text">
          <div class="lead"><span>Zano Life</span> allows users to buy and sell digital content for ZANO,
            directly from the browser and without needing to utilize Zano Core.
          </div>
          <CurrentOffers />
        </div>
      </div>
    </div>
    <div class="row blue darken-2 white-text">
      <div class="container">
        <div class="content hero col s12 m8 offset-m2">
          <div class="lead"><span>Get smart</span> by <a href="https://www.publish0x.com/blockchain-research-and-development/building-a-decentralized-private-web-based-marketplace-on-za-xgpdkyr" target="_blank">learning</a> more about listing
            with Zano Life.
          </div>
          <div class="lead" style="margin-top: 15px;"><span>Get started</span> by registering an account,
            funding with Zano, and listing your digital asset.
          </div>
          <p v-if="user.loggedIn == false" class="center-align" style="margin-top: 60px;"><router-link class="waves-effect waves-light btn-large purple accent-2" to="/register">Create account</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueJwtDecode from "vue-jwt-decode";
  import CurrentOffers from "../components/zano/CurrentOffers";
  export default {
    data() {
      return {
        user: {
          loggedIn: false
        }
      };
    },
    components: {
      'CurrentOffers': CurrentOffers
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
        this.$router.go();
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

  .hero {
  margin: 75px 50px 75px 50px;
  border-radius: 8px;
  }

  .hero .lead {
  font-size: 16pt;
  }

  .hero .lead a {
  position: relative;
  letter-spacing: 1px;
  font-weight: bold;
  text-decoration: underline;
  text-underline-position: under;
  }

  .hero .lead a:link {
  color: #18ffff;
  }

  .hero .lead a:visited {
  color: #18ffff;
  }

  .hero .lead a:hover {
  color: #e040fb;
  }

  .hero .lead span {
  font-size: 24pt;
  font-weight: bold;
  margin-right: 10px;
  }

  .hero p {
  font-size: 16pt;
  margin: 30px 0px 0px 0px;
  }

  .hero p b {
  font-size: 20pt;
  }

  .content {
  margin-top: 30px;
  }
</style>
