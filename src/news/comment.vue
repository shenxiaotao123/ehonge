<template>
	<div>
		<van-nav-bar title="评论" left-text="返回" left-arrow @click-left="onClickLeft" />
		<div class="comment bg-ff wrapper-sm m-t-sm">
			<h3>评论 ( {{videoComment.count}}  )</h3>
			<van-empty description="这里还没有人评论" id="noComment" />
			<div class="commentList" v-for="videoCom of videoComment.data">
				<div class="commentAvatar"><van-image round width="18px" height="18px" :src="videoCom.comment_user_image" class="v-middle" /><span class="m-l-xs v-middle size12">{{videoCom.comment_user_name}}</span></div>
				<p class="commentCon">{{videoCom.com_content}}</p>
				<p class="size12 text-gray">04-09{{videoCom.created_at}}</p>
			</div>
		</div>
		
		<van-goods-action>
		  <van-cell-group :style="{ flex: '1'}">
		    <van-field @click="showPopup" placeholder="想勾搭,先评论" />
		  </van-cell-group>
		  <van-button @click="showPopup" color="#f24646">发送</van-button>
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
			videoComment:[]
		}
	},
	mounted() {
		this.$ajax.get('info/comment' + '?info_id=' + this.$route.query.id + '&info_type=3').then((response) => { //评论
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
.comment {
	h3 { margin-bottom: 10px; font-size: 14px; font-weight: 300;}
	.commentList { margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee;
		&:last-of-type { margin-bottom: 0; padding-bottom: 0; border: 0;}
		.commentCon { padding: 5px 0; line-height: 1.4; font-size: 12px;}
	}
}
#noComment { display: none;}
</style>
