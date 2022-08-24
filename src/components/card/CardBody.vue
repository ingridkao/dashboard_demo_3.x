<script setup>
	import LoadingComponent from '@/components/highcharts/LoadingComponent.vue'
    import { defineAsyncComponent } from 'vue'
    const props = defineProps({
        components: { 
            type: Object || null
        },
        request: { 
            type: Object || null
        },
        belong: { 
            type: String
        },
        margin: {
            type: Number
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

        // The error component will be displayed if a timeout is provided and exceeded. Default: Infinity.
        timeout: 3000
    })

</script>

<template>
    <AsyncComp
        :name="components && components.name? components.name: ''"
        :request="request"
        :components="components"
        :belong="belong"
    />
    <div v-if="margin>1" class="marginBox"/>
</template>

<style lang="scss">
@use '@/assets/styles/hightchart.scss' as *;
</style>
