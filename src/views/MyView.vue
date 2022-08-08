<script setup>
	import { CommonlyList } from '@/assets/datas/commonlyList.js'
	import { topicList, topicComponentList} from '@/assets/datas/topicList.js'

	import CardContainer from '@/components/card/CardContainer.vue'

	import { ref, computed } from 'vue'
	import { useFullscreen } from '@vueuse/core'
	import { Plus } from '@element-plus/icons-vue'
	const { isFullscreen } = useFullscreen()

	const tabs = ref(CommonlyList)
	const tabActive = ref('traff')

	// const isCollapse = ref(false)
	const menuActive = ref(topicList[0]['index'])
	const targetTopic = computed(()=>{
		return topicComponentList.find(item => item.index === menuActive.value)
	})
	const activeName = ref('first')
	const handleTabClick = (e) => {
		// console.log(e)
	}
	const TopicAction = ref(false)
	const TopicName = ref('')
	const createTopic = (e) => {
		TopicAction.value = true
	}
	const editTopic = (e) => {
		TopicAction.value = true
		const Active = CommonlyList.find(item => item.index === tabActive.value)
		TopicName.value = Active? Active.title: ''
	}
	const cancleAction = (e) => {
		TopicAction.value = false
		TopicName.value = ""
	}
	const sendAction = (e) => {
		TopicAction.value = false
	}

</script>

<template>
	<el-main 
		id="myViewContainer"
		:class="{
			fullscreen: isFullscreen
		}"
	>	
		<el-row justify="space-between" align="middle">
			<div >
				<div v-if="TopicAction">
					<el-input
						v-model="TopicName"
						type="text"
						maxlength="10"
						placeholder="請輸入儀表板名稱"
						show-word-limit
					/>
				</div>
			</div>
			<div>
				<div v-if="TopicAction">
					<el-button round size="default" @click="cancleAction">取消</el-button>
					<el-button round size="default" @click="sendAction">完成</el-button>
				</div>
				<div v-if="!TopicAction">
					<el-button round size="default" circle :icon="Plus" @click="createTopic"/>
					<el-button round size="default" @click="editTopic">編輯</el-button>
				</div>
			</div>
		</el-row>

		<el-tabs 
			v-model="tabActive" 
			@tab-click="handleTabClick" 
		>
			<el-tab-pane
				v-for="item in tabs"
				:key="item.index"
				:label="item.title"
				:name="item.index"
				class="cardScrollbarBox el-scrollbar"
			>
				<CardContainer
					v-for="item in targetTopic.components"
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