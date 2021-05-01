import Vue from 'vue';

import VueRouter from 'vue-router';
import Meta from 'vue-meta'

Vue.use(VueRouter);
Vue.use(Meta)

Vue.config.productionTip = false

import axiosApp from './configs/axios';

Vue.prototype.$http = axiosApp;

import {VueMasonryPlugin} from 'vue-masonry';
Vue.use(VueMasonryPlugin)

import lodash from 'lodash';
Object.defineProperty(Vue.prototype, '_', { value: lodash });

import BPLog from './b-p-log'

import router from './router.js'

const app = new Vue({
	el: '#bp-log',
	router,
	template: '<BPLog/>',
	components: { BPLog },
})

// module.exports = function createApp (context) {
// 	return new Vue({
// 		el: '#bp-log',
// 		router,
// 		template: '<BPLog/>',
// 		components: { BPLog },
// 	})
//   }