<script setup>
    import { ref, defineProps } from 'vue'
    import { ElMessage } from 'element-plus'
	import { Plus } from '@element-plus/icons-vue'
	import { CommonlyList } from '@/assets/datas/commonlyList.js'

    const CheckedOption = ref(CommonlyList.map(item => item.title))
    const CommonlyValue = ref([])
    const props = defineProps({
        text: { type: Boolean, default: false }
    })
    const addCommonly = () => {
        if(CommonlyValue.value.length === 0) return
        ElMessage({
            type: 'success',
            message: '加入成功'
        })
	}
</script>
<template>
    <el-popover 
        trigger="click"
        placement="bottom" 
    >
        <template #reference>
            <el-button 
                class="plusBtn" 
                :text="text"
                :round="!text"
                :icon="Plus"
                circle
            />
        </template>
        <el-checkbox-group 
            v-model="CommonlyValue" 
            size="small"
            class="commonlyList"
        >
            <el-checkbox 
                v-for="item in CheckedOption"
                :key="item"
                :label="item" 
            />
        </el-checkbox-group>
        <div class="commonlyBtn">
            <el-button 
                type="primary" 
                size="small"
                @click="addCommonly"
            >
                加入我的儀表板
            </el-button>
        </div>
    </el-popover>
</template>
<style lang="scss">
.el-button.plusBtn{
    --el-button-text-color: transparent;
    &:hover,
    &:focus{
        --el-button-text-color: var(--el-text-color-regular);
    }
    &.is-round{
        --el-button-text-color: var(--el-text-color-regular);
        padding: .5rem;
        height: 1.25rem;
        width: 1.25rem;
    }
}
.commonlyList .el-checkbox{
    margin-bottom: .25rem;
}
.commonlyBtn{
    margin-top: 1rem;
    text-align: right;
}
</style>