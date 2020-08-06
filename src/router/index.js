import Vue from 'vue'
import Router from 'vue-router'
import index from '@/home/index' //首页
import play from '@/video/play' //视频播放页
import userIndex from '@/user/index' //我的首页
import newsIndex from '@/news/index' //专栏首页
import column from '@/news/column' //专栏页
import colDetails from '@/news/details' //专栏详情页

import NoticeApp from '@/public/NoticeApp' //下载通知栏
import downloadApp from '@/public/downloadApp' //弹出框APP下载

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', //首页
      name: 'index',
      component: index,
    },
	{
		path: '/NoticeApp', //顶部APP下载通知栏
		name: 'NoticeApp',
		component: NoticeApp,
	},
	{
		path: '/downloadApp', //弹出框APP下载
		name: 'downloadApp',
		component: downloadApp,
	},
	{
		path: '/play', //视频播放页
		name: 'play',
		component: play,
	},
	{
		path: '/userIndex', //我的首页
		name: 'userIndex',
		component: userIndex,
	},
	{
		path: '/newsIndex', //专栏首页
		name: 'newsIndex',
		component: newsIndex,
	},
	{
		path: '/column', //专栏页
		name: 'column',
		component: column,
	},
	{
		path: '/colDetails', //专栏页
		name: 'colDetails',
		component: colDetails,
	},
  ]
})
