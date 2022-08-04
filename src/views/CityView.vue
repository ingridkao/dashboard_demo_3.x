<script setup>
	import { topicList, topicComponentList} from '@/assets/datas/topicList.js'
	import AsideBar from '@/components/city/AsideBar.vue'
	import CardContainer from '@/components/card/CardContainer.vue'

	import { ref, computed, watch } from 'vue'
	import { useWindowSize, useFullscreen } from '@vueuse/core'
	const { width, height } = useWindowSize()
	const { isFullscreen } = useFullscreen()
	const isCollapse = ref(false)
	const menuActive = ref(topicList[0]['index'])
	const targetTopic = computed(()=>{
		return topicComponentList.find(item => item.index === menuActive.value)
	})
	const handleCollapse = () => {
		isCollapse.value = !isCollapse.value
	}
	watch(isFullscreen, (state) => {
		if(state) isCollapse.value = true
	})
</script>

<template>
	<el-aside 
		id="cityAsideContainer" 
		:class="{
			expand: !isCollapse,
			fullscreen: isFullscreen
		}"
	>
		<el-scrollbar>
			<AsideBar 
				:isCollapse="isCollapse"
				:menuActive="menuActive"
				@collapse="handleCollapse"
				@update="(e)=> menuActive = e"
			/>
		</el-scrollbar>
	</el-aside>

	<el-scrollbar 
		id="cityMainContainer"
		:height="height - 60"
	>
		<el-main :class="{
			fullscreen: isFullscreen
		}">
			<CardContainer
				v-for="item in targetTopic.components"
				:key="item.index"
				:data="item"
			/>
		</el-main>
	</el-scrollbar>
</template>

<style lang="scss">
#cityAsideContainer{
	width: 4.5rem;
	&.expand{
		width: 12.5rem;
	}
	&.fullscreen{
		width: 4.5rem;
	}
}
#cityMainContainer{
	width: 100%;
	--el-main-padding: 16px;
	.el-main{
		margin: 0 auto;
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(22.5rem, 1fr));
		grid-auto-rows: 25rem;
		max-width: 100rem;
		&.fullscreen{
			max-width: 120rem;
		}
		@media all and (min-width: 1920px){
			max-width: 95rem;
			&.fullscreen{
				max-width: 115rem;
			}
		}
		.card-container{
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			transition: all 500ms;
			overflow: hidden;
			@media screen and (min-width: 600px) {
				&.tall {
					grid-row: span 2 / auto;
				}
				&.wide {
					grid-column: span 2 / auto;
				}
				&.large {
					grid-row: span 2 / auto;
					grid-column: span 2 / auto;
				}
			}
		}
	}
}
</style>