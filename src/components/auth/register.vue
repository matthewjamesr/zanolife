<template>
  <div class="container">
    <form @submit.prevent="registerUser">
      <div class="row">
        <div class="col s12 l8 offset-l2 grey darken-4 white-text bevel z-depth-2">
          <div class="row">
            <div class="col">
              <p class="lead">Get started</p>
              <p>Start your journey with Zano.life by signing-up below</p>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 m6">
              <input id="username" type="text" class="validate" v-model="register.username">
              <label for="username">Username</label>
            </div>
            <div class="input-field col s12 m6">
              <input id="email" type="text" class="validate" v-model="register.email">
              <label for="email">Email</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="paymentAddress" type="text" v-model="register.paymentAddress">
              <label for="paymentAddress">ZANO Payment / Payout Address</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="password" type="password" v-model="register.password">
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
              <p>Already have a Zano.life account? <router-link to="/login">Login now</router-link>.</p>
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
      register: {
        username: "",
        email: "",
        paymentAddress: "",
        password: ""
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        $(".loading").toggle();
        $(".loading-spinner").toggle();
        let response = await this.$http.post("/user/register", this.register);
        console.log(response);
        let token = response.data.token;
        if (token) {
          localStorage.setItem("jwt", token);
          this.$router.push("/");
          this.$swal("Success", "Registration Was successful", "success");
        } else {
          $(".loading").toggle();
          $(".loading-spinner").toggle();
          this.$swal("Error", "Something Went Wrong", "error");
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          $(".loading").toggle();
          $(".loading-spinner").toggle();
          this.$swal("Error", error.data.message, "error");
        } else {
          $(".loading").toggle();
          $(".loading-spinner").toggle();
          this.$swal("Error", error.data.err.message, "error");
        }
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
    margin-top: 25px;
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
