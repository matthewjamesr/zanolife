(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d49b155"],{2127:function(t,e,s){},9391:function(t,e,s){"use strict";s("2127")},a305:function(t,e,s){"use strict";s("d6ad")},d6ad:function(t,e,s){},dd7b:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[s("navigation"),s("login")],1)},i=[],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("form",{on:{submit:function(e){return e.preventDefault(),t.loginUser(e)}}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col s12 m8 l6 offset-m2 offset-l3 grey darken-4 white-text bevel z-depth-2"},[t._m(0),s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.login.email,expression:"login.email"}],staticClass:"validate",attrs:{id:"email",type:"text"},domProps:{value:t.login.email},on:{input:function(e){e.target.composing||t.$set(t.login,"email",e.target.value)}}}),s("label",{attrs:{for:"email"}},[t._v("Email")])])]),s("div",{staticClass:"row"},[s("div",{staticClass:"input-field col s12"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.login.password,expression:"login.password"}],attrs:{id:"password",type:"password"},domProps:{value:t.login.password},on:{input:function(e){e.target.composing||t.$set(t.login,"password",e.target.value)}}}),s("label",{attrs:{for:"password"}},[t._v("Password")])])]),t._m(1),s("div",{staticClass:"row"},[s("div",{staticClass:"col s12 center-align"},[s("p",[t._v("Not experienced the power of Zano.life yet? "),s("router-link",{attrs:{to:"/register"}},[t._v("Register now")]),t._v(".")],1)])])])])]),s("div",{staticClass:"loading"}),t._m(2)])},l=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("p",{staticClass:"lead"},[t._v("Welcome back!")]),s("p",[t._v("Sign-in to your Zano.life account")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col s12 m8 l6 offset-m2 offset-l3"},[s("button",{staticClass:"btn purple accent-2 waves-effect waves-light",attrs:{type:"submit",name:"action"}},[t._v("Submit "),s("i",{staticClass:"material-icons right"},[t._v("send")])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"loading-spinner center-align"},[s("div",{staticClass:"spinner preloader-wrapper big active"},[s("div",{staticClass:"spinner-layer spinner-red-only"},[s("div",{staticClass:"circle-clipper left"},[s("div",{staticClass:"circle"})]),s("div",{staticClass:"gap-patch"},[s("div",{staticClass:"circle"})]),s("div",{staticClass:"circle-clipper right"},[s("div",{staticClass:"circle"})])])])])}],r=(s("96cf"),s("1da1")),o=s("1157"),c=s.n(o),d={data:function(){return{login:{email:"",password:""}}},methods:{loginUser:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return c()(".loading").toggle(),c()(".loading-spinner").toggle(),e.prev=2,e.next=5,t.$http.post("/user/login",t.login);case 5:s=e.sent,a=s.data.token,localStorage.setItem("jwt",a),a&&(t.$swal("Success","Login Successful","success"),t.$router.push("/me")),e.next=17;break;case 11:e.prev=11,e.t0=e["catch"](2),c()(".loading").toggle(),c()(".loading-spinner").toggle(),t.$swal("Error","Something Went Wrong","error"),console.log(e.t0.response);case 17:case"end":return e.stop()}}),e,null,[[2,11]])})))()}}},u=d,p=(s("a305"),s("2877")),v=Object(p["a"])(u,n,l,!1,null,"7004628a",null),g=v.exports,m=s("448d"),f={components:{login:g,Navigation:m["a"]}},w=f,C=(s("9391"),Object(p["a"])(w,a,i,!1,null,"238be7b4",null));e["default"]=C.exports}}]);
//# sourceMappingURL=chunk-0d49b155.7c1ebbef.js.map