<script setup>
	import LineBasic from '@/components/highcharts/LineBasic.vue'
	import WordCloud from '@/components/highcharts/WordCloud.vue'
    const props = defineProps({
        item: { 
            type: Object, 
            default: () => {}
        }
    })
</script>

<template>
    <!-- {{item}} -->
    <WordCloud
        :config="item.config"
        :data="item.data"
    />
    <!-- <component 
        v-bind:is="item.type"
        :data="item.data"
    /> -->
</template>

<style lang="scss">
.highcharts-background {
    fill: var(--el-fill-color-blank);
}
.highcharts-subtitle,
.highcharts-credits,
.highcharts-axis-title {
    fill-opacity: 0.8;
}
.highcharts-grid-line {
    stroke: var(--el-text-color-regular);
    stroke-opacity: 0.2;
}
.highcharts-exporting-group{
    transform: translate(-5px, 2.5px);
}
.highcharts-button-box {
    fill: var(--el-bg-color-page);
    path{
        fill: var(--el-text-color-regular);
    }
}
.highcharts-tooltip-box{
    fill: rgba(255,255,255,0.5);
}
.highcharts-column-series rect.highcharts-point {
    stroke: var(--el-fill-color-blank);
}
</style>
