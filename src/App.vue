<script setup>
	import { ref } from 'vue'
	import { useFullscreen, useColorMode } from '@vueuse/core'
	import HeaderNav from '@/components/HeaderNav.vue'
	const MainContainer = ref(null)
	const { toggle } = useFullscreen(MainContainer)
	const mode = useColorMode({
		emitAuto: true
	})
	const handleColor = (value) => {
		mode.value = value === 'dark' ? 'light' : 'dark'
	}
</script>

<template>
	<el-container 
		ref="MainContainer"
		id="MainContainer"
	>
		<el-header id="MainHeader">
			<HeaderNav 
				:mode="mode"
				@color="handleColor"
				@full="toggle" 
			/>
		</el-header>	
		<el-container id="PageContainer">
			<router-view :mode="mode"/>
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
