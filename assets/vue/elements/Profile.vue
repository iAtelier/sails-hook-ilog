<template>
	<div class="profile">
		<span class="avatar-container"><img class="avatar" :src="avatar" /></span>
		<div class="description">
			<span class="name h2"><a :href="website">{{ author }}</a></span><br />
			<ul class="detail">
				<li><span class="status">{{ status }}</span></li>
				<li><a :href="address"><i class="fas fa-book"></i> {{ address }}</a>
				<li><i class="icon icon-location"></i> {{ location }}</li>
				<li><i class="fas fa-calendar"></i> since {{ established }}</li>
			</ul>
		</div>
	</div>
</template>

<script>

import app from '../configs/app'

export default {
	name: 'Profile',
	components: {
	},
	data () {
		return {
			address: '',
			location: app.profile.location,
			author: app.profile.author,
			status: app.profile.status,
			avatar: app.profile.avatar,
			established: app.profile.established,
			email: app.profile.email,
			website: app.profile.website,
			tag: {},
			tags: [],
			dashboard_1: '',
			dashboard_2: '',
			rss: '',
			atom: '',
		}
	},
	methods: {
	},
	created() {
		this.address = app.host;
		this.dashboard_1 = Window.Config.dasbhoard_1
		this.dashboard_2 = Window.Config.dasbhoard_2

		this.rss = app.host + '/feed/rss'
		this.atom = app.host + '/feed/atom'
	},
	filters: {
		capitalize: function(text) {
			return text[0].toUpperCase() + text.slice(1);
		},
		fromNow: function(date) {
			return moment(date).fromNow();
		}
	},
	watch: {
	}
}
</script>

<style scoped>
</style>
