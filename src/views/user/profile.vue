<template>
  <div class="profile">
    <navigation />
    <div class="row grey darken-4">
      <div class="container">
        <div class="col s12 m10 offset-m1 hero white-text">
          <div class="refresh valign-wrapper right grey lighten-3 black-text waves-effect waves-dark hide-on-small-only" v-on:click="getListingsAndSales">
            <a class="tooltipped" data-position="bottom" data-tooltip="Resfresh data">
              <i class="material-icons black-text">refresh</i>
            </a>
          </div>
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
          <div class="col s12 m6 hide-on-small-only" style="padding-left: 0px; padding-right: 0px;">
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
                  Gross income
                  <p id="grossIncome">$0 <span>0 ZANO</span></p>
                  <div class="loading-spinner center-align" id="income-spinner">
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
          <div class="col s12 m6" style="padding-left: 0px; padding-right: 0px;">
            <div class="col s12">
              <a class="modal-trigger" href="#newListingModal">
                <div class="card-panel purple accent-2 white-text hoverable">
                  <div class="cardCount">
                    Create listing <i class="material-icons">open_in_new</i>
                  </div>
                </div>
              </a>
            </div>
            <div class="col s12">
              <div class="card-panel grey darken-4 white-text">
                <div class="row">
                  <div class="col s12 accountDetail">Manage account</div>
                  <div class="col s12">View more information regarding sales and
                    listings, purchases, or <router-link to="/me/edit">modify your account</router-link>.
                  </div>
                </div>
                <div class="row" style="margin-bottom: -15px;">
                  <div class="col s12 m6">
                    <button class="waves-effect waves-dark btn grey lighten-4 black-text fullWidth">Sales</button>
                  </div>
                  <div class="col s12 m6">
                    <router-link class="waves-effect waves-dark btn grey lighten-4 black-text fullWidth" to="/me/listings">Listings</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modals -->
    <div class="modal" id="newListingModal" style="width: 85%; max-width: 900px;">
      <div class="loading">
      </div>
      <div class="loading-spinner-listing center-align">
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
      <form @submit.prevent="submitListing">
        <div class="modal-content">
          <div class="row">
            <div class="col s12">
              <div class="title">Create listing</div>
              <p>Listings incur a <b>$0.99</b> fee. <b>1.5%</b> of total cost per sale. It's that simple.</p>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 m6">
              <input id="title" type="text" class="validate" v-model="newListing.title">
              <label for="title">Item title</label>
            </div>
            <div class="input-field col s12 m6">
              <i class="material-icons prefix" for="category">textsms</i>
              <div class="right-align" id="categoryHelp">See options</div>
              <input type="text" id="category" class="autocomplete" v-model="newListing.category">
              <label for="category">Category</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 m4">
              <input id="price" type="text" v-model="newListing.price">
              <label for="price">Price USD</label>
            </div>
            <div class="input-field col s12 m8">
              <textarea id="description" class="materialize-textarea" data-length="240" v-model="newListing.description"></textarea>
              <label for="description">Item description</label>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <div class="file-field input-field">
                <p>Select the file being sold. Please archive multiple-file uploads.</p>
                <div class="btn grey darken-4 white-text">
                  <span>File</span>
                  <input type="file" name="productFile" id="productFile" ref="productFile" v-on:change="handleProductFileUpload()">
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path" type="text">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <div class="file-field input-field">
                <p>Select up to four product images.</p>
                <div class="btn grey darken-4 white-text">
                  <span>File</span>
                  <input type="file" multiple name="photoFiles" id="photoFiles" ref="photoFiles" v-on:change="handlePhotoFileUpload()">
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path" type="text">
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-html="displayImageHTML">
          </div>
      </div>
      <div class="modal-footer">
        <button class="btn purple accent-2 waves-effect waves-light" type="submit" name="action">Submit
          <i class="material-icons right">send</i>
        </button>
      </div>
      </form>
    </div>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import Navigation from "@/components/shared/navigation";

window.$('#newListingModal').modal('open');

export default {
  components: {
    Navigation
  },
  data() {
    return {
      user: {
        loggedIn: false
      },
      newListing: {},
      confirmationText: "",
      listingCount: 0,
      salesCount: 0,
      productPhotos: [],
      productFile: [],
      displayImageHTML: ''
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
      window.$("#listingCount").css("display", "none");
      window.$("#saleCount").css("display", "none");
      window.$("#grossIncome").css("display", "none");
      window.$("#listed-spinner").css("display", "block");
      window.$("#sale-spinner").css("display", "block");
      window.$("#income-spinner").css("display", "block");
      try {
        let response = await this.$http.post("/user/me/listings", {
            ownerAddress: this.user.paymentAddress
        });

        self.count = 0;
        this.listingCount = response.data.length;
        response.data.forEach(function(listing) {
          self.count += listing.purchases.count;
        });
        this.salesCount = self.count;

        window.$("#listingCount").css("display", "block");
        window.$("#saleCount").css("display", "block");
        window.$("#grossIncome").css("display", "block");
        window.$("#listed-spinner").css("display", "none");
        window.$("#sale-spinner").css("display", "none");
        window.$("#income-spinner").css("display", "none");
      } catch (err) {
        this.$swal("Error", err, "error");
        console.log(err.response);
      }
    },
    async handleProductFileUpload () {
      try {
        this.newListing.productPhotos = [];
        this.productFile = this.$refs.productFile.files[0];
        let formData = new FormData();
        formData.append('file', this.productFile);
        let response = await this.$http.post('/listing/product/upload',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        )
        if (response.status == 200) {
          this.newListing.productFile = response.data.filename;
          console.log(this.newListing.productFile)
          this.$swal("Success!", `Product file uploaded`, "success");
        }
      } catch (err) {
        this.$swal("Oops!", `File type must be: .jpg . jpeg .png`, "error");
      }
    },
    async handlePhotoFileUpload () {
      try {
        this.newListing.productPhotos = [];
        this.productPhotos = this.$refs.photoFiles.files;
        let formData = new FormData();
        for (const i of Object.keys(this.productPhotos)) {
          formData.append('file', this.productPhotos[i])
        }
        let response = await this.$http.post('/listing/photos/upload',
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        )
        var self = this;
        if (response.status == 200) {
          let html = ''
          response.data.forEach(function(photo) {
            self.newListing.productPhotos.push(photo.filename);
            html += '<div class="col s6 m3 uploadedImage"><i class="material-icons grey darken-4 white-text" style="position: relative; top: 35px; left: -10; margin: 0px; padding: 5px;">delete</i><img class="responsive-img" src="https://api.zano.life/uploads/' + photo.filename + '" /></div>';
          })
          console.log(this.newListing.productPhotos)
          this.$swal("Success!", `Product file uploaded`, "success");

          this.displayImageHTML = html;
        }
      } catch (err) {
        this.$swal("Oops!", `File type must be: .jpg . jpeg .png, and limited to four photos`, "error");
      }
    },
    async submitListing() {
      try {
        window.$(".loading").toggle();
        window.$(".loading-spinner-listing").toggle();
        this.newListing.ownerAddress = this.user.paymentAddress;
        let response = await this.$http.post("/listing/save", this.newListing);
        if (response.status == 201) {
          this.$swal("Listing created", `Finalize by visiting your listings
            page via Manage Account`, "success");
          window.$(".loading").toggle();
          window.$(".loading-spinner-listing").toggle();
          window.$("#newListingModal").modal("close");
          this.getListingsAndSales();
        }
      } catch (err) {
        let error = err.response;
        if (error.status == 409) {
          window.$(".loading").toggle();
          window.$(".loading-spinner-listing").toggle();
          this.$swal("Error", error.data.message, "error");
        } else {
          window.$(".loading").toggle();
          window.$(".loading-spinner-listing").toggle();
          this.$swal("Error", error.data.err.message, "error");
        }
      }
    }
  },
  mounted() {
    this.getUserDetails();
    this.getListingsAndSales();
    window.$(document).ready(function(){
      window.$('.modal').modal();
      window.$('input#description, textarea#description').characterCounter();
      window.$('.tooltipped').tooltip();
      window.$('input.autocomplete').autocomplete({
        data: {
          "Apple": 'https://placehold.it/250x250',
          "Microsoft": 'https://placehold.it/250x250',
          "Google": 'https://placehold.it/250x250'
        },
      });
    });
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
    display: none;
    margin: 0px;
    font-size: 26pt;
  }

  .cardCount p span {
    font-weight: normal;
    font-size: 14pt;
  }

  p#listingCount, p#saleCount, p#grossIncome {
    display: none;
  }

  .loading-spinner {
    left: 0px;
    margin-top: 5px;
    margin-bottom: -10px;
  }

  .spinner {
    margin: 10px auto;
    margin-bottom: -5.5px;
    height: 50px;
    width: 50px;
  }

  .spinner-custom {
    border-color: #18ffff;
  }

  .accountDetail {
    font-size: 16pt;
    font-weight: bold;
  }

  .fullWidth {
    width: 100%;
    margin-bottom: 15px;
  }

  .modal-content .title {
    font-size: 20pt;
    font-weight: bold;
  }

  .modal-content .row {
    margin-bottom: 0px;
  }

  .modal-content #categoryHelp {
    position: absolute;
    top: 43px;
    right: 10px;
    font-size: 10pt;
    margin-top: 0px;
  }

  .modal-footer {
    padding-right: 20px;
    padding-left: 20px;
    margin-bottom: 10px;
  }

  .input-field input[type=text]:focus + label,  .materialize-textarea:focus:not([readonly]) + label {
    color: #000 !important;
  }

  .input-field input[type=text]:focus, .materialize-textarea:focus:not([readonly]) {
    border-bottom: 1px solid #000 !important;
    box-shadow: 0 1px 0 0 #000 !important;
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

  .loading-spinner-listing {
    z-index: +100;
    display: none;
    position: absolute;
    top: 45%;
    left: 0px;
    width: 100%;
  }

  .spinner {
    margin: 0px auto;
  }

  .refresh {
    padding: 5px 5px 0px 5px;
    border-radius: 50%;
  }

  .refresh i {
    font-size: 26pt;
  }
</style>
