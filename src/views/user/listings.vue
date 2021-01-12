<template>
  <div class="profile">
    <navigation />
    <div class="row grey darken-4">
      <div class="container">
        <div class="col s12 m10 offset-m1 hero white-text">
          <div class="refresh valign-wrapper right grey lighten-3 black-text waves-effect waves-dark hide-on-small-only" v-on:click="getUserListings">
            <a class="tooltipped" data-position="bottom" data-tooltip="Resfresh data">
              <i class="material-icons black-text">refresh</i>
            </a>
          </div>
          <div class="lead"><span>{{user.username}},</span>
            <p>Welcome back to Zano.life</p>
          </div>
          <div class="lead"><span>Listing Information</span>
            <div class="row accountInfo">
              <div class="col s12 m6 data">
                <b class="left">Active:</b> <span id="activeCount">{{listings.active}}</span>
                <div class="loading-spinner left-align" id="active-spinner">
                  <div class="spinner preloader-wrapper big active">
                    <div class="spinner-layer spinner-custom">
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
              <div class="col s12 m6 data">
                <b class="left">Pending:</b> <span id="pendingCount">{{listings.pending}}</span>
                <div class="loading-spinner left-align" id="pending-spinner">
                  <div class="spinner preloader-wrapper big active">
                    <div class="spinner-layer spinner-custom">
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col s12" v-for="(listing, index) in listings.data" :key="index">
            <div class="card-panel listing grey darken-4 white-text">
              <div class="row mainRow">
                <!--<div class="col m2 hide-on-small-only" v-if="listing.productPhotos != null">
                  <img class="primaryImage responsive-img" :src="'https://api.zano.life/uploads/' + listing.productPhotos[0]">
                </div>-->
                <div class="col s12">
                  <div class="row">
                    <div class="col s12">
                      <div class="title" style="margin-bottom: 0px;">{{listing.title}}</div>
                      <p>{{listing.description}}</p>
                    </div>
                  </div>
                  <div class="row mainRow details">
                    <div class="col s12 m8">
                      <ul style="margin-top: 0px;" v-if="listing.feePaid && listing.confirmations >= 10">
                        <li><b>Confirmed:</b> Yes</li>
                      </ul>
                      <ul style="margin-top: 0px;" v-if="!listing.feePaid || listing.confirmations < 10">
                        <li class="left"><b>Confirmed:</b> No!</li>
                        <br>
                        <li v-if="!listing.feePaid" class="left" style="word-break: break-word;"><b>Payment address (0.05 ZANO Remaining):</b> {{listing.payment_address}} </li>
                        <li v-if="listing.feePaid && listing.confirmations < 10">{{listing.confirmations}} of 10 confirmations</li>
                      </ul>
                      <ul style="display: inline;">
                        <li><b>Price:</b> ${{listing.price}}</li>
                        <li><b>Completed Sales:</b> {{listing.purchases.count}}</li>
                        <li><b>Pending Sales:</b> {{listing.purchases.pending}}</li>
                      </ul>
                    </div>
                    <div class="s12 m4">
                      <vue-qrcode v-if="!listing.feePaid" class="hide-on-small-only qrcode" v-bind:value="listing.payment_address" scale="3" margin="2"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col s12 actions">
                  <div class="col s12">
                    <router-link class="btn waves-effect waves-light btn purple accent-2 right" :to="'/listings/'+listing._id+'/edit'">Edit</router-link>
                    <button class="btn waves-effect waves-light btn red accent-3 right" v-on:click="deleteListing(listing._id)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import VueQrcode from 'vue-qrcode';
import Navigation from "@/components/shared/navigation";

export default {
  components: {
    Navigation,
    VueQrcode
  },
  data() {
    return {
      user: {
        loggedIn: false
      },
      listings: {
        data: [],
        active: 0,
        pending: 0
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
      window.$("#activeCount").css("display", "none");
      window.$("#pendingCount").css("display", "none");
      window.$("#active-spinner").css("display", "block");
      window.$("#pending-spinner").css("display", "block");

      this.listings.active = 0;
      this.listings.pending = 0;

      try {
        let response = await this.$http.post("/user/me/listings", {
            ownerAddress: this.user.paymentAddress
        });

        var self = this;
        response.data.forEach(function(listing) {
          if (listing.feePaid == true && listing.confirmations >= 10) {
            self.listings.active++;
          } else {
            self.listings.pending++;
          }
        });

        this.listings.data = response.data;

        window.$("#activeCount").css("display", "block");
        window.$("#pendingCount").css("display", "block");
        window.$("#active-spinner").css("display", "none");
        window.$("#pending-spinner").css("display", "none");
      } catch (err) {
        this.$swal("Error", err, "error");
        console.log(err.response);
      }
    },
    async deleteListing(id) {
      try {
        console.log(id)
        let response = await this.$http.post(`/listing/${id}/delete`, {
            ownerAddress: this.user.paymentAddress
        });

        if (response.status == 200) {
          this.$router.go();
        }
        if (response.status == 404) {
          this.$swal("Error", 'Something went wrong', "error");
        }
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
};
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

  .accountInfo {
    font-size: 14pt;
    margin-top: -5px;
  }

  .accountInfo .data {
    margin-top: 15px;
  }

  .accountInfo .data span {
    float: left;
    margin: -8px 0px 0px 10px;
  }

  .spinner {
    margin: 8px 0px 0px 10px;
    height: 17px;
    width: 17px;
  }

  .spinner-custom {
    border-color: #18ffff;
  }

  .loading {
    z-index: +100;
    display: none;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.7;
  }

  .refresh {
    padding: 5px 5px 0px 5px;
    border-radius: 50%;
  }

  .refresh i {
    font-size: 26pt;
  }

  .listing .mainRow {
    margin-bottom: 0px;
  }

  .listing .primaryImage {
    border-radius: 5px;
  }

  .listing .title {
    font-size: 20pt;
    font-weight: bold;
  }

  .listing p {
    margin: 0px;
    font-size: 14pt;
  }

  .listing ul li {
    display: inline;
    margin-right: 15px;
    font-size: 12pt;
    margin-bottom: 10px;
  }

  .qrcode {
    width: 150px;
  }

  .actions {
    border-top: 1px solid #424242;
    margin-top: 25px;
    padding: 15px 0px 15px 0px;
    margin-bottom: -40px;
  }

  .actions .btn {
    margin-left: 10px;
  }
</style>
