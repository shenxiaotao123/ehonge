<template>
 <div>
   <van-nav-bar title="投诉建议" left-text="返回" left-arrow @click-left="onClickLeft" />
   <van-form @submit="onSubmit">
     <van-field v-model="content" rows="10" autosize type="textarea" placeholder="您有任何的投诉与建议,可以在这里畅所欲言,我们一定耐心倾听, 积极改正...."/>
     <div class="wrapper-md">
       <van-button color="#dd1a21" block type="info" native-type="submit">提交</van-button>
     </div>
   </van-form>


 </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Button,Field } from 'vant';
  Vue.use(Button);
  Vue.use(Field);
  Vue.use(NavBar);

  export default {
    name: "Suggest",
	data(){
	  return{
	    
	  }
	},
    created(){
      document.cookie
      var token = this.$cookies.get("token")
    },
    methods:{
      onSubmit() {
        var params= {
          'content' : this.content,
          'user_token' : this.$cookies.get("token"),
        };
        var formData = params; // 这里才是你的表单数据
        this.$ajax.post('consumer/feedback', formData).then((response) => {
          // success callback
          alert(response.data.msg)//接口返回信息
        }, (response) => {
          // error callback
          console.log(error);
        });
      },
	  onClickLeft() {
	    window.history.go(-1);
	  },
    },
  }
</script>

<style scoped>

</style>
