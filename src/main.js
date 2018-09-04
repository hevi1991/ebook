import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/styles/icon.css'
import '@/assets/styles/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 去除iOS点击高亮效果， 配合global.scss的-webkit-tap-highlight-color: transparent;
document.body.addEventListener('touchstart', function () {
});