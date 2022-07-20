<template>
    <el-menu
        :default-active="menuActive"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
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
                {{item.title}}
            </template>
        </el-menu-item>

        <!-- 

        <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
        </el-menu-item> -->
    </el-menu>
</template>

<script setup>
import { location } from '@element-plus/icons-vue'
</script>

<script>
export default {
	// components: {},
    data() {
        return {
            menuActive: "1",
            isCollapse: false,
            topics:[
                { index: "1", icon:"location", title: "222", disabled: false}
            ]
        }
    },
    methods:{
        handleOpen(key="", keyPath=[]){
        },
        handleClose(key="", keyPath=[]){
        }
    }

}
</script>

<style lang="scss">
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
