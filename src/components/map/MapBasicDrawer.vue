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
		:with-header="false"
	>
		<el-collapse 
			v-model="activeNames" 
			@change="handleChange"
			class="mapDrawerContainer"
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