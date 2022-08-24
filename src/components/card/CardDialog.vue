<script setup>
    import { ref, defineProps, defineEmits } from 'vue'
    import CardInformation from '@/components/card/CardInformation.vue'
    import AddCommonlyBtn from '@/components/action/AddCommonlyBtn.vue'
    import { Close } from '@element-plus/icons-vue'

    const props = defineProps({
        menuActive: {type: String, default: ''},
        dialogVisible: { type: Boolean, default: false },
        dialogInformation: { type: Object, default: ()=>{} },
        data: { type: Object, default: ()=>{} }
    })
    const emit = defineEmits(['closeDialog'])
    const Dialogclose =() => {
        emit("closeDialog")
    }
</script>
<template>
    <el-dialog 
		v-model="props.dialogVisible" 
        :show-close="false"
		width="80%" 
		destroy-on-close
	>
        <template #header="{ titleId, titleClass }">
            <el-row 
                justify="space-between"
                align="middle"
                class="dialog-header"
            >
                <h6 :id="titleId" :class="titleClass" align="middle">
                    {{props.dialogInformation && props.dialogInformation.name? props.dialogInformation.name: null}}
                    <AddCommonlyBtn :text="false" :component="data"/>
                </h6>
                <el-button text circle :icon="Close" @click="Dialogclose"/>
            </el-row>
        </template>
		<CardInformation 
            :menuActive="props.menuActive"
            :information="props.dialogInformation"
        />
	</el-dialog>
</template>