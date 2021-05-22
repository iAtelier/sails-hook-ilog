<template>
	<a :href="content.slug.value" target="_blank">
		<div class="content">
			<div class="info">
				<span class="kind" v-if="content.kind"><span><!--<i class="fas fa-external-link-square-alt"></i>-->{{ content.kind | capitalize }} #{{ content.id }}</span></span>
				<span class="date">{{ content.timestamp.publish | date }}</span>
			</div>
			<template v-if="content.cover">
				<div><img class="cover" :src="cover()" /></div>
			</template>
			<div class="title h1"><span v-html="content.title.value"></span></div>
		</div>
		<footer>
			<template v-if="typeof(content.keywords) !== 'undefined' && content.keywords.length != 0">
				<div class="tags">
					<template v-for="keyword in content.keywords">
						<span class="tag">
							<span :to="{ name: 'tag', params: { id: keyword.id }}">
								<i class="fas fa-tag"></i>{{ keyword.word }}
							</span>
						</span>
					</template>
				</div>
			</template>
		</footer>
	</a>

</template>

<script>
var moment = require('moment');
export default {
	name: 'stuff',
	props: ['content'],
	data () {
		return {
		}
	},
	methods: {
		cover() {
			if ( (!_.isEmpty(this.content.cover)) && (!_.isEmpty(this.content.cover.file)) ) {
				return this.content.cover.path + this.content.cover.file;
			} else { return 'undefined'; }
		},
	},
	filters: {
		capitalize: function(text) {
			return text[0].toUpperCase() + text.slice(1);
		},
		date: function(time) {
			return moment(time).fromNow();
		}
	},
}
</script>

<style scoped>
</style>
