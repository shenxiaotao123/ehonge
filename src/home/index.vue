<template>
	<div>
		<NoticeApp></NoticeApp>
		<van-tabs v-model="activeName">
		  <van-tab title="匠人传承" name="tab1">
			<div class="videoList">
			  <van-row gutter="10">
			    <van-col span="12" v-for="vid of videolist.video">
					<div class="video pos-rlt" @click="$router.push({path:'/play',query:{id:vid.id}})">
						<van-image width="100%" height="175" radius="3px" :src="vid.cover_img" />
						<div class="videoTitle">
							<p>{{vid.title}}</p>
						</div>
					</div>
				</van-col>
			  </van-row>
			</div>
		  </van-tab>
		  <van-tab title="大学生作品" name="tab2">
			  大学生作品
		  </van-tab>
		  <van-tab title="国学讲坛" name="tab3">
			  国学讲坛
		  </van-tab>
		</van-tabs>
		
		<van-tabbar v-model="active">
		  <van-tabbar-item name="home" icon="wap-home-o">首页</van-tabbar-item>
		  <van-tabbar-item name="news" icon="newspaper-o" @click="$router.push({path:'/newsIndex'})">专栏</van-tabbar-item>
		  <van-tabbar-item name="contact" icon="contact" @click="$router.push({path:'/userIndex'})">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
import NoticeApp from '@/public/NoticeApp' //顶部通知栏APP下载引导
import Vue from 'vue';
import { Tab, Tabs, Tabbar, TabbarItem, NoticeBar, Button, Col, Row, } from 'vant';
import { Image as VanImage } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NoticeBar);
Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);

export default {
	name: 'index',
	data () {
		return {
			activeName: 'tab1', //Tab默认当前页
			active: 'home', //底部标签栏默认当前
			videolist:[]
		}
	},
	components: {
		 NoticeApp
	},
	mounted() {
		this.$ajax.get('info/video').then((response) => { //视频列表
		    this.videolist = response.data.data
			console.log(response.data.data);
		});	
	}
}
</script>

<style lang="less">
@miam-color: #f24646;
.videoList { margin: 10px;
	.video { height: 175px;
		.videoTitle { padding: 5px 0; width: 100%; line-height: 1.3; position: absolute; bottom: 0; color: #fff; font-size: 14px;  background: linear-gradient(rgba(0,0,0,0),black); border-radius: 0 0 3px 3px;
			>p { padding: 0 5px; overflow: hidden; text-overflow: ellipsis;  display: -webkit-box; -webkit-line-clamp: 2;  -webkit-box-orient: vertical;}
		}
	}
}
</style>
