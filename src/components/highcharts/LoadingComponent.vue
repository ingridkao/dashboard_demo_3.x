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
        </template>
    </el-skeleton>
</template>
<style lang="scss">
.lockComponent{
    position: relative;
    width: 100%;
    .el-skeleton__rect{
        width: 100%;
        height: 10rem;
    }
    svg{
        position: absolute;
        width: 100%;
        height: 5rem;
        top: 2.5rem;
        opacity: 0.5;
    }
}
</style>
