<template>
	<div>
		<van-tabs v-model="active" @click="onClick">	
		  <van-tab :title="vClass.name" :name="vClass.id" :id="vClass.id" v-for="vClass of videoClass">
			<div class="videoList">
			  <van-row gutter="10">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
					<van-col span="12" v-for="vid of videolist">
						<div class="video pos-rlt" @click="$router.push({path:'/play',query:{id:vid.id}})">
							<van-image width="100%" height="175" radius="3px" :src="vid.video.cover_img" />
							<div class="videoTitle">
								<p>{{vid.video.title}}</p>
							</div>
						</div>
					</van-col>
					
					<!-- <van-col span="12" v-for="vid of videolist" :key="vid">
								<p>{{vid.created_at}}</p>
					
					</van-col> -->
					
				</van-list>  
				
			  </van-row>
			</div>
		  </van-tab>
		</van-tabs>
		
		<van-tabbar v-model="activeD">
		  <van-tabbar-item name="home" icon="wap-home-o">首页</van-tabbar-item>
		  <van-tabbar-item name="news" icon="newspaper-o" @click="$router.push({path:'/newsIndex'})">专栏</van-tabbar-item>
		  <van-tabbar-item name="contact" icon="contact" @click="$router.push({path:'/userIndex'})">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template> 	

<script>
import Vue from 'vue';
import { Tab, Tabs, Tabbar, TabbarItem, NoticeBar, Button, Col, Row, List } from 'vant';
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
Vue.use(List);

export default {
	name: 'index',
	data () {
		return {
			activeD: 'home', //底部标签栏默认当前
			activeName: 1, //Tab默认当前页
			videolist:[],
			videoClass:[],
			loading: false,
			finished: false,
			itemsPerLoad: 0
		}
	},
	mounted() {
		this.$ajax.get('info/class').then((response) => { //视频分类
		    this.videoClass = response.data.data
			//console.log(response.data.data[0].id);
		});	
		// var vcid = videoClassId;
		// console.log(videoClassId);
		// this.$ajax.get('info/video' + '?class_id=' + '5' ).then((response) => { //视频列表
		//     this.videolist = response.data.data.data
		// });	
	},
	methods: {
		onClick(name, title) {
			//console.log(name)
			// this.$ajax.get('info/video' + '?class_id=' + name ).then((response) => { //视频列表
			//     this.videolist = response.data.data.data
			// });	
			var namex = name;
			var itemsP = this.itemsPerLoad++ + 6;
			this.itemsPerLoad = itemsP
			this.$ajax.get('info/video',{
				params: {
					class_id: name,
					lastIndex:0,
					itemsPerLoad:itemsP,
				},
			},).then((response) =>  {
			var count = response.data.data.count
			var page = response.data.data.page
			
			for (let i = 0; i < 6; i++) {
			    this.videolist.push(this.videolist.length + 6);
			 }
			    // 加载状态结束
			    this.loading = false;
			 
			    // 数据全部加载完成
			    if (this.videolist.length >= count) {
							this.finished = true;
				}
				this.videolist = response.data.data.data
				
				
			});
		},
		onLoad() {
			   //var next = this.page++ + 8;
			   //this.page = next
			   var b = this.onClick(name)
			   var noc = document.getElementsByClassName("van-tab__pane")[0].id; //获取第一个TAB的ID
			   var itemsP = this.itemsPerLoad++ + 6;
			   this.itemsPerLoad = itemsP
			    this.$ajax.get('info/video',{
					params: {
					  class_id:noc, //赋值第一个TAB的ID，显示第一个
					  lastIndex:0,
					  itemsPerLoad:itemsP,
					},
				  },).then((response) =>  {
						var count = response.data.data.count
						var page = response.data.data.page
			            for (let i = 0; i < 6; i++) {
			              this.videolist.push(this.videolist.length + 6);
			            }
						
			            // 加载状态结束
			            this.loading = false;
			    
			            // 数据全部加载完成
			            if (this.videolist.length >= count) {
						
			              this.finished = true;
			            }
						this.videolist = response.data.data.data
			          });
		     　
		    },
	}
}
</script>

<style lang="less">
@miam-color: #f24646;
.videoList { margin: 10px 10px 60px 10px;
	.video { margin-bottom: 10px; height: 175px;
		.videoTitle { padding: 5px 0; width: 100%; line-height: 1.3; position: absolute; bottom: 0; color: #fff; font-size: 14px;  background: linear-gradient(rgba(0,0,0,0),black); border-radius: 0 0 3px 3px;
			>p { padding: 0 5px; overflow: hidden; text-overflow: ellipsis;  display: -webkit-box; -webkit-line-clamp: 2;  -webkit-box-orient: vertical;}
		}
	}
}
.van-list__finished-text { float:left; width: 100%;}
</style>
