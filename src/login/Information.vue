<template>
  <div>
	<van-nav-bar title="绑定手机号码" />
    <div class="pos-rlt">
      <van-form @submit="onSubmit">
      <van-field v-model="user.username" type="tel" left-icon="phone-o" placeholder="手机号码"  maxlength="11" />
        <van-field v-model="user.tel_code" center clearable left-icon="qr" maxlength="6" type="number" placeholder="短信验证码">
          <template #button>
            <van-button size="small" disabled color="#999999" type="primary" v-show="!sendCode">{{authTime}}秒</van-button>
          </template>
        </van-field>

      <div v-model="cs"></div>
      <div class="m-md">
        <van-button color="#dd1a21" block type="info" native-type="submit">绑定</van-button>

        <p class="m-t-sm size12"><van-checkbox v-model="checked" shape="square">我已阅读并接受<a @click="$router.push({path:'/registered'})">《用户服务协议》</a>及<a @click="$router.push({path:'/PrivacyPolicy'})">《隐私政策》</a></van-checkbox></p>
        <p class="m-t-sm size12 gray">* 绑定手机可以提高账号的安全性，方便找回密码</p>
        <p class="m-t-sm size12 gray">* 根据国家互联网信息办公室发布的《移动互联网应用程序信息 服务管 理规定》，自2016年8月20日起，注册用户需基于移动电话号码等真实身份信息进行实名认证。</p>
      </div>
      </van-form>
      <van-button size="small" color="#dd1a21" type="primary" class="Code" v-show="sendCode" @click="ObtainCode()">获取验证码</van-button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Field,Button,Form,Checkbox,CheckboxGroup,Toast } from 'vant';
  Vue.use(NavBar);
  Vue.use(Field);
  Vue.use(Button);
  Vue.use(Form);
  Vue.use(Checkbox);
  Vue.use(CheckboxGroup);
  Vue.use(Toast);
  import VueCookies from 'vue-cookies'
  Vue.use(VueCookies)
  
export default {
  name: 'Imformation',
  components: {
   
  },
  data: function () {
    return {
      checked: true,
      user:{
        username:'',
        tel_code:'',
      },
      sendCode: true, // 控制发送验证码按钮显示
      authTime: 0, // 倒计时
    }
  },
  created(){
    let openid = this.$route.query.openid; //拿到上一个页面的openid
    this.da_openid = openid;
    let oauth_type = this.$route.query.oauth_type; //登录类型
    this.da_oauth_type = oauth_type;
  },
  methods: {
    onSubmit()  {
      var params= {
        'username' : this.user.username,
        'tel_code' : this.user.tel_code,
        'openid': this.da_openid,
        'oauth_type' :this.da_oauth_type,
      };
      var formData = params; // 这里才是你的表单数据

      this.$ajax.post('consumer/OAuthBind', formData).then((response) => {
        // success callback
        console.log(response);
        alert(response.data.msg)//接口返回信息
        var rtoken = response.data.code
        if(rtoken == 0){
          this.$cookies.set('token', response.data.data.token,60*60*24*30)
          this.$cookies.set('ykj_name', response.data.data.real_name,60*60*24*30)
          window.location.href="#/userIndex";
        }
        if (wxcode == 1){
          alert(response.data.msg)
        }

      }, (response) => {
        // error callback
        console.log(error);
      });
    },
    // 获取验证码
    ObtainCode () {
      this.sendCode = false  // 控制显示隐藏
      this.authTime = 60
      let timeInt = setInterval(() => {
        this.authTime--
        if (this.authTime <= 0) {
          this.sendCode = true
          window.clearInterval(timeInt)
        }
      }, 1000)
      var Cparams= {
        'phone' : this.user.username,
        'type' : 'oAuth',
      };
      var Captcha = Cparams; // 这里才是你的表单数据
      this.$ajax.post('consumer/getTelCode', Captcha).then((response) => {
        // success callback
        console.log(response);
      }, (response) => {
        // error callback
        console.log(error);
      });
    },
  }
}
</script>

<style lang="less">
.Code { position: absolute !important; right: 20px; top:50px;}
</style>
