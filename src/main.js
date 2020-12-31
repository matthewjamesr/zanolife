import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";
import VueSwal from 'vue-swal';
Vue.use(VueSwal);

const base = axios.create({
  baseURL: "http://localhost/"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
