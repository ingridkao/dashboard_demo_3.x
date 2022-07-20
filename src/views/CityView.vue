<script setup>
	import AsideBar from '@/components/city/AsideBar.vue'
	import CardContainer from '@/components/card/CardContainer.vue'
</script>

<template>
	<el-aside id="cityAsideContainer">
		<el-scrollbar>
			<AsideBar/>
		</el-scrollbar>
	</el-aside>
	<el-main>
		<CardContainer/>
	</el-main>
</template>

<style lang="scss">
#cityAsideContainer{
	width: 12.5rem;
}
</style>