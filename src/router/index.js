import Vue from 'vue'
import Router from 'vue-router'
import { deCentralizationUmd } from '@/utils'

Vue.use(Router)

const routes = deCentralizationUmd(
    require.context('./', true, /\.\/modules\/\w+\.js/),
    (a, b) => [...a, ...b]
  )
export default new Router({
    routes
})
