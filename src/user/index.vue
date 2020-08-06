<template>
<div>
	<NoticeApp></NoticeApp>
	<div class="userInfo">
		<div class="userAvatar">
			<img src="@/assets/imges/user/avatar.png" class="v-middle" alt="">
			<span class="v-middle size18 m-l-sm text-white font-bold">昵称昵称昵称</span>
		</div>
		<van-row class="text-c m-t-lg text-white">
		  <van-col span="6">
			19
			<p class="size12">收藏</p>
		  </van-col>
		  <van-col span="6">
			19
		  	<p class="size12">关注</p>
		  </van-col>
		  <van-col span="6">
		  	19
		  	<p class="size12">评论</p>
		  </van-col>
		  <van-col span="6">
		  	19
		  	<p class="size12">优惠券</p>
		  </van-col>
		</van-row>
	</div>
	
	<div class="userIndexBox bg-ff m-t-xs">
		<h2>其它</h2>
		<van-grid :column-num="3">
		  <van-grid-item icon="comment-o" text="联系我们 " />
		  <van-grid-item icon="friends-o" text="关于我们" />
		  <van-grid-item icon="photo-o" text="投诉建议" />
		</van-grid>
	</div>
	
	<van-tabbar v-model="active">
	  <van-tabbar-item name="home" @click="$router.push({path:'/'})" icon="wap-home-o">首页</van-tabbar-item>
	  <van-tabbar-item name="news" @click="$router.push({path:'/newsIndex'})" icon="newspaper-o">专栏</van-tabbar-item>
	  <van-tabbar-item name="contact" icon="contact">我的</van-tabbar-item>
	</van-tabbar>
</div>
</template>

<script>
import NoticeApp from '@/public/NoticeApp' //顶部通知栏APP下载引导
import Vue from 'vue';
import { Tabbar, Col, Row, Grid, GridItem, Icon } from 'vant';
Vue.use(Tabbar);
Vue.use(Col);
Vue.use(Row);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);

export default {
	name: 'userIndex',
	data () {
		return {
			active: 'contact', //底部标签栏默认当前
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
.userInfo { padding: 15px; height: 145px; background: url("../assets/imges/user/bg.png") no-repeat; background-size:100% 175px;
	.userAvatar { margin: 15px 0 0 20px; height: 50px;
		img { display: inline-block; width: 50px; height: 50px;}
	}
}
.userIndexBox {
	h2 { padding:5px 10px; font-size: 14px;}
}
</style>
