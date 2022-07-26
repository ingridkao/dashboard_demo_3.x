<script setup>
	import { topicList, topicComponentList } from '@/assets/datas/topicList.js'
	import AsideBar from '@/components/city/AsideBar.vue'
	import CardContainer from '@/components/card/CardContainer.vue'

	import { ref, computed } from 'vue'
	const isCollapse = ref(false)
	const topicData = ref(topicComponentList)
	const menuActive = ref(topicList[0]['index'])
	const targetTopic = computed(()=>{
		return topicComponentList.find(item => item.index === menuActive.value)
	})
</script>

<template>
	<el-aside 
		id="cityAsideContainer" 
		:class="{expand: !isCollapse}"
	>
		<el-scrollbar>
			<AsideBar 
				:isCollapse="isCollapse"
				:menuActive="menuActive"
				@collapse="isCollapse = !isCollapse"
				@update="(e)=> menuActive = e"
			/>
		</el-scrollbar>
	</el-aside>
	<el-main id="cityMainContainer">
		<CardContainer
			v-for="item in targetTopic.components"
			:key="item.index"
			:data="item"
		/>
	</el-main>
</template>

<style lang="scss">
#cityAsideContainer{
	width: 4.5rem;
	&.expand{
		width: 12.5rem;
	}
}
#cityMainContainer{
	--el-main-padding: 16px;
	max-width: 1800px;
	margin: 0 auto;
	display: grid;
	gap: 1rem;
	grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
	grid-auto-rows: 360px;
	.card-container{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		transition: all 500ms;
		overflow: hidden;
		@media screen and (min-width: 600px) {
			.tall {
				grid-row: span 2 / auto;
			}
			.wide {
				grid-column: span 2 / auto;
			}
		}
	}
}
</style>