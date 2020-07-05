module.exports = {
	friendlyName: 'Index',
	description: 'Handing most stuff ...',
	inputs: {
		id: { type: 'number' },
		asset: { type: 'string' },
		ext: { type: 'string'},
	},
	exits: {
		success: {
			// responseType: 'view',
			// viewTemplatePath: 'vendors/ilog/digital'
		}
	},
	fn: async function (inputs, exits) {

		const Post = sails.hooks.borm.bookshelf.model('Post');
		let post = await Post.forge({id: inputs.id})
			.fetch()
			.then(model => { return model; });

		let assetPath = post.assetFile(inputs.asset);
		
		return this.res.sendFile(assetPath);
	}
};