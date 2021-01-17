<template>
  <div>
    <navigation />
    <div class="row grey darken-4">
      <div class="container">
        <div class="col s12 m10 offset-m1 hero white-text">
          <img v-if="listing.productPhotos != null" class="responsive-img lead-img left" :src="'http://localhost/uploads/' + listing.productPhotos[0]" />
          <div class="lead right"><span>{{listing.price}} ZANO</span></div>
          <div class="lead left title" style="clear: left;"><span>{{listing.title}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueJwtDecode from "vue-jwt-decode";
  import Navigation from "@/components/shared/navigation";

  export default {
    components: {
      Navigation
    },
    data() {
      return {
        user: {
          loggedIn: false
        },
        listing: {}
      }
    },
    methods: {
      getUserDetails() {
        let token = localStorage.getItem("jwt");
        if (token != null) {
          let decoded = VueJwtDecode.decode(token);
          this.user = decoded;
          this.user.loggedIn = true;

          if (this.user.accountConfirmed) {
            this.confirmationText = "Good to go!";
          } else {
            this.confirmationText = "Not yet, check your email";
          }
        } else {
          this.user.loggedIn = false;
        }
      },
      async getUserListings() {
        try {
          let response = await this.$http.get("/listing/" + this.$route.params.id);
          this.listing = response.data.listing;
        } catch (err) {
          this.$swal("Error", err, "error");
          console.log(err.response);
        }
      }
    },
    mounted() {
      this.getUserDetails();
      this.getUserListings();
    }
  }
</script>
<style scoped>
  .hero {
  margin: 40px 50px 35px 50px;
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
  font-size: 20pt;
  font-weight: bold;
  margin-right: 10px;
  }

  .hero p {
  font-size: 16pt;
  margin: 0px 0px 15px 0px;
  }

  .hero p b {
  font-size: 20pt;
  }

  .hero .title {
    word-break: break-word;
  }

  .hero .lead-img {
    margin-bottom: 30px;
    width: 100%;
    max-height: 250px;
  }
  </style>
