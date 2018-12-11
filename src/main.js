import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 请求接口
import apis from '@/api'

// 与app通信接口
import communicate from '@/common/communicate'

let HISTORY_CACHE = Object.create(null)
let HISTORY_CACHE_KEY = 1

Vue.config.productionTip = false

Object.defineProperties(Vue.prototype, {
  $api: {
    value: apis
  },
  $communicate:{
    value:communicate
  }
})

router.beforeEach((to,from,next)=>{
    let direction = ""

    let toIndex = HISTORY_CACHE[to.name]
    let fromIndex = HISTORY_CACHE[from.name]

    if (toIndex) {
        if (toIndex > fromIndex) {
            direction = "slide_left"
        }else{
            direction = "slide_right"
        }
    }else{
        HISTORY_CACHE[to.name] = HISTORY_CACHE_KEY
        HISTORY_CACHE_KEY ++
        direction = "slide_left"
    }
    store.commit('ROUTER_DIRECTION', direction)
    communicate.post("router")
    next()
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
