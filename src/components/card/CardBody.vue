<script setup>
	import LoadingComponent from '@/components/highcharts/LoadingComponent.vue'
    import { defineAsyncComponent } from 'vue'
    const props = defineProps({
        request: { 
            type: Object || null
        }
    })
    const AsyncComp = defineAsyncComponent({
        // the loader function
        loader: () => import(`../highcharts/${props.request.type}.vue`),

        // A component to use while the async component is loading
        loadingComponent: LoadingComponent,
        // Delay before showing the loading component. Default: 200ms.
        delay: 200,

        // A component to use if the load fails
        //   errorComponent: ErrorComponent,
        // The error component will be displayed if a timeout is
        // provided and exceeded. Default: Infinity.
        timeout: 3000
    })

</script>

<template>
    <AsyncComp
        :config="request.config? request.config: {}"
        :dataset="request.data? request.data: []"
    />

    <!-- <el-empty 
        v-if="!request.data[0]"
        description="No data"
    /> -->
</template>

<style lang="scss">
.highcharts{
    &-background {
        fill: var(--el-fill-color-blank);
    }
    &-grid-line {
        stroke: var(--el-text-color-regular);
        stroke-opacity: 0.2;
    }
    &-exporting-group{
        transform: translate(-5px, 2.5px);
    }
    &-button-box {
        fill: var(--el-bg-color-page);
        path{
            fill: var(--el-text-color-regular);
        }
    }
    &-tooltip-box{
        fill: rgba(255,255,255,0.5);
    }
    &-column-series {
        rect.highcharts-point {
            stroke: var(--el-fill-color-blank);
        }
    }
}
.highcharts-subtitle,
.highcharts-credits,
.highcharts-axis-title {
    fill-opacity: 0.8;
}
</style>
