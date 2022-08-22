<template>
    <div class="popupBox">
        <h6>{{ TargetComponent? TargetComponent['title']: '' }}</h6>
        <div 
            class="propertieBox"
            v-for="(item, i) in targetPropertie"
            :key="i"
        >
            <div v-if="item !== ''">
                <span :style="{width: `${strCount}em`}">{{i}}</span>
                <span :style="{width: `calc(100% - ${strCount}em)`}">
                    <img v-if="i === 'img'" :src="item" :alt="item"/>
                    <el-link v-else-if="i === 'Link'" 
                        :href="item" 
                        target="_blank" 
                        rel="noreferrer noopenner"
                    >專案連結</el-link>
                    <div v-else>{{item}}</div>
                </span>
            </div>
        </div>
        <el-pagination 
            v-model:currentPage="page"
            small
            layout="prev, pager, next"
            :page-count="featureCount"
            :hide-on-single-page="true"
            @current-change="handleCurrentChange"
        />
    </div>
</template>
 
<script>
import { ElPagination } from 'element-plus'
export default {
    components: { ElPagination },
    data(){
        return {
            page: 1,
            strCount: 3,
            TargetComponent: {},
            targetPropertie: {}
        }
    },
    computed: {
        featureCount(){
            return this.featureDatas.length
        }
    },
    methods:{
        handleCurrentChange(val){
            this.page = val
            this.parseProperties()
        },
        parseProperties(){
            this.targetPropertie = {}
            this.strCount = 3
            this.TargetComponent = this.componentDatas && this.componentDatas[this.page - 1]? this.componentDatas[this.page - 1]: {}
            const TargetFeature = this.featureDatas[this.page - 1]? this.featureDatas[this.page - 1]: {}
            const TargetComponentProperty = this.TargetComponent.property
            const TargetFeatureProperties = TargetFeature.properties
            if(Array.isArray(TargetComponentProperty) && TargetComponentProperty.length >0){
                TargetComponentProperty.map(item => {
                    if(typeof item === 'object'){
                        /**
                         * Array format
                         * [{"key":"","name":""},
                         *  {"key":"id","name":"專案連結", "link":"href url"},
                         *  {"key":"Date","name":"紀錄時間", "format":"YYYY-MM-DD"},
                         *  {"key":"RouteName","name":"公車(中文)", "obj":"Zh_tw"},
                         *  {"key":"RouteName","name":"公車(英文)", "obj":"En"}...
                         * ]
                         */
                        const {key, name, link, format, obj } = item
                        this.UpdateStrMaxlength(name)
                        let featureValue = TargetFeatureProperties[key]
                        if(obj){
                            const FeatureObj = JSON.parse(featureValue)
                            this.targetPropertie[name] = (FeatureObj? FeatureObj[obj]: '--')
                        }else if(link){
                            this.targetPropertie['Link'] = `${link}/${featureValue}`
                        }else{
                            this.parseText(name, featureValue, item)
                        }
                    }
                })
            }else{
                Object.keys(TargetFeatureProperties).map(item => {
                    this.parseText(item, TargetFeatureProperties[item])
                    this.UpdateStrMaxlength(item)
                })
            }
        },
        parseText(keyname, featureValue, item={}){
            const {format} = item
            if(typeof featureValue === 'number'){
                featureValue = featureValue === 0? '0': parseFloat(featureValue.toFixed(2))
            // }else if(keyname.includes('時間') && dayjs(featureValue).isValid() && dayjs(featureValue).year()>1900){
            //     featureValue = dayjs(featureValue).format(format? format: DisplayTimeFormat)
            }else if(keyname.includes('狀況')){
                featureValue = featureValue == 1 ? '啟用':'停用'
            }
            this.targetPropertie[keyname] = (featureValue? featureValue: '--')
        },
        UpdateStrMaxlength(keyname){
            if(keyname.length > this.strCount){
                this.strCount = keyname.length
            }
        }
    },
    mounted() {
        this.page = 1
        this.parseProperties()
    }
}
</script>
<style lang="scss">
.mapboxgl-popup-tip{
    border-top-color: var(--order) !important;
}
.mapboxgl-popup-content{
    background-color: rgba(18, 18, 18,0.8);
    border: 1px solid var(--order);
    color: var(--gray);
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    min-width: 20rem;
    .mapboxgl-popup-close-button{
        font-size: 1.5rem;
        width: 1.5rem;
        top: .5rem; 
        right: .5rem;
        color: var(--white);
    }
}
.popupBox {
    text-align: left;
    min-height: 8em;
    h6{
        color: var(--white);
    }
    .propertieBox{
        >div{
            display: inline-flex;
        }
        span{
            word-break: break-all;
            color: var(--text-main-l2);
            &:last-child{
                color: var(--white);
                img{
                    height: 8rem;
                    font-size: 0.75rem;
                }
            }
        }
    }
    // >.custom_pagination {
    //     text-align: right;
    //     list-style-type: none;
    //     li {
    //         padding: 0 .5rem;
    //         color: var(--text-main-l2);
    //         cursor: pointer;
    //         &.active {
    //             color: var(--white);
    //         }
    //     }
    // }
}
</style>