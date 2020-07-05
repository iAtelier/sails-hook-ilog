module.exports.routes = {
	'GET /log/' : { action: 'ilog/digital' },
	'GET /log/index' : { action: 'ilog/index' },
	'GET /log/:id/find' : { action: 'ilog/index' },
	'GET /log/:id/:asset' : { action: 'item/asset'  ,  skipAssets: false },
	'GET /log/:id?' : { action: 'ilog/digital' },
	// 'GET /log/post' : { action: 'post/show' },
	// 'GET /log/index/vue' : { action: 'index/vue' },
	'GET /log/modules/tags' : { action: 'ilog/tags' },
};