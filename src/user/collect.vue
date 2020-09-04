<template>
<div>
	<van-nav-bar title="我的收藏" left-text="返回" left-arrow @click-left="onClickLeft" />
	<van-tabs v-model="active">
	  <van-tab title="专栏栏目">
		  <van-empty description="这里空空如也...去关注更多匠人" id="noColumn" />
		  <div class="bg-ff wrapper-sm">
			  <div v-for="coltext of columnCon">
				  <van-swipe-cell>
						  <div class="column-f" v-if="coltext.info.column_type == '1'" @click="$router.push({path:'/colDetailsText',query:{id:coltext.info.id,cid:coltext.info.column_id}})">
							<van-image width="100" height="80" class="fl m-r-sm col-d-img" :src="coltext.info.cover_img" />
							<div class="col-d-text-2">
								<h5>{{coltext.info.title}}</h5>
								<p class="text-gray col-subtitle">{{coltext.info.brief}}</p>
								<p class="size12">收藏{{coltext.info.collect_num}} | 评论{{coltext.info.com_num}}</p>
							</div>
						  </div>
						  <div class="column-f" v-else-if="coltext.info.column_type == '2'" @click="$router.push({path:'/detailsVideo',query:{id:coltext.info.id,cid:coltext.info.column_id}})">
						  	<van-image width="100" height="80" class="fl m-r-sm col-d-img" :src="coltext.info.cover_img" />
						  	<div class="col-d-text-2">
						  		<h5>{{coltext.info.title}}</h5>
						  		<p class="text-gray col-subtitle">{{coltext.info.brief}}</p>
						  		<p class="size12">收藏{{coltext.info.collect_num}} | 评论{{coltext.info.com_num}}</p>
						  	</div>
						  </div>
					 <template #right>
					   <van-button square text="删除" type="danger" class="delete-button" />
					 </template>
				   </van-swipe-cell>
		  	   </div>	 
		  </div>
	  </van-tab>
	  <van-tab title="短视频">
		  <van-empty description="这里空空如也...去关注更多专栏" id="noColumnV" />
		  <div class="videoList">
		    <van-row gutter="10">
		      <van-col span="12" v-for="colVideo of columnVideo">
				<van-swipe-cell>
					<div class="video pos-rlt" @click="$router.push({path:'/play',query:{id:colVideo.video.infos_id}})">
						<van-image width="100%" height="175" radius="3px" :src="colVideo.video.cover_img" />
						<div class="videoTitle">
							<p>{{colVideo.video.title}}</p>
						</div>
					</div>
					<template #right>
						<van-button square text="删除" type="danger" class="delete-button" />
					  </template>
				</van-swipe-cell>
			  </van-col>
		    </van-row>
		  </div>
	  </van-tab>
	</van-tabs>
</div>
</template>

<script>
import Vue from 'vue';
import { NavBar, Tab, Tabs, Empty,SwipeCell } from 'vant';
Vue.use(NavBar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Empty);
Vue.use(SwipeCell);

export default {
	name: 'attention',
	data () {
		return {
			active: 2,
			columnCon:[],
			columnVideo:[]
		}
	},
	created(){
	  // document.cookie
	  // var token = this.$cookies.get("token")
	},
	mounted() {
		document.cookie
		var token = this.$cookies.get("token")
		console.log("打印")
		console.log(token)
		this.$ajax.get('consumer/collect' + '?user_token=' + token + '&target_type=info').then((response) => { //用户收藏列表 - 专栏文章
		    this.columnCon = response.data.data.data
			var noColumn = response.data.data.count
			if(noColumn == 0){
				var noc = document.getElementById("noColumn");
				noc.style.display = 'flex';
			}
		});
		this.$ajax.get('consumer/collect' + '?user_token=' + token + '&target_type=video').then((response) => { //用户收藏列表 - 短视频
		    this.columnVideo = response.data.data.data
			var noColumnVideo = response.data.data.count
			if(noColumnVideo == 0){
				var nov = document.getElementById("noColumn");
				nov.style.display = 'flex';
			}
		});
	},
	methods: {
		onClickLeft() {
		  window.history.go(-1);
		},
	},
}
</script>

<style lang="less">
.delete-button { height: 100%;}
.attention-wrap { background-color: #fff;
	.attention-list { padding: 10px; border-bottom: 1px solid #eee;
		&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
	}
}
.column-f { padding: 10px 0; display: flex; border-bottom: 1px solid #eee; 
	&:last-of-type { border: 0;}
	&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
	.col-d-img { }
	.col-d-text-2 { flex: 2;}
	h5 { font-size: 14px;}
	.col-subtitle { margin-bottom: 5px; height: 35px; font-size: 12px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
}
.videoList { margin: 10px 10px 60px 10px;
	.video { height: 175px;
		.videoTitle { padding: 5px 0; width: 100%; line-height: 1.3; position: absolute; bottom: 0; color: #fff; font-size: 14px;  background: linear-gradient(rgba(0,0,0,0),black); border-radius: 0 0 3px 3px;
			>p { padding: 0 5px; overflow: hidden; text-overflow: ellipsis;  display: -webkit-box; -webkit-line-clamp: 2;  -webkit-box-orient: vertical;}
		}
	}
}
#noColumn,#noColumnV { display: none;}
</style>
