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
            :item="data.request_list"
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
}
</style>
