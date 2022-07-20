<template>
    <el-menu
        id="cityAsideMenu"
        :collapse="isCollapse"
        :default-active="menuActive"
        @open="handleOpen"
        @close="handleClose"
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
                {{item.title}}
            </template>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            menuActive: "1",
            isCollapse: false,
            topics:[
                { index: "1", icon:"ChatDotRound", title: "民情熱議", disabled: false},
                { index: "2", icon:"Van", title: "城市交通", disabled: false},
                { index: "3", icon:"OfficeBuilding", title: "城市建設", disabled: false},
                { index: "4", icon:"Aim", title: "城市安防", disabled: false}
            ]
        }
    },
    methods:{
        handleOpen(key="", keyPath=[]){
        },
        handleClose(key="", keyPath=[]){
        },
        handleSelect(key="", keyPath=[]){
            
        }
    }

}
</script>

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
}
</style>
