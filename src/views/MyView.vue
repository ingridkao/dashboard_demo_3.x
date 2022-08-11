<script setup>
	import { reactive, computed } from 'vue'
	import Header from '@/components/myview/Header.vue'
	import CardContainer from '@/components/card/CardContainer.vue'
	import { GetCommonlyList, ParseCommonlyComponent } from '@/assets/datas/commonlyList.js'
	import { useFullscreen } from '@vueuse/core'

	const { isFullscreen } = useFullscreen()
	const CommonlyList = GetCommonlyList()
	const topicComponentList = ParseCommonlyComponent()
	const state = reactive({
		list: CommonlyList,
		active: CommonlyList[0]['id']
	})

	const targetTopic = computed(()=>{
		const target = topicComponentList.find(item => item.index === state.active)
		return target? target.components: []
	})
	const updateComponent = (obj, init) => {
		state.list = obj
		if(init){
			state.active = CommonlyList[0]['id']
		}
	}
</script>

<template>
	<el-main 
		id="myViewContainer"
		:class="{
			fullscreen: isFullscreen
		}"
	>	
		<Header 
			:tabs="state"
			@update="updateComponent"
		/>
		<el-tabs 
			v-model="state.active" 
			@tab-click="handleTabClick" 
		>
			<el-tab-pane
				v-for="item in state.list"
				:key="item.id"
				:label="item.name"
				:name="item.id"
				class="cardScrollbarBox el-scrollbar"
			>
				<CardContainer
					v-for="item in targetTopic"
					:key="item.index"
					:data="item"
				/>
			</el-tab-pane>
		</el-tabs>
	</el-main>
</template>

<style lang="scss">
#myViewContainer{
	margin: 0 auto;
	max-width: 80rem;
	&.fullscreen{
		max-width: 100rem;
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
	.cardScrollbarBox{
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(22.5rem, 1fr));
		grid-auto-rows: 25rem;
		height: calc(100vh - 12rem);
		overflow: scroll;
	}
}
</style>