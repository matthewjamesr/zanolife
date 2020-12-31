<template>
  <div class="container">
    <form @submit.prevent="loginUser">
      <div class="row">
        <div class="col s12 m8 l6 offset-m2 offset-l3 grey darken-4 white-text bevel z-depth-2">
          <div class="row">
            <div class="col">
              <p class="lead">Welcome back!</p>
              <p>Sign-in to your Zano.life account</p>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="text" class="validate" v-model="login.email">
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="password" type="password" v-model="login.password">
              <label for="password">Password</label>
            </div>
          </div>
          <div class="row">
            <div class="col s12 m8 l6 offset-m2 offset-l3">
              <button class="btn purple accent-2 waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col s12 center-align">
              <p>Not experienced the power of Zano.life yet? <router-link to="/register">Register now</router-link>.</p>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="loading">
    </div>
    <div class="loading-spinner center-align">
      <div class="spinner preloader-wrapper big active">
        <div class="spinner-layer spinner-red-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      $(".loading").toggle();
      $(".loading-spinner").toggle();
      try {
        let response = await this.$http.post("/user/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          this.$swal("Success", "Login Successful", "success");
          this.$router.push("/");
        }
      } catch (err) {
        $(".loading").toggle();
        $(".loading-spinner").toggle();
        this.$swal("Error", "Something Went Wrong", "error");
        console.log(err.response);
      }
    }
  }
};
</script>
<style scoped>
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
