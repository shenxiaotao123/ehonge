<template>
  <div id="app">
	<NoticeApp></NoticeApp>
    <router-view/>
  </div>
</template>

<script>
import NoticeApp from '@/public/NoticeApp' //顶部通知栏APP下载引导
import '@/assets/css/app.css'  //全局样式库
import '@/assets/css/public.css'  //部分公用样式
export default {
  name: 'App',
  data () {
  	return {
  		
  	}
  },
  components: {
  	 NoticeApp
  }
}
</script>

<style>
html { background-color: #f7f7f7;}
#app {
	
}
</style>
