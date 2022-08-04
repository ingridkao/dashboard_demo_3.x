<template>
    Map Icon
</template>
<script>
export default {
	props: {
		name: {
			type: String,
			default: ""
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