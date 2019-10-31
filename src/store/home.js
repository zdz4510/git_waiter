import {get,post,post_array} from '../http/axios';

export default {
  namespaced:true,
  state:{
    unAcceptOrders:[]
  },
  getters:{
  },
  mutations:{
    //获取所有的订单信息
    refreshOrders(state,orders){
      state.orders = orders;
    },
    unAccept(state,unAcceptOrders){
      let a=unAcceptOrders.filter((item)=>{
        return item.status==="待接单";
      })
      state.unAcceptOrders=a;
    },
    accept(state,acceptOrders){
      let a=acceptOrders.filter((item)=>{
        return item.status==="已接单";
      })
      state.acceptOrders=a;
    },
    unSure(state,unSureOrders){
      let a=unSureOrders.filter((item)=>{
        return item.status==="未服务";
      })
      state.unSureOrders=a;
    },
    finish(state,finishOrders){
      let a=finishOrders.filter((item)=>{
        return item.status==="已完成";
      })
      state.finishOrders=a;
    }
  },
  actions:{
    async deleteOrderById(context,id){
      let response = await get("/order/deleteById?id="+id);
      context.dispatch("findAllOrders");
      return response;
    },
    async findAllOrders(context,id){
      // 1. ajax查询
      let response = await get("/order/query?waiterId="+id);
      // 2. 将查询结果更新到state中
      // alert(1);
      context.commit("refreshOrders",response.data);
      context.commit("unAccept",response.data);
      context.commit("accept",response.data);
      context.commit("unSure",response.data);
      context.commit("finish",response.data);
    },
    // payload 员工信息
    async saveOrUpdateOrder(context,payload){
      // 1. 保存或更新
      let response = await get("/order/serviceCompleteOrder",payload)
      // 2. 刷新页面
      // console.log(response)
      context.dispatch("findAllOrders");
      // 4. 提示
      return response;
    },
    // 完成订单
    async finishOrder(context,orderId){
        let response = await get("/order/serviceCompleteOrder?orderId="+orderId);
        console.log(response)
        context.dispatch("findAllOrders");
        return response;
    }
    ,
    // 拒绝订单
    async rejectOrder(context,orderId){
      let response = await get("/order/rejectOrder",{orderId});
      console.log(response)
      context.dispatch("findAllOrders");
      return response;
    },
     // 接受订单
     async acceptOrder(context,orderId){
      let response = await get("/order/takeOrder",{orderId});
      context.dispatch("findAllOrders");
      return response;
    }
  }
}