<template>
	<div class="modal" style="display: block;">
		<span class="close" v-on:click="close()"><i class="fas fa-times"></i></span>
		<div class="modal-content" style="z-index: 10;">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		close() {
			this.$emit('close')
		}
	},
	created() {
		document.body.classList.add('modal-open')
	},
	destroyed() {
		document.body.classList.remove('modal-open')
	},
}
</script>

<style>
</style>