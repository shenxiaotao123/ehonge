<template>
<div>
	<div class="userInfo">
		<div class="userAvatar" v-on:click="wxlogin">
			<img src="@/assets/imges/user/avatar.png" class="v-middle" alt="" id="avatar">
			<img :src="userimageData" class="v-middle" alt="" id="useravatar">
			<span class="v-middle size18 m-l-sm text-white font-bold"><span id="loginName">点击使用微信登录</span>{{ realnameData }}</span>
		</div>
		<van-row class="text-c m-t-lg text-white">
		  <van-col span="6" v-if="countCollect.count >= '1'" v-on:click="Collect">{{countCollect.count}}<p class="size12">收藏</p></van-col>
		  <van-col span="6" v-else="" v-on:click="attention">--<p class="size12">收藏</p></van-col>
		  <van-col span="6" v-if="countFollow.count >= '1'" v-on:click="attention">{{countFollow.count}}<p class="size12">关注</p></van-col>
		  <van-col span="6" v-else="" v-on:click="attention">--<p class="size12">关注</p></van-col>
		  <van-col span="6">--<p class="size12" @click="showPopup">评论</p></van-col>
		  <van-col span="6">--<p class="size12" @click="showPopup">优惠券</p></van-col>
		</van-row>
	</div>
	
	<div class="userIndexBox bg-ff m-t-xs">
		<h2>其它</h2>
		<van-grid :column-num="3">
		  <van-grid-item icon="comment-o" text="联系我们 " @click="$router.push({path:'/contact'})" />
		  <van-grid-item icon="friends-o" text="关于我们" @click="$router.push({path:'/about'})" />
		  <van-grid-item icon="photo-o" text="投诉建议" v-on:click="greet" />
		</van-grid>
	</div>
	
	<img src="@/assets/imges/user/downloadApp.png" width="100%" class="m-t-xl" alt="">
	
	<van-tabbar v-model="active">
	  <van-tabbar-item name="home" @click="$router.push({path:'/'})" icon="wap-home-o">首页</van-tabbar-item>
	  <van-tabbar-item name="news" @click="$router.push({path:'/newsIndex'})" icon="newspaper-o">专栏</van-tabbar-item>
	  <van-tabbar-item name="contact" icon="contact">我的</van-tabbar-item>
	</van-tabbar>
	
	<!-- 下载APP弹出框 -->
	<van-popup v-model="show" closeable round position="bottom" :style="{ height: '50%' }" class="text-c">
		<downloadApp v-bind:downloadAppText="downloadAppText"></downloadApp>
	</van-popup>
</div>
</template>

<script>
import downloadApp from '@/public/downloadApp' //弹出框APP下载
import Vue from 'vue';
import { Tabbar, Col, Row, Grid, GridItem, Icon } from 'vant';
Vue.use(Tabbar);
Vue.use(Col);
Vue.use(Row);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

export default {
	name: 'userIndex',
	data () {
		return {
			show: false,
			active: 'contact', //底部标签栏默认当前
			realnameData:{},
			userimageData:{},
			downloadAppText:'体验更多功能',
			//token: "09fdcc9fb782c90ecdcdca04202f7037",
			countCollect:[],
			countFollow:[],
		}
	},
	components: {
		 downloadApp
	},
	created (){
	  document.cookie
	  var realname = this.$cookies.get("ykj_name")
	  this.realnameData = realname
	  var userimage = this.$cookies.get("user_image")
	  this.userimageData = userimage
	},
	mounted() {
		//用户token存在时，隐藏“点击登录”文字
		document.cookie
		var token = this.$cookies.get("token")
		var url = window.location.href;
		if(token != null ) { //判断url地址中是否包含token字符串
		  console.log("已登录")
		  var child = document.getElementById("loginName");
		  child.style.display = 'none';
		  var childavatar = document.getElementById("avatar");
		  childavatar.style.display = 'none';
		  var childua = document.getElementById("useravatar");
		  childua.style.display = 'inline-block';
		  this.$ajax.post('consumer/countCollect' + '?user_token=' + token).then((response) => { //收藏数量统计
		      this.countCollect = response.data.data
		  });	
		  this.$ajax.post('consumer/countFollow' + '?user_token=' + token).then((response) => { //关注数量统计
		      this.countFollow = response.data.data
		  });	
		}
		if(url.indexOf("code") >= 0 && url.indexOf("token") >= -1) { //判断url地址中包含code并且不包含token
		  this.wxlogin(); //执行方法
		}
		
	},
	methods:{
		//弹出框
		showPopup() {
		    this.show = true;
		},
		greet: function (event){
		  document.cookie
		  var username = this.$cookies.get("token")
		  if(username != null ) { //判断url地址中是否包含token字符串
		    this.$router.push({  //传参到绑定手机号码页面
		      path:'/Suggest'
		    })
		  }
		 else {
		    alert("投诉建议需要用户先登录")
		  }
		},
		Collect: function (event){
		  document.cookie
		  var username = this.$cookies.get("token")
		  if(username != null ) { //判断url地址中是否包含token字符串
		    this.$router.push({  //传参到绑定手机号码页面
		      path:'/collect'
		    })
		  }
		 else {
		    alert("查看我的收藏需要用户先登录")
		  }
		},
		attention: function (event){
		  document.cookie
		  var username = this.$cookies.get("token")
		  if(username != null ) { //判断url地址中是否包含token字符串
		    this.$router.push({  //传参到绑定手机号码页面
		      path:'/attention'
		    })
		  }
		 else {
		    alert("查看我的关注需要用户先登录")
		  }
		},
		wxlogin: function (event){
		  //沒有token的情況
		  if(!this.$cookies.isKey('token')){
		    //路徑裏有code
		    if(window.location.href.indexOf('code') != -1){
		      console.log('有code')
		      var path = window.location.href
		      let code = path.substring(path.indexOf('code=')+5,path.indexOf('&'))
		
		      console.log(code)
		      this.$ajax({
		        method:'post',
		        url:'consumer/OAuthLogin',
		        data:{
		          oauth_type:'wx_h5',
		          code:code
		        }
		      }).then((response)=>{
		        console.log('设置token')
		        this.$cookies.set('token', response.data.data.token,60*60*24*30)
		        this.$cookies.set('ykj_name', response.data.data.ykj_name,60*60*24*30)
				this.$cookies.set('user_image', response.data.data.user_image,60*60*24*30)
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
		         // window.location.href="#/userIndex";
				  this.$router.push('/userIndex');
				  location.reload();
		        }
		        if (wxcode == 1){
		          alert(response.data.msg)
		        }
		
		        //this.load()
		      })
		    }
		    else{
		      //獲取
		      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1801bf72daa7e799&redirect_uri=http://mobile.ehonge.com/%23/userIndex&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
		    }
		  }
		}
	}
}
</script>

<style lang="less">
.userInfo { padding: 15px; height: 145px; background: url("../assets/imges/user/bg.png") no-repeat; background-size:100% 175px;
	.userAvatar { margin: 15px 0 0 20px; height: 50px;
		img { display: inline-block; width: 50px; height: 50px; border-radius: 50%;}
	}
}
.userIndexBox {
	h2 { padding:5px 10px; font-size: 14px;}
}
#useravatar { display: none;}
</style>
