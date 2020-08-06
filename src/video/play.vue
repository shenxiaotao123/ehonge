<template>
	<div>
		<NoticeApp></NoticeApp>
		<van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="test_two_box">
			<video id="myVideo" class="video-js vjs-fluid">
				<source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
			</video>
		</div>
		<div class="videoIofn bg-ff wrapper-sm">
			<div class="videoTitle">短视频标题短视频标题短视频标题短视频标题短视频标题短视频标题</div>
			<div class="videoOperating">
				<div class="fr"><van-button size="small" color="#f24646">+关注</van-button></div>
				<div class="fl"><van-image round width="32px" height="32px" src="https://img.yzcdn.cn/vant/cat.jpeg" class="v-middle" /><span class="m-l-sm v-middle">用户名</span></div>
			</div>
		</div>
		
		<div class="comment bg-ff wrapper-sm m-t-sm">
			<h3>评论 ( 32435 )</h3>
			<div class="commentList">
				<div class="commentAvatar"><van-image round width="18px" height="18px" src="https://img.yzcdn.cn/vant/cat.jpeg" class="v-middle" /><span class="m-l-xs v-middle size12">用户名</span></div>
				<p class="commentCon">评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容</p>
				<p class="size12 text-gray">04-09</p>
			</div>
			<div class="commentList">
				<div class="commentAvatar"><van-image round width="18px" height="18px" src="https://img.yzcdn.cn/vant/cat.jpeg" class="v-middle" /><span class="m-l-xs v-middle size12">用户名</span></div>
				<p class="commentCon">评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容</p>
				<p class="size12 text-gray">04-09</p>
			</div>
		</div>
		
		<van-goods-action>
		  <van-cell-group :style="{ flex: '1'}">
		    <van-field @click="showPopup" placeholder="想勾搭,先评论" />
		  </van-cell-group>
		  <van-goods-action-icon icon="like-o" text="点赞" badge="12" />
		</van-goods-action>
		
		<!-- 下载APP弹出框 -->
		<van-popup v-model="show" closeable round position="bottom" :style="{ height: '50%' }" class="text-c">
			<img class="m-t-xxl" width="100" height="100" src="@/assets/imges/largeLogo.png" alt="">
			<p class="size14 m-t">下载易空间APP</p>
			<p class="size14">享受更好的评论体验</p>
			<div class="m-t-lg">
				<van-button round type="info" color="#f24646" url="">立即下载</van-button>
			</div>
		</van-popup>
		
	</div>
</template>

<script>
import Video from 'video.js' //视频控件
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video
import NoticeApp from '@/public/NoticeApp' //顶部通知栏APP下载引导
import Vue from 'vue';
import { NavBar, Field, Icon, GoodsAction, GoodsActionIcon, GoodsActionButton, Popup, Button } from 'vant';
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Icon);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Popup);
Vue.use(Button);

import { Image as VanImage } from 'vant';
Vue.use(VanImage);

export default {
	name: 'play',
	data () {
		return {
			show: false,
		}
	},
	components: {
		 NoticeApp
	},
	mounted() {
		this.initVideo();
		this.$ajax.get('info/video/' + this.$route.query.id).then((response) => { //视频列表
		    this.video = response.data.data
			console.log(response.data.data);
		});	
	},
	methods: {
	    onClickLeft() {
	      window.history.go(-1);
	    },
		initVideo() {
			//初始化视频方法
		    let myPlayer = this.$video(myVideo, {
		        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
		        controls: true,
		        //自动播放属性,muted:静音播放
		        autoplay: "muted",
		        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
		        preload: "auto",
		        //设置视频播放器的显示宽度（以像素为单位）
		        width: "800px",
		        //设置视频播放器的显示高度（以像素为单位）
		        height: "400px"
		    });
		},
		//弹出框
		showPopup() {
		    this.show = true;
		},
	},
}
</script>

<style lang="less">
.videoIofn {
	.videoTitle { margin-bottom: 10px; font-size: 14px;}
	.videoOperating {
		&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
		.fl { color:#666; font-size: 12px;}
	}
}
.comment {
	h3 { margin-bottom: 10px; font-size: 14px; font-weight: 300;}
	.commentList { margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee;
		&:last-of-type { margin-bottom: 0; padding-bottom: 0; border: 0;}
		.commentCon { padding: 5px 0; line-height: 1.4; font-size: 12px;}
	}
}
</style>
