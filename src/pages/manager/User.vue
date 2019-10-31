<template>
  <div class="user">
    <div class="top">
      <h2>我的</h2>
      <van-icon  name="close" color="red" class="outbtn" @click="logoutHandler" />
    </div>
      <div class="message">
        <van-image
        round
        width="10rem"
        height="10rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="name">
          <!-- {{waiters}} -->
          <span>{{waiters.name}}</span>
        </div>
      </div>
    <div class="btn">
        <div class="changeto" @click="change">我的订单</div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
export default {
  data(){
    return {

    }
  },
  created() {
    this.info(this.token)
  },
  computed:{
    ...mapState("login",["waiters",'token'])
  },
  methods:{
    ...mapActions('login',['logout','info']),
    logoutHandler(){
      // 1. 退出
      this.logout()
      .then(()=>{
        // 2. 跳转到登录
        this.$router.push({path:"/login"})
      })
    },change(){
      this.$router.push({path:"/manager/order"})
    }

  }
}
</script>

<style scoped>
.user{
  position: relative;
}
.name{
  text-align: center;
  display: inline;
  position: relative;
  top: -90px;
  left: 40px;

}
.message{
  text-align:center;
  background-color:lightblue;
}
.changeto{
  border: 1px solid #fff;
  text-align: center;
  cursor: pointer;
  background-color:lightblue;
}
.outer{
  text-align: center;
  color: red;
}
.top{
  text-align: center;
  background-color: lightblue;
  margin: 0;
}
h2{
  margin: 0;
}
.outbtn{
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>