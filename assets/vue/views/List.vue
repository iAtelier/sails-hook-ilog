<template>
</template>

<script>

import Item from '../components/Item'


var _ = require('underscore')

export default {
	name: 'list',
	props: ['items', 'collection', 'title', 'next', 'empty', 'status', 'prev'],
	data () {
		return {
			underscore: _,
			elements: {},
		}
	},
	components: {
		Tunekit,
		Item,
		Profile,
	},
	methods: {
	},
	created() {
	},
	watch: {
		empty() {
			// the route has changed, hence empty the elements
			if (this.empty == false) { this.elements = []; }
		},
		items()
		{
			this.elements = _.union(this.elements, this.items);
		}
	}
}
</script>

<style>
</style>