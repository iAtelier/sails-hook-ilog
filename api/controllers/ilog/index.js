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
		const Stuff = sails.hooks.borm.bookshelf.model('Stuff');
		const Timestamp = sails.hooks.borm.bookshelf.model('Timestamp');

		var scope = this;

		let GN = 100, // Golden Number
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

		// perform('RETRIVE_ALL');   .whereIn('id', [1, 2, 3])
		let qb = Timestamp.query();
		let bookTypes = ['Post', 'Stuff'];
		//let timestamps = await Timestamp
		let timestamps = 
		    await Timestamp.forge().where('timestampable_type', 'in', bookTypes).orderBy('publish', 'DESC').fetchAll();
			//.query({ whereIn: { timestampable_type: ['posts', 'stuffs'] } }).orderBy('publish', 'DESC').fetchAll();

		// console.log('checking what is in the Post');
		// console.log(sails.hooks.borm);
		// console.log(sails.hooks.borm.bookshelf);
		// console.log(sails.hooks.borm.bookshelf.model);
		// console.log(sails.hooks.borm.bookshelf.model('Post'));
		
		postsCount = await Post.count();
		stuffsCount = await Stuff.count();

		count = postsCount + stuffsCount;

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
				
				const TemporaryBookClass = sails.hooks.borm.bookshelf.model(item.get('timestampable_type'));
				
				data[index] = await TemporaryBookClass
					.forge({id: item.get('timestampable_id') })
					.fetch({withRelated: TemporaryBookClass.DIMENSIONS});
				// skipped JSONification

				// piece = Object.const_get(item.timestampable_type.capitalize).find(item.timestampable_id)
				// data[index] = JSON.parse(piece.to_json(:include => ['title', 'slug', 'timestamp', 'peoples', 'keywords'], :methods => [:kind, :uniq]))
			}

		} else {
			
			let timestamp = await Timestamp
				.query({where: {timestampable_type: 'Post', timestampable_id: inputs.id }})
				.fetch();

			retriveIndex = timestamps.map( item => item.get('id')) .indexOf(timestamp.get('id'));
				page = Math.floor(retriveIndex / GN);

			let itemsSelected = timestamps.slice( (GN * page), (GN) * (page + 1) );

			for (const [index, item] of Object.entries(itemsSelected) ) {

				const TemporaryBookClass = sails.hooks.borm.bookshelf.model(item.get('timestampable_type'));
					
				let mPost = await TemporaryBookClass
					.forge({id: item.get('timestampable_id') })
					.fetch({withRelated: TemporaryBookClass.DIMENSIONS});
					
				data[index] = mPost.toJSON();

				if ( item.get('id') === timestamp.get('id') && item.get('timestampable_type') == 'Post' ) {
					data[index]['content'] = mPost.content();
					data[index]['view'] = 'post_body';
				}
			}
		}

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