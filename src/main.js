// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Books from './components/Books'
import UserPage from './components/UserPage'
import Login from './components/Login'
import Register from './components/Register'
import Add from './components/Add'
import BookDetails from './components/BookDetails'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)
//Vue.prototype.$http = axios

const router = new VueRouter({
	mode:"history",
	base:__dirname,
	routes:[
		{path:"/",component:Login},
		{path:"/register",component:Register},
		{path:"/books",component:Books},
		{path:"/add",component:Add},
		{path:"/userpage",component:UserPage},
		{path:"/books/:id",component:BookDetails}
	]
})

/* eslint-disable no-new */
new Vue({
  router,
  el: "#app",
  render: h => h(App)
  
})
