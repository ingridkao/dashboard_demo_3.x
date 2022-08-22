<script setup>
    import { computed } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import LockComponent from '@/components/highcharts/LockComponent.vue'
	import CardBody from '@/components/card/CardBody.vue'

    const props = defineProps({
        menuActive: {type: String, default: ''},
        information: { type: Object, default: ()=>{} }
    })
    const Info = [
        {index: "desc", label: "組件說明", value: ""},
        {index: "last",label: "最新數據", value: ""},
        {index: "work",label: "相關案例", value: ""},
        {index: "same",label: "相關組件", value: ""},
        {index: "sample_data",label: "紀錄時間", value: ""},
        {index: "source_from",label: "資料來源", value: ""},
    ]
    const router = useRouter()
    const route = useRoute()
    const routeToMap = () => {
        router.push({
            name: 'mapview',
            query: {
                ...route.query,
                topic: props.menuActive,
                component: props.information.index
            }
        })
    }
    const MapBtnShow = computed(() => {
        return route.name !== 'mapview' && props.information.map_config
    })

</script>

<template>
    <el-row class="informationContainer">
        <el-col :xs="24" :span="18">
            <LockComponent
                v-if="!information.request_list[0]"
            />
            <CardBody 
                v-else
                v-for="item in information.request_list"
                :key="item.index"
                :name="information.name"
                :request="item"
                :belong="`information_${route.name}`"
            />
        </el-col>
        <el-col :xs="24" :span="6" class="informationBox">
            <div>
                <div v-for="item in Info" :key="item.index" class="informationDesc">
                    <label>{{item.label}}：</label>
                    <p v-if="information[item.index] && information[item.index] !=''">{{information[item.index]}}</p>
                    <p v-else-if="item.value !==''">{{item.value}}</p>
                    <el-skeleton v-else variant="p" rows="1" animated style="width:100%;height: 1rem;overflow: hidden;"/> 
                </div>
            </div>
            <div>
                <el-button v-if="MapBtnShow" type="info" size="small" @click="routeToMap">地圖交叉查詢</el-button>
                <el-button v-if="information.calculation_config" type="info" size="small">時間軸檢視</el-button>
            </div>
        </el-col>
    </el-row>
</template>

<style lang="scss">
.informationContainer{
    height: 55vh;
    .highcharts-contextbutton,
    .highcharts-exporting-group{
        display: block;
    }
    .informationBox{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .informationDesc{
            padding-left: 10px;
            >*{
                padding-left: 1rem;
            }
            label{
                padding-left: 0;
            }
        }
    }
}
</style>