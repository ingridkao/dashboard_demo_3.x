<script setup>
    import { defineProps } from 'vue'
	import CardBody from '@/components/card/CardBody.vue'
    import { Plus } from '@element-plus/icons-vue'

    const props = defineProps({
        data: { type: Object, required: true, default: ()=>{} }
    })
</script>

<template>
    <el-card
        :class="['card-container', data.overview_display]"
    >
        <template #header>
            <h6>{{ data.name }}</h6>
            <el-button class="hoverBtn" text :icon="Plus"/>
        </template>
        <CardBody
            v-for="item in data.request_list"
            :key="item.index"
            :item="item"
        />
    </el-card>
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
        padding-top: 0;
        padding-bottom: 0;
        height: calc(100% - 4rem);
        .chartContainer{
            height: 100%;
        }
    }
}
</style>
