<template>
<div>
	<van-nav-bar title="专栏" left-text="返回" left-arrow @click-left="onClickLeft" />
	<van-image width="100%" :src="columnInfos.cover_pic" />
	<div class="videoIofn bg-ff wrapper-sm">
		<div class="column-title">{{columnInfos.name}}</div>
		<div class="column-subtitle">{{columnInfos.brief}}</div>
		<div class="column-Operating">
			{{columnInfos.follow_num}}人关注 | 已更新{{columnInfos.count_infos_num}}期 
		</div>
	</div>
	
	<div class="m-t-sm">
		<van-tabs v-model="active">
		  <van-tab title="介绍">
			  <div class="bg-ff wrapper size14">
				 {{columnInfos.introduction}}
			  </div>
		  </van-tab>
		  <van-tab title="目录">
			  <div class="col-news-list bg-ff"  v-for="infos of columnCon">
				  <div class="column-con-icon" v-if="infos.type == '1'"><van-icon name="video-o" /></div>
				  <div class="column-con-icon" v-else-if="infos.type == '3'"><van-icon name="newspaper-o" /></div>
				  <div class="column-con-t" v-if="infos.type == '3'" @click="$router.push({path:'/colDetailsText',query:{id:infos.id,cid:columnInfos.id}})">
					  <p class="size14 m-t-xs">{{infos.title}}</p>
					  <p class="size12 text-gray m-t-xs">{{infos.updated_at}}</p>
				  </div>
				  <div class="column-con-t" v-else-if="infos.type == '1'" @click="$router.push({path:'/detailsVideo',query:{id:infos.id,cid:columnInfos.id}})">
				  	  <p class="size14 m-t-xs">{{infos.title}}</p>
				  	  <p class="size12 text-gray m-t-xs">{{infos.updated_at}}</p>
				  </div>
			  </div>
			  
		  </van-tab>
		</van-tabs>
	</div>
</div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage } from 'vant';
Vue.use(VanImage);
import { NavBar, Tab, Tabs } from 'vant';
Vue.use(NavBar);
Vue.use(Tab);
Vue.use(Tabs);

export default {
	name: 'column',
	data () {
		return {
			active: 1,
			columnCon:[],
			columnInfos:[],
		}
	},
	mounted() {
		this.$ajax.get('info/columnInfos/' + '?column_id=' + this.$route.query.id).then((response) => { //专栏文章列表
		    this.columnCon = response.data.data.data
		});
		this.$ajax.get('info/column/' + this.$route.query.id).then((response) => { //专栏详情
			this.columnInfos = response.data.data
		});		
	},
	methods: {
		onClickLeft() {
		  window.history.go(-1);
		},
	}
}
</script>

<style lang="less">
.column-title { margin-bottom: 5px; font-size: 18px; font-weight: 700;}
.column-subtitle { margin-bottom: 5px; font-size: 12px; color: #999;}
.column-Operating { font-size: 12px;}
.col-news-list { padding: 5px 10px; border-bottom: 1px solid #eee;
	.column-con-t {}
	.column-con-icon { padding:9px 10px; float: right;}
}
</style>
