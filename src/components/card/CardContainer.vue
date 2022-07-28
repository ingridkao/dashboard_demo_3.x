<script setup>
    import { ref, defineProps } from 'vue'
    import LoadingComponent from '@/components/highcharts/LoadingComponent.vue'
    import CardInformation from '@/components/card/CardInformation.vue'

	import CardBody from '@/components/card/CardBody.vue'
    import { Plus } from '@element-plus/icons-vue'

	const dialogVisible = ref(false)
	const dialogInformation = ref({})
    const props = defineProps({
        data: { type: Object, default: ()=>{} }
    })
    const handleDialog = (info) => {

		dialogVisible.value = true
		dialogInformation.value = info
	}
</script>

<template>
    <el-card
        :class="[
            'card-container',
            data.overview_display
        ]"
        :style="{
            order: data.order
        }"
    >
        <template #header>
            <h6 @click="handleDialog(data)">
                {{ data.name }}
            </h6>
            <el-button class="hoverBtn" text :icon="Plus"/>
        </template>

        <LoadingComponent v-if="!data.request_list[0]"/>
        <CardBody v-else
            v-for="item in data.request_list"
            :key="item.index"
            :name="data.name"
            :request="item"
            class="cardComponent"
        />
    </el-card>

    <el-dialog 
		v-model="dialogVisible" 
		:title="dialogInformation.name? dialogInformation.name: null" 
		width="50%" 
		draggable
		destroy-on-close
	>
		<CardInformation :information="dialogInformation"/>
	</el-dialog>
</template>

<style lang="scss">
.card-container{
    .el-card__header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom-color: transparent;
        padding-bottom: 0;
        h6{
            margin: 0;
            font-size: 1.25rem;
            font-weight: bold;
            cursor: pointer;
        }
        .hoverBtn{
            width: 2rem;
            height: 2rem;
            border-radius: 2rem;
            color: transparent;
            &:hover{
                color: var(--el-text-color); 
            }
        }
    }
    .el-card__body{
        position: relative;
        padding-top: 0;
        padding-bottom: 0;
        height: calc(100% - 4rem);
    }
}
</style>
