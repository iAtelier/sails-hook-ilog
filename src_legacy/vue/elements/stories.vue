<template>

<div class="stories">
	<div class="modal active" id="modal-id">
	  <a href="#close" class="modal-overlay" aria-label="Close"></a>
	  <div class="modal-container">
	    <div class="modal-header">
	      <a href="#close" class="btn btn-clear float-right" aria-label="Close"></a>
	      <div class="modal-title h5">Modal title</div>
	    </div>
	    <div class="modal-body">
	      <div class="content">
	        <!-- content here -->
	      </div>
	    </div>
	    <div class="modal-footer">
	      ...
	    </div>
	  </div>
	</div>
</div>

</template>

<script>

import app from '../configs/app'

export default {
	name: 'Stories',
	components: {
	},
	data () {
		return {
			tag: {},
			tags: [],
		}
	},
	methods: {
		onSubmit () {
			this.$router.push({ name: 'tag', params: { id: this.tag.id } })
		},
	},
	created() {
		let self = this
		this.$http.get(app.host + '/modules/tags/')
			.then(function(response){
				self.tags = response.data
				});
		this.dashboard_1 = Window.Config.dasbhoard_1
		this.dashboard_2 = Window.Config.dasbhoard_2
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
.tag {
	float: left;
}
</style>
