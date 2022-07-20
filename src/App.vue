<template>
	<el-container class="common-layout">
		<el-header>
			<HeaderNav/>
		</el-header>		
		<el-container>
			<router-view/>
		</el-container>
	</el-container>
</template>
<script>
import HeaderNav from '@/components/HeaderNav.vue'
export default {
	components: {
		HeaderNav
	}
}
</script>
<style lang="scss">
body{
	margin: 0;
	width: 100%;
    min-width: 600px;
    min-height: 100vh;

	line-height: 1.4;
    font-size: 16px;
	color: var(--text-color);
    background-color: var(--bg-color);
	transition: background-color var(--el-transition-duration-fast);
    overflow: hidden;
}
#app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
