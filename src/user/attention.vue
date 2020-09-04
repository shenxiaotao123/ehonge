<template>
<div>
	<van-nav-bar title="我的关注" left-text="返回" left-arrow @click-left="onClickLeft" />
	<van-tabs v-model="active">
	  <van-tab title="匠人">
		  <van-empty description="这里空空如也...去关注更多匠人" id="noCraftsman" />
		  <div class="attention-wrap">
			  <div class="attention-list" v-for="foc of followCon">
			  	<img :src="foc.user.user_image" width="40" class="v-middle fl m-r-sm" alt="">
				<div class="fl">
					<span class="v-middle size14 font-bold">{{foc.user.ykj_name}}</span>
					<p class="size12 text-gray">粉丝 {{foc.user.user_fans_num}}  关注 {{foc.user.user_follow_num}}</p>
				</div>
			  </div>
		  </div>
	  </van-tab>
	  <van-tab title="专栏">
		  <van-empty description="这里空空如也...去关注更多专栏" id="noColumn" />
		  <div class="bg-ff wrapper-sm">
			  <div class="column-f" v-for="focol of followColumn"> 
				<van-image width="100" height="80" class="fl m-r-sm col-d-img" :src="focol.column.cover_pic" @click="$router.push({path:'/column',query:{id:focol.column.id}})" />
				<div class="col-d-text-2">
					<h5 @click="$router.push({path:'/column',query:{id:focol.column.id}})">{{focol.column.name}}</h5>
					<p class="text-gray col-subtitle" @click="$router.push({path:'/column',query:{id:focol.column.id}})">{{focol.column.brief}}</p>
					<p class="size12">关注 {{focol.column.follow_num}} | 已更新 {{focol.column.count_infos_num}} 期</p>
				</div>
			  </div>
		  </div>
	  </van-tab>
	</van-tabs>
</div>
</template>

<script>
import Vue from 'vue';
import { NavBar, Tab, Tabs, Empty } from 'vant';
Vue.use(NavBar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Empty);

export default {
	name: 'attention',
	data () {
		return {
			active: 2,
			followCon:[],
			followColumn:[]
		}
	},
	mounted() {
		document.cookie
		var token = this.$cookies.get("token")
		console.log("打印")
		console.log(token)
		this.$ajax.get('consumer/follow' + '?user_token=' + token + '&target_type=user').then((response) => { //用户收藏列表 - 匠人
			this.followCon = response.data.data.data
			var followCon = response.data.data.count
			if(followCon == 0){
				var noc = document.getElementById("noCraftsman");
				noc.style.display = 'flex';
			}
		});
		this.$ajax.get('consumer/follow' + '?user_token=' + token + '&target_type=column').then((response) => { //用户收藏列表 - 专栏
			this.followColumn = response.data.data.data
			var followColumn = response.data.data.count
			if(followColumn == 0){
				var noc = document.getElementById("noColumn");
				noc.style.display = 'flex';
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
.attention-wrap { background-color: #fff;
	.attention-list { padding: 10px; border-bottom: 1px solid #eee;
		&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
	}
}

.column-f { padding: 10px 0; display: flex; border-bottom: 1px solid #eee; 
	&:last-of-type { padding-bottom: 0; border: 0;}
	&:after { content:"."; display:block; height:0; clear:both; visibility:hidden;}
	.col-d-img { }
	.col-d-text-2 { flex: 2;}
	h5 { font-size: 14px;}
	.col-subtitle { margin-bottom: 5px; height: 35px; font-size: 12px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
}
#noCraftsman,#noColumn { display: none;}
</style>
