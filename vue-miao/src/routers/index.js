import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import mineRouter from './mine'
import cinemaRouter from './cinema'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'HUHO',
  //路由路径
  // base: process.env.BASE_URL,
  routes: [
    movieRouter,
    mineRouter,
    cinemaRouter,
    {
      path:'/*',
      redirect:'/movie'
    }
  ]
})
