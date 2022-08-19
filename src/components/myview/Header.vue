<script setup>
	import { ref, reactive, defineEmits, defineProps, watch } from 'vue'
	import { Plus } from '@element-plus/icons-vue'
	import { StrChRules, SetCommonlyList, DeleteCommonlyList } from '@/assets/datas/commonlyList.js'

	const TopicTarget = ref(null)
	const TopicStart = ref(false)
	const TopicName = ref('')
	const emit = defineEmits(['update'])
    const props = defineProps({
        tabs: { type: Object, default: ()=>{} }
    })

	const fetchTopic = () => {
		return props.tabs.list.find(item => item.id === props.tabs.active)
	}
	const cancleAction = () => {
		TopicName.value = ""
		TopicStart.value = false
	}
	const commitAction = () => {
		const CommonlyArray =  SetCommonlyList(props.tabs.list, TopicName.value, TopicTarget.value)
		emit("update", CommonlyArray)
		cancleAction()
	}
	const createTopic = () => {
		TopicTarget.value = null
		TopicStart.value = true
	}
	const editTopic = (e) => {
		const Active = fetchTopic()
		TopicTarget.value = Active.id
		TopicStart.value = true
		TopicName.value = Active? Active.name: ''
	}
	const deleteTopic = () => {
		const Active = fetchTopic()
		const CommonlyArray = DeleteCommonlyList(props.tabs.list, Active)
		emit("update", CommonlyArray, true)
		cancleAction()
	}
	const validateString = (rule, value, callback) => {
		if (TopicName.value === '') {
			callback(new Error('請填寫名稱'))
		} else if (!StrChRules.test(TopicName.value)) {
			callback(new Error("請輸入中英文數字"))
		} else {
			callback()
		}
	}
	const formRules = reactive({
		name: [{ validator: validateString, trigger: 'blur' }]
	})
	watch(props.tabs.active, (state) => {
		if(state) cancleAction()
	})
</script>

<template>
	<el-row justify="space-between" align="middle">
		<div>
			<el-form 
				v-if="TopicStart" 
				ref="ruleFormRef" 
				status-icon
				:rules="formRules"
				@submit.prevent
			>
				<el-form-item prop="name">
					<el-input
						v-model="TopicName"
						type="text"
						maxlength="10"
						placeholder="請輸入儀表板名稱"
						show-word-limit
						autocomplete="off"
						@keyup.enter="commitAction"
					/>
				</el-form-item>
			</el-form>
		</div>
		<div>
			<div v-if="TopicStart">
				<el-button round size="default" @click="cancleAction">取消</el-button>
				<el-button round size="default" @click="commitAction">完成</el-button>
			</div>
			<div v-if="!TopicStart">
				<el-button round size="default" circle :icon="Plus" @click="createTopic"/>
				<el-button round size="default" @click="editTopic">編輯</el-button>
				<el-popconfirm title="確認要刪除此主題?" @confirm="deleteTopic">
					<template #reference>
					<el-button round size="default">刪除</el-button>
					</template>
				</el-popconfirm>
			</div>
		</div>
	</el-row>
</template>