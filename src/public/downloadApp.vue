<template>
	<!-- 下载APP弹出框 -->
	<div>
		<img class="m-t-xxl" width="100" height="100" src="@/assets/imges/largeLogo.png" alt="">
		<p class="size14 m-t">下载易空间APP</p>
		<p class="size14">{{ downloadAppText}}</p>
		<div class="m-t-lg">
			<van-button round type="info" color="#f24646" url="">立即下载</van-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'downloadApp',
	data () {
		return {
			
		}
	},
	props: ['downloadAppText'],
	
}
</script>

<style>
</style>
