<script setup>
    const props = defineProps({
        information: { type: Object, default: ()=>{} }
    })
</script>

<template>
    
<!-- {{information}} -->
    <span v-if="information.source_from">{{information.source_from}}</span>
    <el-skeleton v-else/>
    <span v-if="information.sample_data">{{information.sample_data}}</span>
    <el-skeleton v-else/>
</template>

<style lang="scss">
</style>