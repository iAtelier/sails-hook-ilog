module.exorts = sails.hooks.borm.bookshelf.model(
    'Stuff',
    sails.hooks.borm.bookshelf.model('Book').extend({
        tableName: 'Stuff',
        virtuals: {
			kind: function() {
				return 'stuff';
            },
            uniq: function() {
				return 'stuff' + this.get('id');
			}
		},
    }, {
        DIMENSIONS: ['title','slug', 'timestamp', 'cover'],
        GROUPINGS: ['keywords']
    }),
);
