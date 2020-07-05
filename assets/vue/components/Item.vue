<template>
	<div :class="'item ' + content.kind.toLowerCase()">
		<component :is="content.kind" :content="content">
		</component>
	</div>
</template>

<script>

var moment = require('moment');
import Stuff from '../components/Stuff'
import Post from '../components/Post'

export default {
	name: 'item',
	props: ['content'],
	components: {
		Post,
		Stuff,
	},
	data () {
		return {
		}
	},
	methods: {
	},
	mounted() {
	},
	filters: {
		capitalize: function(text) {
			return text[0].toUpperCase() + text.slice(1);
		},
		fromNow: function(date) {
			return moment(date).fromNow();
		},
		date: function(time) {
			return moment(time).format('MMM D, YY');
		}
	},
	watch: {
	}
}
</script>

<style scoped>
</style>
