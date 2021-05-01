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

import App from './App'

import { createRouter } from './router.js'

export function createApp () {

	const router = createRouter()

	const app = new Vue({
		router,
	  	// the root instance simply renders the App component.
	  	render: h => h(App)
	})
	return { app }
}