<template>
	<div class="search-form">
		<form v-on:submit.prevent="onSubmit" class="pure-form">
			<multiselect
				placeholder="mention"
				v-model="person"
				:options="people"
				track-by="id"
				label="identifier"
				:multiple="false"
				:taggable="true"
				@tag="addPeople"
				class="input-multiselect"
				selectLabel=""
				deselect-label=""
				:loading="isLoading"
				@search-change="asyncFind"
			></multiselect>
			<button type="submit"><i class="fas fa-filter"></i></button>
		</form>
	</div>
</template>

<script>

import app from '../configs/app'
import Multiselect from 'vue-multiselect'
export default {
	name: 'People',
	props: [],
	components: {
		Multiselect
	},
	data () {
		return {
			person: null,
			people: [],
			isLoading: false,
		}
	},
	methods: {
		asyncFind (query) {
	    	this.isLoading = true;
	    	let self = this;
	    	this.$http.get(app.host + '/modules/people/search/?person=' + encodeURIComponent(query))
				.then(function(response){
					console.log(query)
					self.people = response.data 
					self.isLoading = false
				});
	    },
	    addPeople (newPerson) {
				const person = {
					name: newPerson,
				}
				this.people.push(person)
			},
		onSubmit () {
			if (this.person.id != '') {
				this.$router.push({ name: 'mention', params: { id: this.person.id, identifier: this.person.identifier }})
			} else {
				
			}
		},
	},
	created() {
		
	},
	filters: {
		
	},
	watch: {
	}
}
</script>
