<script setup>
import { User, Moon, Sunny, FullScreen, Close } from '@element-plus/icons-vue'
import { ref, defineProps, defineEmits, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Navigation } from '../router'

const Router = useRoute()
const nav = ref(Navigation)

const fullScreen = ref(false)
const activeIndex = ref("city")
const props = defineProps({
    mode: { type: String }
})
const emit = defineEmits(['full', 'color'])
const handlefull = (e) => {
    fullScreen.value = !fullScreen.value
    emit("full", fullScreen.value)
}
const handleColor = () => {
    emit("color", props.mode)
}
const handleHeaderMenu = () => {}
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
        @select="handleHeaderMenu"
    >
        <el-menu-item index="/" class="logoBox">
            <img 
                src="../assets/img/TUIC.svg"
                alt="城市運營聯合儀表板logo" 
            />
            <span>
                <h1>
                    城市運營聯合儀表板
                    <span>體驗版</span>
                </h1>
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
            <span>{{item.name}}</span>
        </el-menu-item>

        <div class="flex-grow" />

        <div>
            <el-button 
                @click="handlefull"
                :icon="fullScreen ? Close: FullScreen" 
                link
            />
            <el-button 
                @click="handleColor"
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
            h1{
                position: relative;
                font-size: 100%;
                span{
                    position: absolute;
                    top: .1rem;
                    right: -2.5rem;
                    font-size: .1rem;
                }
            }
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