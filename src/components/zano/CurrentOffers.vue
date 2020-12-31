<template>
  <p>Current offers on-chain: <b>{{offers}}</b></p>
</template>
<script>
export default {
  name: "CurrentOffers",
  data() {
    return {
      offers: "Scanning..."
    };
  },
  methods: {
    async getOffers() {
      try {
        let response = await this.$http.get("/zano/getmarketplaceoffers");
        this.offers = response.data.total_offers;
      } catch (err) {
        this.$swal("Error", err, "error");
        console.log(err.response);
      }
    }
  },
  mounted() {
    this.getOffers();
  }
};
</script>
