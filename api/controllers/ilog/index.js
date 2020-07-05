module.exports = {
	friendlyName: 'Index',
	description: 'Handing most stuff ...',
	inputs: {
		id: { type: 'number' },
		page: { type: 'string' },
	},
	exits: {
		success: {
			// responseType: 'view',
			// viewTemplatePath: 'vendors/ilog/digital'
		}
	},
	fn: async function (inputs, exits) {
		
		const Post = sails.hooks.borm.bookshelf.model('Post');
		const Timestamp = sails.hooks.borm.bookshelf.model('Timestamp');

		let GN = 7, // Golden Number
			page = 0,
			count = 0,
			posts =  {},
			stuffs = {},
			data = {};

		if (inputs.page) {
			// console.log('parsing the page number');
			page = parseInt(inputs.page);
			// console.log(page);
		}

		// perform('RETRIVE_ALL');

		let timestamps = await Timestamp.query({where: {timestampable_type: 'posts'}}).orderBy('publish', 'DESC').fetchAll();
		
		postsCount = await Post.count();

		count = postsCount;

		// console.log(`count is equal to ${count}`);
		
		// console.log('the timestamps are equal to : ');
		// console.log(timestamps);

		// var perform = function(aName) {
			if ( !(inputs.id) ) {

				// console.log('no input id');
				// console.log(GN * page);
				let itemsSelected = timestamps.slice( (GN * page), (GN) * (page + 1) );
				// console.log(itemsSelected.length);
				
				for (const [index, item] of Object.entries(itemsSelected) ) {
					// console.log(`proccessing the post with id ${item.get('id')}`);
					data[index] = await Post.forge({id: item.get('timestampable_id') }).fetch({withRelated: Post.DIMENSIONS});
					// skipped JSONification

					// piece = Object.const_get(item.timestampable_type.capitalize).find(item.timestampable_id)
					// data[index] = JSON.parse(piece.to_json(:include => ['title', 'slug', 'timestamp', 'peoples', 'keywords'], :methods => [:kind, :uniq]))
				}
				// console.log('finished the process!')

			} else {

				// console.log('detected an input id')

				let timestamp = await Timestamp.query({where: {timestampable_type: 'posts', timestampable_id: inputs.id }}).fetch();

				// console.log('MOST_IMPORTANT timestamp is equal to ')
				// console.log(timestamp);

				retriveIndex = timestamps.map( item => item.get('id')) .indexOf(timestamp.get('id'));
				page = Math.floor(retriveIndex / GN);

				let itemsSelected = timestamps.slice( (GN * page), (GN) * (page + 1) );

				for (const [index, item] of Object.entries(itemsSelected) ) {
					
					let mPost = await Post.forge({id: item.get('timestampable_id') }).fetch({withRelated: Post.DIMENSIONS});
					
					data[index] = mPost.toJSON();

					// console.log('we also need to check for a match between:');
					// console.log(item.get('id'));
					// console.log('and the below one:')
					// console.log(timestamp.get('id'));
					
					if ( item.get('id') === timestamp.get('id') ) {
						// console.log('we found a match!');

						data[index]['content'] = mPost.content();
						data[index]['view'] = 'post_body';
					}
				}
			}
		// };

		var paginate = function() {

			let lastPage = Math.max( Math.ceil(count / GN), 1) - 1;
			// console.log('lastPage is equal to');
			// console.log(lastPage);

			var nextPageUrl = function() {
				// console.log('calculating nextPage')
				if ( lastPage > page) {
					return '/index?page=' + (page + 1);
				} else {
					return '';
				}
			};

			var prevPageUrl = function () {
				// console.log('calculating prePage')
				if (page != 0) {
					return '/index?page=' + Math.max( (page - 1), 0);
				} else {
					return '';
				}
			}

			return {
				current_page: page,
				data: data,
				first_page_url: '', // $this->url(1),
				from: '', // $this->firstItem(),
				last_page: lastPage, // $this->lastPage(),
				last_page_url: '', // $this->url($this->lastPage()),
				next_page_url:  nextPageUrl(),
				path: '', // $this->path(),
				per_page: GN, // $this->perPage(),
				prev_page_url: prevPageUrl(), // $this->previousPageUrl(),
				to: '', // $this->lastItem(),
				total: count,
			};
		};

		let items = paginate();

		return exits.success({
			items: items,
			count: count,
			stories: '',
		});
	}
};