// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(ElementUI)

// 全局路由拦截-进入页面前执行
// to: Route : 即将要进入的目标 [路由对象]
// from: Route : 当前导航正要离开的路由
// next: Function : 继续执行函数
// 
// next()：继续执行
// next(false)：中断当前的导航。
// next(‘/‘) 或 next({ path: ‘/‘ })：跳转新页面，常用于登陆失效跳转登陆
router.beforeEach((to, from, next) => {
    // 这里可以加入全局登陆判断
    // 继续执行
    next();
});

// 全局后置钩子-常用于结束动画等
router.afterEach(() => {
    //不接受next
})



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
