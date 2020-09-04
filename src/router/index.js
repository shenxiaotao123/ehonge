import Vue from 'vue'
import Router from 'vue-router'
import index from '@/home/index' //首页
import play from '@/video/play' //视频播放页
import userIndex from '@/user/index' //我的首页
import Information from '@/login/Information' //微信登录-绑定手机号码
import attention from '@/user/attention' //我的关注
import collect from '@/user/collect' //我的收藏
import about from '@/user/about' //关于我们
import PrivacyPolicy from '@/user/PrivacyPolicy' //隐私协议
import registered from '@/user/registered' //注册协议
import contact from '@/user/contact' //联系我们
import Suggest from '@/user/Suggest' //投诉建议
import newsIndex from '@/news/index' //专栏首页
import column from '@/news/column' //专栏页
import colDetailsText from '@/news/detailsText' //专栏详情页 - 图文
import detailsVideo from '@/news/detailsVideo' //专栏详情页 - 视频
import comment from '@/news/comment' //专栏详情页 - 评论页

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
		path: '/Information', //微信登录-绑定手机号码
		name: 'Information',
		component: Information,
	},
	{
		path: '/attention', //我的关注
		name: 'attention',
		component: attention,
	},
	{
		path: '/collect', //我的收藏
		name: 'collect',
		component: collect,
	},
	
	{
		path: '/about', //关于我们
		name: 'about',
		component: about,
	},
	{
		path: '/PrivacyPolicy', //隐私协议
		name: 'PrivacyPolicy',
		component: PrivacyPolicy,
	},
	{
		path: '/registered', //注册协议
		name: 'registered',
		component: registered,
	},
	{
		path: '/contact', //联系我们
		name: 'contact',
		component: contact,
	},
	{
		path: '/Suggest', //投诉建议
		name: 'Suggest',
		component: Suggest,
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
		path: '/colDetailsText', //专栏详情页 - 图文
		name: 'colDetailsText',
		component: colDetailsText,
	},
	{
		path: '/detailsVideo', //专栏详情页 - 视频
		name: 'detailsVideo',
		component: detailsVideo,
	},
	{
		path: '/comment', //专栏详情页 - 评论页
		name: 'comment',
		component: comment,
	},
  ]
})
