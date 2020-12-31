import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";
import 'material-design-icons/iconfont/material-icons.css'
import "materialize-css/dist/js/materialize.min.js";
import VueSwal from 'vue-swal';
Vue.use(VueSwal);

const base = axios.create({
  baseURL: "https://api.zano.life/"
});

Vue.prototype.$http = base;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
