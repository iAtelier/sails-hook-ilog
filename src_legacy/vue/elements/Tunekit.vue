<template>

<div class="tunekit">
	<div id="tags" class="content search-form"  style="overflow: visible;">
		<div v-if="tags">
			<form v-on:submit.prevent="onSubmit" class="pure-form">
				<multiselect
					placeholder="tag"
					v-model="tag"
					:options="tags"
					track-by="id"
					label="word"
					:multiple="false"
					:taggable="true"
					class="input-multiselect"
					selectLabel=""
					deselect-label=""
				></multiselect>
				<button type="submit"><i class="fas fa-filter"></i></button>
			</form>
			
		</div>
	</div>
	
	<div id="search" class="content"  style="overflow: visible;">
		<people></people>
	</div>
	
</div>

</template>

<script>

import app from '../configs/app'
import People from '../elements/People'
import Multiselect from 'vue-multiselect'

export default {
	name: 'Tunekit',
	components: {
		People,
		Multiselect,
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