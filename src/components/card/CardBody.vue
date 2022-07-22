<script setup>
    const props = defineProps({
        item: { type: Array, required: true, default: ()=>[] }
    })
</script>

<template>
    <div>
        {{props.item}}
    </div>
</template>

<style lang="scss">

</style>
