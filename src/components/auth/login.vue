<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="loginUser"
        >
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="login.email"
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="login.password"
          />
          <p>
            Dont have an account??<router-link to="/register"
              >click here</router-link
            >
          </p>
          <!-- Sign in button -->
          <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Sign in
            </button>
          </center>
        </form>
      </div>
    </div>
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
        this.$swal("Error", "Something Went Wrong", "error");
        console.log(err.response);
      }
    }
  }
};
</script>
<style scoped>
  .loading {
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
    display: none;
    position: absolute;
    top: 45%;
    left: 0px;
    width: 100%;
  }

  .spinner {
    display: ;
    margin: 0px auto;
  }
</style>
