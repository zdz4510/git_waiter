<template>
  <div class="home">
    <van-nav-bar title="我的" style="border:.5px solid #ededed"></van-nav-bar>
    <van-row>
      <img style="width:100%" src="../../assets/images/home_02.png" alt="">
    </van-row>
    <!-- {{unAcceptOrders}} -->
    <div v-for="item in unAcceptOrders" :key="item.id">
      <div class="title">
        <strong>订单编号：{{item.id}}</strong>
        <div class="orderMessage">
          <ul style="background-color:lightblue;">
            <li>总价：{{item.total}}</li>
            <li>下单时间：{{item.orderTime | datefmt}}</li>
            <li>顾客姓名：{{item.customer.realname}}</li>
            <li>联系电话：{{item.customer.telephone}}</li>
            <li>地址：{{item.address.province}} {{item.address.city}} {{item.address.area}}</li>
          </ul>
        </div>
        <div class="btn">
          <a  @click.prevent="accept(item.id)">立即接单</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  created(){
  },
  computed:{
    ...mapState("order",["unAcceptOrders"]),
  },
  methods:{
    ...mapActions("order",["findAllOrders","acceptOrder"]),
      accept(id){ 
      // alert(id)
      this.acceptOrder(id).then(response=>{
        if(response.status === 200) {
            this.$notify({type:"success",message:"已接单"})
        }
      })
    }
  }
}
</script>
<style scoped>
.home{
  font-size: 1em;
}
.btn{
  text-align: center;
}
a{
  color:blue;
}
</style>