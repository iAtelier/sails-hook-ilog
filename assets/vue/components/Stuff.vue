<template>
	<a :href="content.slug.value" target="_blank">
		<div class="content">
			<div class="info">
				<span class="kind" v-if="content.kind"><span><i class="fas fa-external-link-square-alt"></i> {{ content.kind }}</span></span>
				<span class="date">{{ content.timestamp.publish | date }}</span>
			</div>
			<template v-if="content.thumbnail">
				<img class="thumbnail" :src="thumbnail()" />
			</template>
			<div class="title h1" v-html="content.title.value"></div>
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
		thumbnail() {
			return this.content.thumbnail.path + this.content.thumbnail.name;
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
