<template>
	<div>
		<van-nav-bar :title="videoDetail.title" left-text="返回" left-arrow @click-left="onClickLeft" />		
		<template>
		   <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
     	</template>
				
		<div class="videoIofn bg-ff wrapper-sm">
			<div class="videoTitle">{{videoDetail.title}}</div>
			<div class="videoOperating">
				<div class="fr"><van-button size="small" color="#f24646" @click="showPopup">+关注</van-button></div>
				<div class="fl"><van-image round width="32px" height="32px" :src="videoUser.user_image" class="v-middle" /><span class="m-l-sm v-middle">{{videoUser.user_name}}</span></div>
			</div>
		</div>
		
		<div class="comment bg-ff wrapper-sm m-t-sm">
			<h3>评论 ( {{videoComment.count}} )</h3>
			<van-empty description="这里还没有人评论" id="noComment" />
			<div class="commentList" v-for="videoCom of videoComment.data">
				<div class="commentAvatar"><van-image round width="18px" height="18px" :src="videoCom.comment_user_image" class="v-middle" /><span class="m-l-xs v-middle size12">{{videoCom.comment_user_name}}</span></div>
				<p class="commentCon">{{videoCom.com_content}}</p>
				<p class="size12 text-gray">04-09{{videoCom.created_at}}</p>
			</div>
		</div>
		
		<van-goods-action>
		  <van-field @click="showPopup" placeholder="想勾搭,先评论" :style="{ flex: '1'}" />
		  <van-goods-action-icon icon="like-o" text="点赞" v-if="videoCon.like_num == '0'" @click="showPopup" />
		  <van-goods-action-icon icon="like-o" text="点赞" v-else-if="videoCon.like_num != '0'" :badge="videoCon.like_num" @click="showPopup" />
		</van-goods-action>
		
		<!-- 下载APP弹出框 -->
		<van-popup v-model="show" closeable round position="bottom" :style="{ height: '50%' }" class="text-c">
			<downloadApp v-bind:downloadAppText="downloadAppText"></downloadApp>
		</van-popup>
		
	</div>
</template>

<script>
// import Video from 'video.js' //视频控件
// import 'video.js/dist/video-js.css'
// Vue.prototype.$video = Video

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

import downloadApp from '@/public/downloadApp' //弹出框APP下载
import Vue from 'vue';
import { NavBar, Field, Icon, GoodsAction, GoodsActionIcon, GoodsActionButton, Popup, Button, Empty } from 'vant';
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Icon);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Popup);
Vue.use(Button);
Vue.use(Empty);

import { Image as VanImage } from 'vant';
Vue.use(VanImage);

export default {
	name: 'play',
	data () {
		return {
			show: false,
			videoCon:[],
			videoDetail:[],
			videoUser:[],
			comment:[],
			videoComment:[],
			downloadAppText:'享受更好的评论体验',
			playerOptions : {
			        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
			        autoplay: false, //如果true,浏览器准备好时开始回放。
			        muted: false, // 默认情况下将会消除任何音频。
			        loop: false, // 导致视频一结束就重新开始。
			        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
			        language: 'zh-CN',
			        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
			        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
			        sources: [{
			          type: "",
			          src: ''//url地址          
			        }],
			        poster: "", //你的封面地址
			        // width: document.documentElement.clientWidth,
			        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
			        controlBar: {
			          timeDivider: true,
			          durationDisplay: true,
			          remainingTimeDisplay: false,
			          fullscreenToggle: true  //全屏按钮
					}
			}
		
		}
	},
	components: {
		 downloadApp
	},
	mounted() {		
		this.$ajax.get('info/video/' + this.$route.query.id).then((response) => { //视频列表
		    this.videoCon = response.data.data
			this.videoDetail = response.data.data.video
			this.videoUser = response.data.data.user			
			var viurl = this.videoDetail.video_url				
			this.playerOptions['sources'][0]['src'] = viurl;			
		});	
		this.$ajax.get('info/comment' + '?info_id=' + this.$route.query.id + '&info_type=1').then((response) => { //视频评论
		    this.videoComment = response.data.data
			var noComment = response.data.data.count
			if(noComment == 0){
				var noc = document.getElementById("noComment");
				noc.style.display = 'flex';
			}
		});	
	},
	methods: {
	    onClickLeft() {
	      window.history.go(-1);
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
#noComment { display: none;}
</style>
