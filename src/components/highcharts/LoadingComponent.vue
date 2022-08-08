<template>
    <el-skeleton 
        class="loadingComponent" 
        animated
    >
        <template #template v-loading="loading">
            <el-skeleton-item variant="rect"/>
            <el-skeleton-item variant="caption" />
            <el-skeleton-item variant="text" />
        </template>
    </el-skeleton>
</template>
<style lang="scss">
.loadingComponent{
    position: relative;
    width: 100%;
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
}
</style>