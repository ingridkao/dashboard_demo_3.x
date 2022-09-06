<script setup>
	import { useRouter, useRoute } from 'vue-router'

	import { TopicList, topicComponentList} from '@/assets/datas/topicList.js'
	import AsideBar from '@/components/city/AsideBar.vue'
	import CardContainer from '@/components/card/CardContainer.vue'

	import { ref, computed, watch } from 'vue'
	import { useWindowSize, useFullscreen } from '@vueuse/core'
	const { width, height } = useWindowSize()
	const { isFullscreen } = useFullscreen()
	const isCollapse = ref(false)
	const menuActive = ref("")

	const router = useRouter()
    const route = useRoute()

	if(route.query && route.query.topic){
		menuActive.value = route.query.topic
	}else{
		menuActive.value = TopicList[0]['index']
	}
	const handleSelect = (e) => {
        menuActive.value = e
        router.push({
            query: {
                ...route.query,
                topic: e
            }
        })
	}
	const handleCollapse = () => {
		isCollapse.value = !isCollapse.value
	}
	const targetTopic = computed(()=> topicComponentList.find(item => item.index === menuActive.value))
	watch(isFullscreen, (state) => {
		if(state) isCollapse.value = true
	})
</script>

<template>
<el-container id="cityViewContainer">
	<el-aside 
		class="asideContainer"
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
				@update="handleSelect"
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
				:menuActive="menuActive"
			/>
		</el-main>
	</el-scrollbar>
</el-container>
</template>

<style lang="scss">
#cityMainContainer{
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
					.marginBox{
						margin-top: 2.5rem;
					}
					.chartContainer.column{
						max-height: 20rem;
					}
				}
				&.wide {
					grid-column: span 2 / auto;
					&.multiple{
						.el-card__body{
							display: inline-flex;
						}
						.chartContainer.column{
							max-width: 50%;
						}
						.chartContainer.circle{
							max-width: 50%;
						}
						.columnActionBts{
							max-width: 5rem;
							align-content: space-evenly;
						}
					}
					.marginBox{
						margin-left: .5rem;
					}
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