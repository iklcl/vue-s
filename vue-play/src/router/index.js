import Vue from 'vue'
import Router from 'vue-router'
import nav from '@/components/nav'

import write from '@/components/write'
import thoughts from '@/components/others/thoughts'
import set from '@/components/setting/set'
import linux from '@/components/skill/javaList'
import python from '@/components/skill/pythonList'
import linuxs from '@/components/skill/linuxList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'nav',
      component: nav,
			children: [
				{path:'/write',name:'write',component:write}
// 				{ path: '/table', component: Table, name: 'Table' },
// 				{ path: '/form', component: Form, name: 'Form' },
// 				{ path: '/user', component: user, name: '列表' },
			]
    }
		
  ],
	mode:"history"
})
