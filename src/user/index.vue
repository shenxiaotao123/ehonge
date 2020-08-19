<template>
<div>
	<div class="userInfo">
		<div class="userAvatar" v-on:click="wxlogin">
			<img src="@/assets/imges/user/avatar.png" class="v-middle" alt="">
			<span class="v-middle size18 m-l-sm text-white font-bold">点击使用微信登录</span>
		</div>
		<van-row class="text-c m-t-lg text-white">
		  <van-col span="6" @click="$router.push({path:'/collect'})">
			19
			<p class="size12">收藏</p>
		  </van-col>
		  <van-col span="6" @click="$router.push({path:'/attention'})">
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
		  <van-grid-item icon="comment-o" text="联系我们 " @click="$router.push({path:'/contact'})" />
		  <van-grid-item icon="friends-o" text="关于我们" @click="$router.push({path:'/about'})" />
		  <van-grid-item icon="photo-o" text="投诉建议" />
		</van-grid>
	</div>
	
	<img src="@/assets/imges/user/downloadApp.png" width="100%" class="m-t-xl" alt="">
	
	<van-tabbar v-model="active">
	  <van-tabbar-item name="home" @click="$router.push({path:'/'})" icon="wap-home-o">首页</van-tabbar-item>
	  <van-tabbar-item name="news" @click="$router.push({path:'/newsIndex'})" icon="newspaper-o">专栏</van-tabbar-item>
	  <van-tabbar-item name="contact" icon="contact">我的</van-tabbar-item>
	</van-tabbar>
</div>
</template>

<script>
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
		 
	},
	mounted() {
		
	},
	methods:{
		wxlogin: function (event){
		  //沒有token的情況
		  if(!this.$cookies.isKey('token')){
		    // var response = {
		    //   "code": 0,
		    //   "msg": "",
		    //   "data": {
		    //     "token": "96bfabfb61be126aa787b15eaae4f617",
		    //     "real_name": "测试用户",
		    //     "user_image": "",
		    //     "huanxin_json": ""
		    //   },
		    //   "url": ""
		    // };
		    //
		    // if(response.code == 0){
		    //   this.$cookies.set('token', response.data.token,60*60*24*30)
		    //   this.$cookies.set('real_name', response.data.real_name,60*60*24*30)
		    //   this.$router.go(0)
		    // }
		    // return false;
		
		    //路徑裏有code
		    if(window.location.href.indexOf('code') != -1){
		      //console.log('有code')
		      var path = window.location.href
		      let code = path.substring(path.indexOf('code=')+5,path.indexOf('&'))
		
		      //console.log(code)
		      this.http({
		        method:'post',
		        url:'/api/consumer/OAuthLogin',
		        data:{
		          oauth_type:'wx_h5',
		          code:code
		        }
		      }).then((response)=>{
		        //console.log('设置token')
		        this.$cookies.set('token', response.data.data.token,60*60*24*30)
		        this.$cookies.set('real_name', response.data.data.real_name,60*60*24*30)
		        //console.log(response.data.data.token)
		        var wxcode =response.data.code
		        if (wxcode == 2){
		          this.$router.push({  //传参到绑定手机号码页面
		            path:'/Information',
		            query: {
		              openid:response.data.data.openid,
		              oauth_type:response.data.data.oauth_type
		            }
		          })
		        }
		        if (wxcode == 0){
		          window.location.href="#/userIndex";
		        }
		        if (wxcode == 1){
		          alert(response.data.msg)
		        }
		
		        //this.load()
		      })
		    }
		    else{
		      //獲取
		      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd802df0d4c9fe16e&redirect_uri=http://127.0.0.1/%23/userIndex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
		    }
		  }
		}
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
