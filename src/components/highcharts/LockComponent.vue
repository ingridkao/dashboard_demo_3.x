<script setup>
    import { ElMessage, ElMessageBox } from 'element-plus'

    const application = () => {
        ElMessageBox.confirm(
            '使用本授權提供之資料，不得惡意變更其相關資訊。',
            '確認申請此組件權限',
            {
                type: 'warning',
                confirmButtonText: '確認申請',
                cancelButtonText: '取消'
            }
        ).then(() => {
            ElMessage({
                type: 'success',
                message: '組件申請成功'
            })
        }).catch(() => {
        //     ElMessage({
        //         type: 'info',
        //         message: '取消'
        //     })
        })
    }
</script>
<template>
    <el-skeleton 
        class="lockComponent" 
        animated
    >
        <template #template>
            <Lock />
            <el-skeleton-item variant="rect"/>
            <el-skeleton-item variant="caption" />
            <el-skeleton-item variant="text" />
            <el-button type="info" :icon="Key" @click="application">申請組件權限</el-button>
        </template>
    </el-skeleton>
</template>
<style lang="scss">
.lockComponent{
    position: relative;
    width: 100%;
    text-align: center;
    .el-skeleton__rect{
        width: 100%;
        height: 15rem;
    }
    svg{
        position: absolute;
        width: 100%;
        height: 5rem;
        top: 5rem;
        opacity: 0.5;
    }
    button{
        margin-top: .5rem;
    }
}
</style>
