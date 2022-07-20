<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-tuic"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="0" class="logo">
            <img 
                src="../assets/img/TUIC.svg"
                alt="城市運營聯合儀表板logo" 
            />
            <span>
                <h1>城市運營聯合儀表板</h1>
                <h2>Taipei City Dashboard</h2>
            </span>
        </el-menu-item>

        <div class="flex-grow" />

        <el-menu-item 
            v-for="item in nav" 
            :key="item.index"
            :index="item.index"
            :disabled="item.disabled"
        >
            <span>{{item.title}}</span>
        </el-menu-item>

        <div class="flex-grow" />

        <el-button circle :icon="User">
        </el-button>
    </el-menu>
</template>

<script setup>
import { User } from '@element-plus/icons-vue'
</script>

<script>
export default {
    data(){
        return {
            activeIndex: "2",
            nav:[
                {index: "1", title: "我的儀表板", disabled: true},
                {index: "2", title: "城市洞察", disabled: false},
                {index: "3", title: "許願池", disabled: true}
            ]
        }
    },
    methods:{
        handleSelect(key="", keyPath=[]){
            switch (key) {
                case "0":
                    this.$router.push({ 
                        path: '/',
                    //     query: { plan: 'private' } 
                    })         
                    break;
                case "2":
                    this.$router.push({ 
                        path: '/city',
                    //     query: { plan: 'private' } 
                    })
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style lang="scss">
.el-menu-tuic{
    height: 100%;
    align-items: center;
    .logo{
        img{
            height: 80%;
            // filter: invert(1);
        }
        span{
            >*{
                margin:0;
                padding: 0;
            }
            margin: 0 0 0 1rem;
            line-height: 150%;
            h1{font-size: 100%;}
            h2{font-size: 30%;}
        }
    }
}
.el-button{
    // padding: 0 !important;
    span{
        width: 100%;
        height: 100%; 
    }
}
.flex-grow {
    flex-grow: 1;
}
</style>