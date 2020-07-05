module.exports = {
	friendlyName: 'Tags',
	description: 'Returns JSON of all tags!',
	inputs: {
	},
	exits: {
		success: {
			// responseType: 'view',
			// viewTemplatePath: 'vendors/ilog/digital'
		}
	},
	fn: async function (inputs, exits) {
		
		const Keyword = sails.hooks.borm.bookshelf.model('Keyword');
		const Post = sails.hooks.borm.bookshelf.model('Post');

		Keyword.forge({id: 194}).fetch().then( function(model){
			return model.keywordable();
		}).catch();
		
		return exits.success({
			Keyword
		});
	}
};