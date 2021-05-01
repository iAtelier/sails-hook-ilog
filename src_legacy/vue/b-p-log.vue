<template>
	<div class="log">
		<header>
			<p style="display:flex; justify-content: space-between;">
				<span v-if="head"><b>{{ head }}</b></span>
				<!-- {{ count.posts }} posts & {{ count.stuffs }} stuff -->
			</p>
			<profile class="lg-yes" :count="count"></profile>
		</header>

		<main class="log-list">
			<header>
				<profile class="lg-no"></profile>
				<!-- <tunekit></tunekit> -->
				<!-- <stories></stories> -->
				<span v-if="title" v-html="title" class="title"></span>
				<nav v-if="page.prev" class>
					<span class="status" v-if="loading">{{ loading }}</span>
					<span class="button" v-if="!loading" v-on:click="retriveNewer()"><i class="icon icon-more-horiz"></i></span>
				</nav>
			</header>

			<item v-for="(item, index) in items"
				:content="item"
				:key="item.kind + item.id"
				>
			</item>

			<footer>
				<nav v-if="page.next" class="footer">
					<span class="button" v-if="!loading" v-on:click="retriveNextPage()"><i class="icon icon-more-horiz"></i></span>
					<span class="status button" v-if="loading"><div class="loading loading-lg"></div></span>
				</nav>
			</footer>
		</main>

		<footer>
			<menu>
				<a class="inlink" :href="'mailto:' + email"><i class="fas fa-envelope"></i>
					<span class="no xl-yes">Email</span>
				</a>
				<router-link to="/"><i class="fas fa-home"></i>
					<span class="no xl-yes">Home</span>
				</router-link>
				<a class="inlink" :href="atom"><i class="fas fa-rss-square"></i>
					<span class="no xl-yes">Atom</span>
				</a>
				<a class="inlink" :href="rss"><i class="fas fa-rss"></i>
					<span class="no xl-yes">RSS</span>
				</a>
				<a class="inlink"><i class="fas fa-question-circle"></i>
					<span class="no xl-yes">Help</span>
				</a>
			</menu>
		</footer>

	</div>

</template>

<script>
import app from './configs/app.js'
import Profile from './elements/Profile'
import Tunekit from './elements/Tunekit'
import Item from './components/Item'
import Stories from './elements/stories'

var _ = require('underscore')
var moment = require('moment')

export default {
	name: 'BPLog',
	components: {
		Profile,
		Tunekit,
		Item,
		Stories,
	},
	data () {
		return {
			address: '',
			location: app.profile.location,
			author: app.profile.author,
			status: app.profile.status,
			avatar: app.profile.avatar,

			count: {},
			items: [],
			forward: false,
			underscore: _,

			title: '',
			route: 0,


			head: '',
			host: '',
			atom: '',
			rss: '',
			email: app.profile.email,

			page: {
				current: false,
				next: false,
				prev: false,
				respodata: {}
			},
			request: '',
			loading: 'starting to lead content',
		}
	},
	metaInfo () {
		return {
			title: this.head + ' by ' + this.author + ' (Digital Ilog)',
			host: app.host
		}
	},
	mounted () {
	},
	methods: {
		setPrev() {
			this.page.prev = this.page.respodata.prev
		},
		setNext() {
			this.page.next = this.page.respodata.next
		},
		retriveNewer() {
			this.$router.replace({ name: 'home' })
			this.constructRequest()
			this.request = this.request + this.page.prev
			console.log(this.request)
			this.forward = true;
			let self = this;
			this.retriveIlogs().then(function(){
				self.setPrev()
			})
		},
		retriveNextPage() {
			this.$router.replace({ name: 'home' })
			this.constructRequest()
			this.request = this.request + this.page.next
			let self = this;
			this.retriveIlogs().then(function(){
				self.setNext()
			})

		},
		retriveIlogs() {
			let vue = this;
			return new Promise(function(resolve, reject) {
				let self = vue;
				let success = false;
				vue.loading = 'loading';
				vue.$http.get(vue.request).
					then(function(response) {
						self.count = response.data.count

						self.page.current = response.data.items.current_page // set current page
						console.log('hardcore')
						console.log(response.data.items.prev_page_url)

						self.page.respodata.prev = response.data.items.prev_page_url
						self.page.respodata.next = response.data.items.next_page_url

						if (self.items.length == 0 ) {
							console.log(self.page.respodata.next)
							self.setNext()
							self.setPrev()
						}

						if (self.forward) {
							self.items = _.union(_.toArray(response.data.items.data), self.items) // add data
							self.forward = false;
						} else {
							self.items = _.union(self.items,_.toArray(response.data.items.data)) // add data
						}
						self.loading = false;
						resolve()
					}).catch(e => {
						console.log(e)
						reject()
					})
			})
		},
		constructRequest()
		{
			this.request = app.host;
			switch (this.$route.name) {
				case 'tag':
					this.items = [];
					this.page.current = false;
					this.request =  this.request + '/tag/' + this.$route.params.id;
					this.retriveIlogs()
					this.head = "#:" + this.$route.params.id;
					break;
				case 'mention':
					this.items = [];
					this.page.current = false;
					this.request =  this.request + '/mention/' + this.$route.params.id;
					this.retriveIlogs()
					this.head = "@:" + this.$route.params.id;
					break;
				case 'post':
					console.log(this.items.length)
					if (this.items.length == 0 )
					{
						this.page.current = false;
						this.request =  this.request + '/' + this.$route.params.id + '/find/';
						let self = this;
						this.retriveIlogs().then(function() {
							self.setNext()
							self.setPrev()
						})
					}
					break;
				case 'home':
					if (this.items.length == 0 )
					{
						this.page.current = false;
						this.request =  this.request + '/index/';
						let self = this;
						this.retriveIlogs().then(function() {
							self.setNext()
							self.setPrev()
						}).catch(e => {
						    console.log(e);
						})
					} else {
					}
					break;
			}
		},
	},
	filters: {
		capitalize: function(text) {
			return text[0].toUpperCase() + text.slice(1);
		}
	},
	created() {
		this.address = app.host;
		this.rss = app.host + '/feed/rss'
		this.atom = app.host + '/feed/atom'
	},
	mounted() {
		this.constructRequest()
	},
	watch: {
        $route() {
	        this.constructRequest()
        },
    },
    computed: {
    },
}
</script>


<style scoped>
</style>
