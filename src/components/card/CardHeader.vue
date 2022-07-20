<script setup>
    import { toRefs } from 'vue'
    const props = defineProps({
        // type: { type: String, required: true },
        title: { type: String, required: false, default: '' },
        // showReload: { type: Boolean, required: false, default: false },
    })
    const { title } = toRefs(props)
</script>

<template>
    <span>{{ title }}</span>
    <el-button class="button" text>
        button
    </el-button>
</template>

<style lang="scss">

</style>
