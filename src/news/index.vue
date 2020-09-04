<template>
<div style="padding-bottom: 60px;">
	<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
	  <van-swipe-item v-for="swipe of columnSwipe.slice(0,4)">
		  <img :src="swipe.pic_url" width="100%" class="swiper-slide img" alt="" />
	  </van-swipe-item>
	</van-swipe>
	<div class="column m-t-sm" v-for="col of column">
		<div class="column-d">
			<van-image width="120" height="100" class="fl m-r-sm col-d-img radius-xs clear" :src="col.cover_pic" @click="$router.push({path:'/column',query:{id:col.id}})" />
			<div class="col-d-text">
				<h5@click="$router.push({path:'/column',query:{id:col.id}})">{{col.name}}</h5>
				<p class="text-gray col-subtitle" @click="$router.push({path:'/column',query:{id:col.id}})">{{col.brief}}</p>
				<p class="size12">已更新 {{col.count_infos_num}} 期</p>
				<van-button size="small" color="#f24646" class="col-d-btn">关注</van-button>
			</div>
		</div>
		<div class="column-x m-t-sm">
			<van-row gutter="10">
			  <van-col span="8" v-for="inf of col.infos.slice(0,3)" class="text-c">
				<div v-if="inf.column_type == '1'" @click="$router.push({path:'/colDetailsText',query:{cid:col.id,id:inf.id}})">
				  <van-image height="80" class="col-d-img radius-xs clear" :src="inf.cover_img" />
				  <p class="col-x-text">{{inf.title}}</p>
				</div>
				<div v-else-if="inf.column_type == '2'" @click="$router.push({path:'/colDetailsText',query:{cid:col.id,id:inf.id}})">
				  <van-image height="80" class="col-d-img radius-xs clear" :src="inf.cover_img" />
				  <p class="col-x-text">{{inf.title}}</p>
				</div>
			  </van-col>
			</van-row>
		</div>
		<div class="news-more" @click="$router.push({path:'/column',query:{id:col.id}})">查看全部</div>
	</div>
	<van-tabbar v-model="active">
	  <van-tabbar-item name="home" @click="$router.push({path:'/'})" icon="wap-home-o">首页</van-tabbar-item>
	  <van-tabbar-item name="news" icon="newspaper-o">专栏</van-tabbar-item>
	  <van-tabbar-item name="contact" @click="$router.push({path:'/userIndex'})" icon="contact">我的</van-tabbar-item>
	</van-tabbar>
</div>
</template>

<script>
import Vue from 'vue';
import { Tabbar, Swipe, SwipeItem, Button,Col,Row } from 'vant';
Vue.use(Tabbar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
import { Image as VanImage } from 'vant';
Vue.use(VanImage);


export default {
	name: 'newsIndex',
	data () {
		return {
			active: 'news', //底部标签栏默认当前
			column:[
				{
					infos:[],
					columnInfos:[]
					
				}
			],
			columnSwipe:[]
		}
	},
	mounted() {
		this.$ajax.get('info/column').then((response) => { //专栏列表
		    this.column = response.data.data.data
		});	
		this.$ajax.post('ads/column').then((response) => { //专栏轮播图
		    this.columnSwipe = response.data.data.data
		});	
	}
}
</script>

<style lang="less">
.van-swipe { height: 180px; max-width: 100%; max-height: 100%;}
// .my-swipe .van-swipe-item { color: #fff; font-size: 20px; line-height: 150px; text-align: center; background-color: #f24646;}	
.column { padding: 10px; background-color: #fff;
	&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
	.column-d { position: relative; display: flex;
		&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
		.col-d-img { }
		.col-d-text { padding-right: 50px; flex: 2;}
		h5 { font-size: 14px;}
		.col-subtitle { margin-bottom: 5px; height: 50px; font-size: 12px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;}
		.col-d-btn { position: absolute; right: 0; top:10px;}
	}
	.column-x {
		.col-x-text { width: 100%; text-align: center; font-size: 12px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap}
	}
	.news-more { margin-top: 10px; padding-top: 5px; border-top: 1px solid #eee; text-align: right; font-size: 12px; color:#999;}
}
</style>
