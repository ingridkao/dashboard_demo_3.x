<script setup>
    import { ref, defineProps } from 'vue'
    import LockComponent from '@/components/highcharts/LockComponent.vue'
    import CardInformation from '@/components/card/CardInformation.vue'
    import AddCommonlyBtn from '@/components/action/AddCommonlyBtn.vue'

	import CardBody from '@/components/card/CardBody.vue'
    import { Close } from '@element-plus/icons-vue'

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
            <AddCommonlyBtn :text="true"/>
        </template>
        <LockComponent v-if="!data.request_list[0]"/>
        <CardBody v-else
            v-for="item in data.request_list"
            :key="item.index"
            :components="data"
            :request="item"
        />
    </el-card>

    <el-dialog 
		v-model="dialogVisible" 
		width="80%" 
        :show-close="false"
		destroy-on-close
	>
        <template #header="{ close, titleId, titleClass }">
            <el-row 
                justify="space-between"
                align="middle"
                class="dialog-header"
            >
                <h6 :id="titleId" :class="titleClass" align="middle">
                    {{dialogInformation.name? dialogInformation.name: null}}
                    <AddCommonlyBtn :text="false"/>
                </h6>
                <el-button text circle :icon="Close" @click="close"/>
            </el-row>
        </template>
		<CardInformation 
            :information="dialogInformation"
        />
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
    }
    .el-card__body{
        position: relative;
        --el-card-padding: 0 .6rem;
        height: calc(100% - 3rem);
    }
}
</style>
