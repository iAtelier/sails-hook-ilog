<template>

	<modal v-on:close="close()">

		<template v-if="content.cover">
			<img :src="cover" class="shadow" style="max-width: 100%; margin: 0px auto; display: block; position: relative; z-index: -1;" />
		</template>

		<div class="post-single">

			<div class="container"  v-if="!isNaN($route.params.id)">
				<div class="text">
					<h1 v-html="content.title.value"></h1>
				</div>

				<div class="text" v-html="content.content"></div>
			</div>

			<footer class="tag-container">

				<template v-if="content.keywords && content.keywords.length != 0">
					<template v-for="keyword in content.keywords">
						<span class="tag tag-sc">
							<router-link :to="{ name: 'tag', params: { id: keyword.id }}">
								<i class="fas fa-tag"></i>{{ keyword.word }}
							</router-link>
						</span>
					</template>
				</template>

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
			</footer>

			<div class="container shadow"  v-if="isNaN($route.params.id)">
				<div class="text">
					<h1 v-html="content.title"></h1>
					<p><span v-html="content.date"></span></p>
				</div>
				<div class="text" v-html="content.content"></div>
			</div>

		</div>
	</modal>

</template>

<script>

import app from '../configs/app'
import Modal from '../components/Modal'
var _ = require('underscore')
var moment = require('moment')

export default {
	props: ['route'],
	data () {
		return {
			content: {
				title: {
					value: '',
				},
				date: {

				},
				timestamp: {
					publish: ''
				},
			},
			underscore: _,
			previous: null,
		}
	},
	components: {
		Modal,
	},
	metaInfo () {
		return {
			title: 'Post #' + this.content.id + ' by ' + Window.Config.profile.author + ' (Digital Log)',
			meta: [{ vmid: 'description', name: 'description', content: this.content.title.value }],
		}
	},
	methods: {
		close() {
			this.back()
		},
		initialize() {
			let self = this;
			this.$http.get(app.host + '/' + this.$route.params.id )
				.then( function(response) {
					if ( !isNaN(self.$route.params.id) ) {
						self.content = response.data
					}
					else
					{
						self.content = response.data.leaf
					}
				});

		},
		back() {
/*
			if (this.route == 0) {
				this.$router.push({ path: '/' })
				return;
			}
			this.$router.go(-1)
*/
			if (_.size(this.$parent.collection) > 0 )
			{
				this.$router.push({ path: this.previous })
			} else {
				this.$router.push({ path: '/' })
			}
		},
	},
	mounted() {
		this.initialize();

	},
	filters: {
		date(date) {
			if (date)
				return moment(date).format("MMMM D, YYYY");
			else
				return null;
		}
	},
	watch: {
		'$route.params.id': function() {
			this.initialize();
		}
	},
	beforeRouteEnter (to, from, next) {
		let self = this
		next(self => {
		    self.previous = from.fullPath
		  })
	},
	computed: {
		cover: function() {
			if ( (!_.isEmpty(this.content.cover)) && (!_.isEmpty(this.content.cover.file)) ) {
				return Window.Config.host + '/' +  Window.Config.digital.uri + '/' + this.content.id + '/' + this.content.cover.file;
			} else {
				return null;
			}
		},
	}
}
</script>

<style scoped lang="scss">
</style>
<style lang="sass">
</style>
