<template>
  <div class="order">
    <van-row>
        <van-col span="6"></van-col>
        <van-col span="12" class="top"><h2>订单</h2></van-col>
        <van-col span="6"></van-col>
    </van-row>
    <van-tabs v-model="active">
      <van-tab title="全部订单">
        <!-- {{orders}} -->
      <van-panel v-for="c in orders" :title="'订单编号：'+c.id" :key="c.id" :status="c.status">
        <div style="border:2px solid #fff"> 
          <ul style="background-color:lightblue;">
            <li>总价：{{c.total}}</li>
            <li>下单时间：{{c.orderTime | datefmt}}</li>
            <li>顾客姓名：{{c.customer.realname}}</li>
            <li>联系电话：{{c.customer.telephone}}</li>
            <li>地址：{{c.address.province}} {{c.address.city}} {{c.address.area}}</li>
          </ul>
        </div>
      </van-panel>
      </van-tab>
      <van-tab title="未接订单">
        <van-panel v-for="c in unAcceptOrders" :title="'订单编号：'+c.id" :key="c.id" :status="c.status">
        <ul style="background-color:lightblue;">
          <li>总价：{{c.total}}</li>
          <li>下单时间：{{c.orderTime | datefmt}}</li>
          <li>顾客姓名：{{c.customer.realname}}</li>
          <li>联系电话：{{c.customer.telephone}}</li>
          <li>地址：{{c.address.province}} {{c.address.city}} {{c.address.area}}</li>
        </ul>
        <div style="text-align: center;">
          <span @click="reject(c.id)" style="margin:50px;color:red">拒绝</span>
          <span @click="accept(c.id)" style="margin:50px;color:blue">接受</span>
        </div>
      </van-panel>
      </van-tab> 
      <van-tab title="待服务订单">
        <van-panel v-for="c in unSureOrders" :title="'订单编号：'+c.id" :key="c.id" :status="c.status">
        <ul style="background-color:lightblue;">
          <li>总价：{{c.total}}</li>
          <li>下单时间：{{c.orderTime | datefmt}}</li>
          <li>顾客姓名：{{c.customer.realname}}</li>
          <li>联系电话：{{c.customer.telephone}}</li>
          <li>地址：{{c.address.province}} {{c.address.city}} {{c.address.area}}</li>
        </ul>
      </van-panel>
      </van-tab>
      <van-tab title="已完成订单">
        <!-- {{ordersssss}} -->
        <van-panel v-for="c in finishOrders" :title="'订单编号：'+c.id" :key="c.id" :status="c.status">
        <ul style="background-color:lightblue;">
          <li>总价：{{c.total}}</li>
          <li>下单时间：{{c.orderTime | datefmt}}</li>
          <li>顾客姓名：{{c.customer.realname}}</li>
          <li>联系电话：{{c.customer.telephone}}</li>
          <li>地址：{{c.address.province}} {{c.address.city}} {{c.address.area}}</li>
        </ul>
        <div style="text-align: center;">
          <span @click="cancelHandler(c.id)" style="color:red">确认订单</span>
        </div>
      </van-panel>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'
export default({
  data(){
    return {
      active:0,
      activeName:["1"]
    }
  },
  created(){
    // console.log(this.waiters)
    this.findAllOrders(this.waiters.id);

  },
  computed:{
    ...mapState("order",["orders","unAcceptOrders","unSureOrders","finishOrders"]),
    ...mapState("login",["waiters",'token'])
  },
  methods:{
    ...mapActions("order",["findAllOrders","deleteOrderById","unAccept","unSure","finish","rejectOrder","acceptOrder","finishOrder"]),
    finishHandler(id){
      this.finishOrder(id)
      .then((response)=>{
          if(response.status === 200) {
            // console.log(response)
            this.$notify({type:"success",message:response.statusText})
          }else{
            alert(response.statusText)
          }
      })
    },
    cancelHandler(id){
      this.finishOrder(id)
      .then((response)=>{
          if(response.status === 200) {
            // console.log(response)
            this.$notify({type:"success",message:response.statusText})
          }else{
            alert(response.statusText)
          }
      })
    },
    reject(id){
      this.rejectOrder(id).then(response=>{
        if(response.status === 200) {
            this.$notify({type:"success",message:"已拒绝"})
        }
      })
    },
    accept(id){
      // alert(id)
      this.acceptOrder(id).then(response=>{
        if(response.status === 200) {
            this.$notify({type:"success",message:"已接单"})
        }
      })
    }
  }

})
</script>
<style scoped>
  .top{
    text-align: center;
  }
  .message{
    text-align: left;
  }
</style>