<script setup>
    import { ref, defineProps, onMounted } from 'vue'
    import { ElMessage } from 'element-plus'
	import { Plus } from '@element-plus/icons-vue'
	import { GetCommonlyList, GetCustomComponent, SetCustomComponent } from '@/assets/datas/commonlyList.js'

	const CommonlyList = GetCommonlyList()
	const CustomComponent = GetCustomComponent()

    const props = defineProps({
        text: { type: Boolean, default: false },
        component: { type: Object, default: () => {} }
    })
    const componentIndex = props.component.index
    const checkboxs = ref({
        option: CommonlyList.map(item => item.name),
        select: []
    })
    const addCommonly = () => {
        if(!props.component) return
        const likeArray = checkboxs.value.select
        if(likeArray.length === 0) return
        console.log(CustomComponent);
        // SetCustomComponent(CommonlyList, CustomComponent, componentIndex)
        // ElMessage({
        //     type: 'success',
        //     message: '加入成功'
        // })
	}
    onMounted(() => {
        //Check checkbox option 
        Object.keys(CustomComponent).map(item => {   
            const componentArray = CustomComponent[item]
            if(componentArray.includes(componentIndex)){
                const targetTopic = CommonlyList.find(CommonItem => CommonItem.id === item)
                checkboxs.value.select.push(targetTopic.name)
            }
        })
    })
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
            v-model="checkboxs.select" 
            size="small"
            class="commonlyList"
        >
            <el-checkbox 
                v-for="item in checkboxs.option"
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