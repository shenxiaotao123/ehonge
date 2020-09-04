<template>
    <div>
      <van-nav-bar title="联系我们" left-text="返回" left-arrow @click-left="onClickLeft" />
      <div class="mar-b-10 m-t-xxs">
        <van-cell title="易空间官网" is-link  value="www.ehonge.com"/>
        <van-cell title="联合创展" is-link value="www.zjlhcz.com" />
        <van-cell title="服务热线 " is-link value="400-622-1988" />
      </div>

      <p class="m-t-sm wrapper-xs padder">
        公司地址
      </p>
	  <div class="mar-b-10 m-t-xxs">
	    <van-cell value="浙江省丽水市莲都区厦河路107号二楼"/>
	  </div>
      <div >
        <p style="line-height: 8vw">

        </p>
        <img src="@/assets/imges/user/contactUs.png" width="100%"/>
      </div>

    </div>
</template>

<script>
import Vue from 'vue'
import { Cell,NavBar } from 'vant';
Vue.use(Cell);
Vue.use(NavBar);

export default {
	name: 'about',
	data () {
		return {
			
		}
	},
	mounted() {
		
	},
	methods: {
		onClickLeft() {
		  window.history.go(-1);
		},
	},
}
</script>

<style lang="less">
.about_us_title { text-indent: 28px;}
</style>
