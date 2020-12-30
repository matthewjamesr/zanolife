new Vue({
    el: '#app',
    data: {
        allOffersRaw: '',
        allOffersCount: 'Scanning...'
    },
    methods: {
      getOffers: function () {
        var self = this
        var request = new XMLHttpRequest()
        request.open('GET', 'http://localhost/zano/getmarketplaceoffers', true)
        request.onload = function () {
          var data = JSON.parse(this.response)

          if (request.status >= 200 && request.status < 400) {
            self.allOffersRaw = JSON.stringify(data)
            self.allOffersCount = data.total_offers
          } else {
            alert('Could not access blockchain!')
          }
        }

        request.send()
      }
    },
    mounted: function () {
      this.getOffers()
    }
});
