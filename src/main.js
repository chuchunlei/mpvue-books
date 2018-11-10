import Vue from 'vue'
import App from './App'
import fly from '@/utils/fly'
import '../static/weui/weui.css'
import EventProxy from 'vue-event-proxy'
import store from '@/store/index'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.prototype.$store = store

Vue.use(EventProxy);
Vue.use(MpvueRouterPatch)

Vue.prototype.$http = fly.ajax;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
