<template>
<div>
	<NoticeApp></NoticeApp>
	<van-image width="100%" src="https://img.yzcdn.cn/vant/cat.jpeg" />
	<div class="videoIofn bg-ff wrapper-sm">
		<div class="column-title">栏目主标题</div>
		<div class="column-subtitle">专栏副标题专栏副标题专栏副标题专栏副标题专栏副标题专栏副标题专栏副标题专栏副标题</div>
		<div class="column-t-box" @click="$router.push({path:'/column'})">
			<van-image height="60" src="https://img.yzcdn.cn/vant/cat.jpeg" class="fl m-r-sm" />
			<div class="column-t-text">
				<h5>专栏副标题专栏副标题专栏副标题专栏副标题专栏副标题专栏副标题专栏副标题专栏副标题</h5>
				<p class="size12 text-gray">999人关注 | 已更新10期</p>
			</div>
		</div>
	</div>
	
	<div class="m-t-sm bg-ff wrapper size14">
		正文详情介绍正文详情介绍正文详情介绍正文详情介绍正文详情介绍正文详情介绍正文详情介绍正文详情介绍正文详情介绍正文详情介绍正文详情介绍正文详情介绍正文详情介绍正文详情介绍正文详情介绍
		<van-image width="100%" height="80" src="https://img.yzcdn.cn/vant/cat.jpeg" />
	</div>
	
	<div class="m-t-sm wrapper col-commodity-wrap">
		<van-row gutter="10">
		  <van-col span="8">
			  <div class="col-commodity" @click="showPopup">
				  <van-image width="100%" height="80" src="https://img.yzcdn.cn/vant/cat.jpeg" />
				  <div class="col-commodity-name size12 m-l-xs m-r-xs">商品名称商品名商品名称商品名</div>
				  <p class="size12 text-gray m-l-xs m-r-xs">￥ 50.00</p>
			  </div>
		  </van-col>
		  <van-col span="8">span: 8</van-col>
		  <van-col span="8">span: 8</van-col>
		</van-row>
	</div>
	
	<van-goods-action>
	  <van-cell-group :style="{ flex: '1'}">
	    <van-field @click="showPopup" placeholder="想勾搭,先评论" />
	  </van-cell-group>
	  <van-goods-action-icon icon="chat-o" text="评论" badge="12"  @click="showPopup" />
	  <van-goods-action-icon icon="star-o" text="收藏" badge="12"  @click="showPopup" />
	</van-goods-action>
	
	<!-- 下载APP弹出框 -->
	<van-popup v-model="show" closeable round position="bottom" :style="{ height: '50%' }" class="text-c">
		<downloadApp v-bind:downloadAppText="downloadAppText"></downloadApp>
	</van-popup>
	
</div>
</template>

<script>
import NoticeApp from '@/public/NoticeApp' //顶部通知栏APP下载引导
import downloadApp from '@/public/downloadApp' //弹出框APP下载

import Vue from 'vue';
import { Image as VanImage } from 'vant';
Vue.use(VanImage);
import { Tab, Tabs, GoodsAction, GoodsActionButton, GoodsActionIcon, Field, Popup } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Field);
Vue.use(Popup);

export default {
	name: 'column',
	data () {
		return {
			active: 1,
			show: false,
			downloadAppText:'获得文章同款商品'
		}
	},
	components: {
		 NoticeApp,
		 downloadApp
	},
	mounted() {
		
	},
	methods: {
		//弹出框
		showPopup() {
		    this.show = true;
		},
	},
}
</script>

<style lang="less">
.column-title { margin-bottom: 5px; font-size: 14px}
.column-subtitle { margin-bottom: 5px; font-size: 12px; color: #999;}
.column-t-box { padding: 10px; background-color: #eee;
	&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
	.column-t-text {
		h5 { overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
	}
}
.col-news-list { padding: 5px 10px; border-bottom: 1px solid #eee;
	.column-con-t {}
	.column-con-icon { padding:9px 10px; float: right;}
}
.col-commodity-wrap { padding-bottom: 60px;
	.col-commodity { background-color: #fff;
		.col-commodity-name { overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
	}
}
</style>
