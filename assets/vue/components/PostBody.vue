<template>
	<div class="post-body">
		<header class="text" style="background-color: transparent">
			<template v-if="content.cover">
				<img class="cover" :src="cover()" />
			</template>
			<h1 v-html="content.title.value" v-on:click="$emit('closePost')"></h1>
		</header>
		<div class="text article" v-html="content.content">
		</div>
		<footer class="container">
			<div class="columns col-gapless">
				<div class="column col-6 ">
					<div class="timestamps">
						<p v-if="content.timestamp.draft">
							<span class="label">Draft | </span>
							{{ content.timestamp.draft | date }}
						</p>
						<p v-if="content.timestamp.publish">
							<span class="label">Published | </span>
							{{ content.timestamp.publish | date }}
						</p>
						<p v-if="content.timestamp.amend">
							<span class="label">Updated | </span>
							{{ content.timestamp.amend | date }}
						</p>
					</div>
				</div>
				<template v-if="typeof(content.keywords) !== 'undefined' && content.keywords.length != 0">
						<div class="tags column col-6 p1">
							<template v-for="keyword in content.keywords">
								<span class="tag">
									<router-link :to="{ name: 'tag', params: { id: keyword.id }}">
										<i class="fas fa-tag"></i>{{ keyword.word }}
									</router-link>
								</span>
							</template>
						</div>
				</template>
			</div>
		</footer>
	</div>
</template>

<script>

import Modal from '../components/Modal'
var _ = require('underscore')
var moment = require('moment')

export default {
	props: ['content'],
	metaInfo () {
		return {
			meta: [
				{property: 'og:url', content: this.url()},
				{property: 'og:type', content: 'article'},
				{property: 'og:title', content: this.content.title.value},
				{property: 'og:description', content: this.description},
				{property: 'og:image', content: this.cover()}
			],
		}
	},
	data () {
		return {
		}
	},
	components: {
		Modal,
	},
	methods: {
		url() {
			return Window.Config.host + '/' +  Window.Config.digital.uri + '/' + this.content.id + '/'
		},
		description () {
			return this.content.content.substring(0,50) + "..."
		},
		cover() {
			if ( (!_.isEmpty(this.content.cover)) && (!_.isEmpty(this.content.cover.file)) ) {
				return this.url() + this.content.cover.file
			} else {
				return false;
			}
		},
	},
	mounted() {
		console.log('this is the poost we have')
		console.log(this.content.title.value)
	},
	filters: {
		date(date) {
			if (date)
				return moment(date).format("MMMM D, YYYY");
			else
				return null;
		}
	},
	computed: {
	}
}
</script>

<style scoped lang="scss">
</style>
<style lang="sass">
</style>
