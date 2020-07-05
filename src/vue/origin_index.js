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

import Ilog from './Ilog'

import router from './router.js'

const app = new Vue({
	el: '#bp-log',
	router,
	template: '<Ilog/>',
	components: { Ilog },
})

module.exports = app;