import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
// Vue.use(VueVideoPlayer)
import Axios from 'axios'
Vue.use(ElementUI)

Vue.prototype.axios = Axios
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')