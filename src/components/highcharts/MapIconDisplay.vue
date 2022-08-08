<template>
	<div v-if="components && components.map_config">
		{{components.map_config}}
	</div>
	<div v-else>
		Map Icon
	</div>
</template>
<script>
export default {
	props: {
		components: {
			type: Object,
			default: () => {}
		},
		request: {
			type: Object,
			default: () => {}
		}
	},
	computed:{
		config(){
			return this.request.config? this.request.config: null
		}
	},
  	data(){
		return {

		}
	}
}
</script>