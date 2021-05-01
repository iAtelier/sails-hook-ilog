// router.js
import VueRouter from 'vue-router'

import Post from './components/PostBody'

let routes = [
	{
		path: '/',
		name: 'home',
/*
		components: {
			single: ''
		}
*/
	},
	{
		path: '/tag/:id/',
		name: 'tag',
	},
	{
		path: '/mention/:id/',
		name: 'mention',
	},
	{
		path: '/:id/',
		name: 'post',
		pathToRegexpOptions: { strict: true }
	},
];

export function createRouter () {
	return new VueRouter({
		mode: 'history',
		base: Window.Config.base +  Window.Config.digital.uri,
		routes,
		scrollBehavior (to, from, savedPosition) {
			if (to.hash) {
				return {
					selector: to.hash
					// , offset: { x: 0, y: 10 }
				}
			}
			if ( to.name == 'tag' ) {
				return { x: 0, y: 0 }
			}
	/* FIX THIS ISSUE FROM NAVIGATING TO A TAG FROM INSIDE A POST
			if ( to.name != 'post' ) {
				return { x: 0, y: 0 }
			}
	*/
		}
	});
}
