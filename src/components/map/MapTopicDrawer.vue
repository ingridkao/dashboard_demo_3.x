<script setup>
	import { ref, computed, defineProps, defineEmits } from 'vue'
	import { useRoute } from 'vue-router'

	import CardContainer from '@/components/card/CardContainer.vue'
	import { TopicList, MapTopicComponentList } from '@/assets/datas/topicList.js'

    const props = defineProps({
        topicToggle: { type: Boolean, default: false },
        activeNames: { type: Array, default: () => [] }
    })
	const emit = defineEmits(['update'])
	const handleChange = (val) => {
		emit("update", {
			active: val,
			topicLayer: targetTopicComponent
		})
	}
	const route = useRoute()
	const activeTopic = ref('')
	const targetTopicComponent = computed(()=>{
		if(!route.query.topic) return []
		const target = MapTopicComponentList.find(item => item.index === route.query.topic)
		if(!target) return []
		const targetTopic = TopicList.find(CommonItem => CommonItem.index === target.index)
		activeTopic.value = targetTopic.name
		return target.components
	})
	const handleBreadcrumb = computed(()=>{
        return { 
			path: '/',
            query: {
                topic: route.query.topic
            }
		}
	})
</script>

<template>
	<el-drawer
		v-model="props.topicToggle"
		direction="ltr"
		modal-class="mapDrawerModalEl"
		custom-class="mapTopicDrawerContainer"
		:modal="false"
		:size="300"
	>
		<template #header="{}">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="handleBreadcrumb">
					<el-icon><House /></el-icon>
				</el-breadcrumb-item>
				<el-breadcrumb-item>{{activeTopic}}</el-breadcrumb-item>
			</el-breadcrumb>
		</template>
		<el-collapse 
			v-model="props.activeNames" 
			@change="handleChange"
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
.mapDrawerModalEl{
	width: 300px;
}
.mapTopicDrawerContainer{
	.el-drawer{
		&__header{
			margin-bottom: 0.5rem;
		}
		&__body{
			padding-top: 0;
		}
	}
	.card-container{
		--el-card-padding: .25rem;
		.mapIconRow{
			margin: 1rem 0 1rem 0.5rem;
		}
	}
}
</style>