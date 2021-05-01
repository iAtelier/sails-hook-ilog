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

import Log from './Log'

import router from './router.js'

const bpLog = new Vue({
	el: '#bp-log',
	router,
	template: '<Log/>',
	components: { Log },
})