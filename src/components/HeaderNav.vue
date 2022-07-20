<template>
    <el-menu
        :default-active="activeIndex"
        id="MainHeaderBox"
        :class="{fullScreen}"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item index="0" class="logoBox">
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

        <div>
            <el-button 
                @click="handlefull"
                :icon="fullScreen ? Close: FullScreen" 
                link
            />
            <el-button 
                @click="mode = mode === 'dark' ? 'light' : 'dark'"
                :icon="mode === 'dark' ? Moon : Sunny" 
                link
            />
            <el-button circle :icon="User"/>
        </div>
    </el-menu>
</template>

<script setup>
import { User, Moon, Sunny, FullScreen, Close } from '@element-plus/icons-vue'
import { useColorMode } from '@vueuse/core'
const mode = useColorMode({
    class: 'theme'
})
</script>

<script>
export default {
    data(){
        return {
            fullScreen :false,
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
        },
        handlefull(){
            this.fullScreen = !this.fullScreen
            this.$emit('full', this.fullScreen)
        }
    }
}
</script>

<style lang="scss">
#MainHeaderBox{
    height: 100%;
    align-items: center;
    .logoBox{
        img{
            height: 80%;
            filter: var(--filter);
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
    span{
        width: 100%;
        height: 100%; 
    }
}
</style>