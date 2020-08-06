<template>
<div>
	<NoticeApp></NoticeApp>
	<van-image width="100%" src="https://img.yzcdn.cn/vant/cat.jpeg" />
	<div class="videoIofn bg-ff wrapper-sm">
		<div class="column-title">专栏主标题专栏主标题</div>
		<div class="column-subtitle">专栏副标题专栏副标题专栏副标题专栏副标题专栏副标题专栏副标题专栏副标题专栏副标题</div>
		<div class="column-Operating">
			999人关注 | 已更新10期
		</div>
	</div>
	
	<div class="m-t-sm">
		<van-tabs v-model="active">
		  <van-tab title="介绍">
			  <div class="bg-ff wrapper size14">
				  青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶
			  </div>
		  </van-tab>
		  <van-tab title="目录">
			  <div class="col-news-list bg-ff">
				  <div class="column-con-icon"><van-icon name="video-o" /></div>
				  <div class="column-con-t" @click="$router.push({path:'/colDetails'})">
					  <p class="size14 m-t-xs">01 丽水学院青瓷社-青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶壶</p>
					  <p class="size12 text-gray m-t-xs">2分钟前</p>
				  </div>
				  
			  </div>
			  <div class="col-news-list bg-ff">
				  <div class="column-con-icon"><van-icon name="video-o" /></div>
			  				  <div class="column-con-t">
			  					  <p class="size14 m-t-xs">01 丽水学院青瓷社-青瓷茶壶青瓷茶壶青瓷茶壶青瓷茶</p>
			  					  <p class="size12 text-gray m-t-xs">2分钟前</p>
			  				  </div>
			  				  
			  </div>
		  </van-tab>
		</van-tabs>
	</div>
</div>
</template>

<script>
import NoticeApp from '@/public/NoticeApp' //顶部通知栏APP下载引导
import Vue from 'vue';
import { Image as VanImage } from 'vant';
Vue.use(VanImage);
import { Tab, Tabs } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);

export default {
	name: 'column',
	data () {
		return {
			active: 1,
		}
	},
	components: {
		 NoticeApp
	},
	mounted() {
		
	}
}
</script>

<style lang="less">
.column-title { margin-bottom: 5px; font-size: 14px}
.column-subtitle { margin-bottom: 5px; font-size: 12px; color: #999;}
.column-Operating { font-size: 12px;}
.col-news-list { padding: 5px 10px; border-bottom: 1px solid #eee;
	.column-con-t {}
	.column-con-icon { padding:9px 10px; float: right;}
}
</style>
