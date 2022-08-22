<script setup>
	import { ref, defineProps, defineEmits } from 'vue'
	import { basicMapLayer } from '@/assets/datas/topicList.js'
	import CardContainer from '@/components/card/CardContainer.vue'
    const props = defineProps({
        BasicListToggle: { type: Boolean, default: false }
    })
	const activeNames = ref([])
	const emit = defineEmits(['update'])
	const handleChange = (val) => {
		emit("update", val)
	}
</script>

<template>
	<el-drawer
		v-model="BasicListToggle"
		direction="ltr"
		modal-class="mapDrawerModalEl"
		custom-class="mapBasicDrawerContainer"
		:modal="false"
		:size="300"
	>
		<template #header="{ titleId, titleClass }">
			<h6 :id="titleId" :class="titleClass">
				<el-icon><Briefcase /></el-icon>
				基本圖資
			</h6>
		</template>
		<el-collapse 
			v-model="activeNames" 
			@change="handleChange"
		>
			<el-collapse-item 
				v-for="item in basicMapLayer"
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
.mapBasicDrawerContainer{
	.el-drawer{
		&__header{
			margin-bottom: .5rem;
		}
		&__body{
			padding-top: 0;
		}
		&__title{
			display: inline-flex;
			font-weight: 400;
			color: var(--el-text-color-regular);
			cursor: text;
			font-size: 14px;
			line-height: 1;
			i{
				margin-right: .5rem;
			}
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