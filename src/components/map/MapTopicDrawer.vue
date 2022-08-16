<script setup>
	import { ref, computed, defineProps, defineEmits } from 'vue'
	import { useRoute } from 'vue-router'

	import CardContainer from '@/components/card/CardContainer.vue'
	import { TopicList, topicComponentList } from '@/assets/datas/topicList.js'

    const props = defineProps({
        TopicToggle: { type: Boolean, default: false }
    })
	const activeNames = ref([])
	const emit = defineEmits(['update'])
	const handleChange = (val) => {
		emit("update", {
			active: val,
			topicLayer: targetTopicComponent
		})
	}
	const route = useRoute();
	const activeTopic = ref('')
	const targetTopicComponent = computed(()=>{
		if(!route.query.topic) return []
		const target = topicComponentList.find(item => item.index === route.query.topic)
		if(!target) return []
		const targetTopic = TopicList.find(CommonItem => CommonItem.index === target.index)
		activeTopic.value = targetTopic.name
		return target.components
	})
</script>

<template>
	<el-drawer
		v-model="TopicToggle"
		direction="ltr"
		:with-header="false"
	>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">
				<el-icon><House /></el-icon>
			</el-breadcrumb-item>
			<el-breadcrumb-item>{{activeTopic}}</el-breadcrumb-item>
		</el-breadcrumb>

		<el-collapse 
			v-model="activeNames" 
			@change="handleChange"
			class="mapDrawerContainer"
		>
			<el-collapse-item 
				v-for="item in targetTopicComponent"
				:key="item.index"
				:name="item.index"
				:title="item.name" 
			>
				<CardContainer 
					:data="item" 
					:titleShow="false"
				/>
			</el-collapse-item>
		</el-collapse>
	</el-drawer>
</template>
<style lang="scss">
.mapDrawerContainer{
    .highcharts-contextbutton,
    .highcharts-exporting-group{
        display: block;
    }
	.card-container{
		--el-card-padding: .25rem;
		.mapIconRow{
			margin: 1rem 0;
		}
	}
}
</style>