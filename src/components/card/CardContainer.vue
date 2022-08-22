<script setup>
    import { ref, defineProps } from 'vue'
    import { useRoute } from 'vue-router'

    import LockComponent from '@/components/highcharts/LockComponent.vue'
    import CardDialog from '@/components/card/CardDialog.vue'
    import AddCommonlyBtn from '@/components/action/AddCommonlyBtn.vue'
	import CardBody from '@/components/card/CardBody.vue'

	const dialogVisible = ref(false)
	const dialogInformation = ref({})
    const route = useRoute()

    const props = defineProps({
        menuActive: { type: String, default: ''},
        titleShow: { type: Boolean, default: true },
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
        <template #header v-if="titleShow">
            <h6 @click="handleDialog(data)">
                {{ data.name }}
            </h6>
            <AddCommonlyBtn :text="true" :component="data"/>
        </template>
        <LockComponent v-if="!data.request_list[0]"/>
        <CardBody v-else
            v-for="item in data.request_list"
            :key="item.index"
            :components="data"
            :request="item"
            :belong="`card_${route.name}`"
        />
        <el-button 
            v-if="!titleShow" 
            text 
            size="small"
            class="infoTextBtn"
            @click="handleDialog(data)"
        >
            更多資訊
        </el-button>
    </el-card>

    <CardDialog
        :menuActive="menuActive"
        :data="data"
        :dialogVisible="dialogVisible"
        :dialogInformation="dialogInformation"
    />
</template>

<style lang="scss">
.card-container{
    position: relative;
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
        padding: 0 var(--el-card-padding);
        height: calc(100% - 3rem);
    }
}
.infoTextBtn{
    position: absolute;
    right: 0;
    bottom: -1rem;
    opacity: 0.25;
    &:hover{
        opacity: 0.5;
    }
}
.mapBasicDrawerContainer,
.mapTopicDrawerContainer{
    .infoTextBtn{
        bottom: 0;
    }
}
</style>
