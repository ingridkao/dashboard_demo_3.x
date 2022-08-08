<script setup>
	import { ref } from 'vue'
	import { useFullscreen } from '@vueuse/core'
	import HeaderNav from '@/components/HeaderNav.vue'
	const MainContainer = ref(null)
	const { toggle } = useFullscreen(MainContainer)
</script>

<template>
	<el-container 
		ref="MainContainer"
		id="MainContainer"
	>
		<el-header id="MainHeader">
			<HeaderNav @full="toggle"/>
		</el-header>	
		<el-container id="PageContainer">
			<router-view/>
		</el-container>
	</el-container>
</template>

<style lang="scss">
	@use '@/assets/styles/element-variables.scss' as *;
	@use '@/assets/styles/main.scss' as *;
	#MainContainer{
		height: 100vh;
		#MainHeader{
			background-color: var(--el-menu-bg-color);
		}
		#PageContainer{
			background-color: var(--el-bg-color-page);
		}
	}
</style>
