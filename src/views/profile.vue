<template>
  <div class="profile">
    <navigation />
    <div class="row grey darken-4">
      <div class="container">
        <div class="col s12 m10 offset-m1 hero white-text">
          <div class="lead"><span>{{user.username}},</span>
            <p>Welcome back to Zano.life</p>
          </div>
          <div class="lead"><span>Account Information</span>
            <div class="row accountInfo">
              <div class="col s12 m6 data"><b>Email:</b> {{user.email}}</div>
              <div class="col s12 m6 data"><b>Confirmed?</b> {{confirmationText}}</div>
              <div class="col s12 data address"><b>Zano Address:</b> {{user.paymentAddress}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col s12 m6" style="padding-left: 0px; padding-right: 0px;">
            <div class="col s12 m6">
              <div class="card-panel light-blue white-text">
                <div class="cardCount center-align" id="listing">
                  Listed
                  <p id="listingCount">{{listingCount}}</p>
                  <div class="loading-spinner center-align" id="listed-spinner">
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
            <div class="col s12 m6">
              <div class="card-panel light-blue white-text">
                <div class="cardCount center-align">
                  Sales
                  <p id="saleCount">{{salesCount}}</p>
                  <div class="loading-spinner center-align" id="sale-spinner">
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
            <div class="col s12">
              <div class="card-panel light-blue white-text">
                <div class="cardCount center-align">
                  Fees paid
                  <p>$0 <span>0 ZANO</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12 m6" style="padding-left: 0px; padding-right: 0px;">
            <div class="col s12">
              <div class="card-panel purple accent-2 white-text">
                <div class="cardCount">
                  Create listing <i class="material-icons">open_in_new</i>
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
import $ from 'jquery';
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
      confirmationText: "",
      listingCount: 0,
      salesCount: 0
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
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.go();
    },
    async getListingsAndSales() {
      try {
        let response = await this.$http.post("/user/me/listings", {
            ownerAddress: this.user.paymentAddress
        });

        self.count = 0;
        this.listingCount = response.data.length;
        response.data.forEach(function(listing) {
          listing.purchasers.forEach(function() {
            console.log("Sale found")
            self.count++;
          })
        });
        this.salesCount = self.count;

        $("#listingCount").toggle();
        $("#saleCount").toggle();
        $("#listed-spinner").toggle();
        $("#sale-spinner").toggle();
      } catch (err) {
        this.$swal("Error", err, "error");
        console.log(err.response);
      }
    }
  },
  mounted() {
    this.getUserDetails();
    this.getListingsAndSales();
  }
};
</script>
<style scoped>
  .zano-nav-logo {
    height: 32px;
    margin-top: 16px;
    margin-right: 10px;
  }

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

  .content {
  margin-top: 30px;
  }

  .accountInfo {
    font-size: 14pt;
    margin-top: -5px;
  }

  .accountInfo .data {
    margin-top: 15px;
  }

  .accountInfo .address {
    word-break: break-word;
  }

  .cardCount {
    font-size: 16pt;
    font-weight: bold;
  }

  .cardCount i {
    float: right;
    font-size: 24pt;
  }

  .cardCount p {
    margin: 0px;
    font-size: 26pt;
  }

  .cardCount p span {
    font-weight: normal;
    font-size: 14pt;
  }

  p#listingCount, p#saleCount {
    display: none;
  }

  .loading-spinner {
    left: 0px;
  }

  .spinner {
    margin: 10px auto;
    margin-bottom: -5.5px;
    height: 40px;
    width: 40px;
  }

  .spinner-custom {
    border-color: #18ffff;
  }
</style>
