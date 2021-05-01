<template>
	<transition name="display-content" mode="out-in">
		<component-view :is='view' :ref="content.id" v-on:click="display" v-on:closePost="close" :content="post" :class="status">
			<div class="content">
				<div class="info">
					<span class="kind" v-if="content.kind"><span>{{ content.kind }}</span></span>
					<span class="date">{{ content.timestamp.publish | date }}</span>
				</div>
				<template v-if="content.cover">
					<img class="cover" :src="cover()" />
				</template>
				<div class="title h1" v-html="content.title.value"></div>
			</div>
			<footer>
				<template v-if="typeof(content.keywords) !== 'undefined' && content.keywords.length != 0">
						<div class="tags">
							<template v-for="keyword in content.keywords">
								<span class="tag" :key="keyword.id">
									<!--<router-link :to="{ name: 'tag', params: { id: keyword.id }}">-->
										<span><i class="fas fa-tag"></i></span> {{ keyword.word }}
									<!--</router-link>-->
								</span>
							</template>
						</div>
				</template>
			</footer>
		</component-view>
	</transition>
</template>

<script>

var moment = require('moment');
import PostBody from '../components/PostBody'
import app from '../configs/app'
var _ = require('underscore')

export default {
	name: 'post',
	props: ['content'],
	components: {
		PostBody
	},
	data () {
		return {
			view: 'div',
			status: false,
			post: {},
			request: '',
		}
	},
	methods: {
		close() {
			this.view = 'div';
			this.$router.replace({ name: 'home' })
			this.status = 'false';
		},
		display() {
			this.$router.replace({ name: 'post', params: { id: this.content.id } })
			this.view = 'post-body';
			this.status = 'active';
			console.log('content = ' + this.content.content)
			if ( this.content.content == undefined ) {
				this.retrivePostBody()
			} else {
				this.post = this.content;
			}
		},
		cover() {
			if ( (!_.isEmpty(this.content.cover)) && (!_.isEmpty(this.content.cover.file)) ) {
				return Window.Config.host + '/' +  Window.Config.digital.uri + '/' + this.content.id + '/' + this.content.cover.file;
			} else { return null }
		},
		retrivePostBody() {
			let self = this;
			this.request = '/' + this.$route.params.id
			this.$http.get(app.host + this.request )
				.then( function(response) {
					if ( !isNaN(self.$route.params.id) ) {
						self.post = response.data
					}
					else
					{
						self.post = response.data.leaf
					}
				});
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
	created()
	{
		if ( this.$route.name == 'post' && this.content.id == this.$route.params.id ) {
			this.request = '/' + this.$route.params.id
			if ( this.content.content != undefined ) {
				this.post = this.content;
			} else {
				this.retrivePostBody()
			}
		} else {
			this.post = this.content;
// 			this.$emit('closePost')
		}
		this.$nextTick(() => {
			if (typeof this.content.view !== 'undefined') {
				this.$nextTick(() => {
					this.$refs[this.content.id].scrollIntoView()
					this.$nextTick(() => {
						this.view = 'post-body'
					})
				})
			}
		})
	}
}
</script>

<style scoped>
</style>
