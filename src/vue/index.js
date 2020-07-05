const Vue = require('vue'),

VueRouter = require('vue-router'),
Meta = require('vue-meta');

Vue.use(VueRouter);
Vue.use(Meta)

Vue.config.productionTip = false

const axiosApp = require('./configs/axios');

Vue.prototype.$http = axiosApp;

// VueMasonryPlugin = require('vue-masonry');
// Vue.use(VueMasonryPlugin)

const lodash = require('lodash');
Object.defineProperty(Vue.prototype, '_', { value: lodash });

const Ilog = require('./Ilog');

const router = require('./router.js');

const app = new Vue({
	el: '#bp-log',
	router,
	template: '<Ilog/>',
	components: { Ilog },
})

module.exports = function createApp (context) {
	return new Vue({
		el: '#bp-log',
		router,
		template: '<Ilog/>',
		components: { Ilog },
	})
  }