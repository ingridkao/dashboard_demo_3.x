<script setup>
	import { topicList } from '@/assets/datas/topicList.js'
	import { ref, defineProps, defineEmits } from 'vue'
    import { useFullscreen } from '@vueuse/core'
    const { isFullscreen } = useFullscreen()
    const topics = ref(topicList)
    const props = defineProps({
        isCollapse: { 
            type: Boolean,
            default: false
        },
        menuActive: { 
            type: String,
            default: ''
        }
    })
    const emit = defineEmits(['collapse', 'update'])
	const updateCollapse = () => {
        emit("collapse", !props.isCollapse)
	}
	const handleSelect = (e) => {
        emit("update", e)
	}
</script>

<template>
    <el-menu
        id="cityAsideMenu"
        :collapse="props.isCollapse"
        :default-active="props.menuActive"
        @select="handleSelect"
    >
        <el-menu-item 
            v-for="item in topics"
            :key="item.index"
            :index="item.index"
            :disabled="item.disabled"
        >
            <el-icon>
                <component v-bind:is="item.icon"/>
            </el-icon>
            <template #title>
                {{item.name}}
            </template>
        </el-menu-item>
        <el-button 
            v-if="!isFullscreen"
            id="collapseBtn"
            size="large"
            text 
            @click="updateCollapse"
        >
            <el-icon>
                <DArrowRight v-if="props.isCollapse"/>
                <DArrowLeft v-else/>
            </el-icon>
        </el-button>
    </el-menu>
</template>

<style lang="scss">
#cityAsideMenu{
    background-color: var(--el-bg-color-page);
    &:not(.el-menu--collapse) {
        width: 100%;
        .el-menu-item{
            height: 1rem;
            line-height: 1.5;
            margin: 1.5rem 0 0 3rem;
            padding: 1rem 0 1rem 1.25rem;
            > i {
                margin-right: 1rem;
            }
            &.is-active{
                padding-left: 1rem;
                border-left: .25rem solid var(--el-menu-text-color);
                color: var(--el-text-color-primary);
                font-weight: bold;
            }
        }
    }
    #collapseBtn{
        padding-left: 1.5rem;
    }
}
</style>
