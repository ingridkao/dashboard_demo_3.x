<script setup>
import { User, Moon, Sunny, FullScreen, Close } from '@element-plus/icons-vue'
import { ref, defineEmits, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useColorMode } from '@vueuse/core'

const Router = useRoute()
const mode = useColorMode({
    class: 'theme'
})
const activeIndex = ref("city")
const nav = ref([
    {index: "dashboard", title: "我的儀表板", disabled: false},
    {index: "city", title: "城市洞察", disabled: false},
    {index: "feedback", title: "許願池", disabled: true}
])
const fullScreen = ref(false)
const emit = defineEmits(['full'])
const handlefull = (e) => {
    fullScreen.value = !fullScreen.value
    emit("full", fullScreen.value)
}
const handleSelect = () => {}
watch(
    Router,
    (to, from) => {
        activeIndex.value = (from && to.name !== "home")? to.name: "city"
    }
)
</script>

<template>
    <el-menu
        id="MainHeaderBox"
        mode="horizontal"
        :default-active="activeIndex"
        :class="{fullScreen}"
        :ellipsis="false"
        :router="true"
        @select="handleSelect"
    >
        <el-menu-item index="/" class="logoBox">
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