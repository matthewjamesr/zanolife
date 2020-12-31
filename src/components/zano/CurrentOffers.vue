<template>
  <p>Current offers on-chain: <b>{{allOffersCount}}</b></p>
</template>
<script>
export default {
  name: "CurrentOffers",
  data() {
    return {
      offers: 0
    };
  },
  methods: {
    async getOffers() {
      try {
        let response = await this.$http.get("/zano/getmarketplaceoffers");
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
  },
  created() {
    this.getOffers();
  }
};
</script>
