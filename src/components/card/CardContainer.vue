<script setup>
	import CardHeader from '@/components/card/CardHeader.vue'
    const props = defineProps({
        // type: { type: String, required: true },
        // title: { type: String, required: false, default: '' },
        // showReload: { type: Boolean, required: false, default: false },
    })
    // const { title } = toRefs(props)

</script>

<template>
    <el-card class="card-container">
        <template #header>
            <CardHeader
                :class="['card-header']"
                :title="12312323"
            />
        </template>
        <div 
            v-for="o in 4" 
            :key="o" 
            class="text item"
        >
            {{ 'List item ' + o }}
        </div>
    </el-card>
</template>

<style lang="scss">
.card-container{
    .el-card__header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
