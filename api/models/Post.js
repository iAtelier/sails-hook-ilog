module.exorts = sails.hooks.borm.bookshelf.model(
    'Post',
    sails.hooks.borm.bookshelf.model('Book').extend({
        tableName: 'posts',
        virtuals: {
			kind: function() {
				return 'post';
            },
            uniq: function() {
				return 'post' + this.get('id');
			}
		},
    }, {
        DIMENSIONS: ['title','slug', 'timestamp', 'cover'],
        GROUPINGS: ['keywords']
    }),
);

// module.exports = sails.hooks.borm.bookshelf.model('Post', Post);
// module.exports = Post;
