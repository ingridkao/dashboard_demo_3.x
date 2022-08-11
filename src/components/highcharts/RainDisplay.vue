<template>
	<div class="rainFilterContainer">
		<el-row align="middle">
			<el-col class="label">近一小時降雨量</el-col>
			<el-col>
				<el-select 
					v-model="rainValue" 
					placeholder="請選擇"
				>
					<el-option
						v-for="item in rainOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<label>可能積水範圍</label>	
			</el-col>
		</el-row>
		<el-row class="mapIconRow">
			<el-col :span="24" class="label">
				可能積水深度
			</el-col>
			<el-col 
				v-for="(contentItem, contentIndex) in mapLabel" 
				:key="contentItem.index" 
				:span="24"
			>
				<div>
					<span 
						class="mapIcon" 
						:style="translateStyle(contentItem, contentIndex)"
					/>
					<span>
						{{contentItem.name}}
					</span>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	props: {
		request: {
			type: Object,
			default: () => {}
		}
	},
	computed:{
		config(){
			return this.request.config? this.request.config: null
		}
	},
	methods: {
        translateStyle(content, index){
            const css = {}
            const color = (content && content.color)? content.color: MainColors[index]
            if(content){
				css.backgroundColor = color
				css.borderColor = color     
            }
            return css
        }
	},
  	data(){
		return {
			mapLabel: [
				{
					index: '15-30',
					name: '0.15m-0.30m',
					symbol: 'fill',
					color: '#baf4f5'
				},
				{
					index: '30-100',
					name: '0.30m-1.0m',
					symbol: 'fill',
					color: '#70b5c8'
				},
				{
					index: '100-200',
					name: '1.0m-2.0m',
					symbol: 'fill',
					color: '#4d9bd1'
				}
			],
			rainValue: '',
			rainOptions: [{
				value: '78.8',
				label: '78.8mm'
			}, {
				value: '100',
				label: '100mm'
			}, {
				value: '130',
				label: '130mm'
			}]
		}
	}
}
</script>
<style lang="scss" scoped>
$iconWidth:1rem;
$borderWidth: $iconWidth/10;
.rainFilterContainer{
	padding: 1rem;
	.el-col{
		margin-left: 1rem;
		&.label{
			margin: 0 0 .5rem 0;
		}
	}
	label{
		margin-left: .5rem;
	}
	.mapIconRow{
		height: 8rem;
		margin-top: 1rem;
		.el-col,
		.el-col > div{
			display: inline-flex;
			align-items: center;
			justify-content: space-between;
		}
		.mapIcon{
			display: inline-flex;
			width: $iconWidth;
			height: $iconWidth;
			margin-right: $iconWidth/2;
		}
	}
}
</style>