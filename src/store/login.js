import {get,post,post_array} from '../http/axios';
import axios from 'axios';
import {getToken,setToken,removeToken} from '../http/auth'


export default {
  namespaced:true,
  state:{
    waiters:[],
    token:getToken()
  },
  getters:{
  },
  mutations:{
    refreshToken(state,token){
      state.token = token;
    },
    refreshOrders(state,waiters){
      state.waiters = waiters;
    },
    setTitle(state,title){
      state.title = title;
    }
  },
  actions:{
      async loginIn(context,user) {
          let login_response = await axios.post("/user/login",user);
          let token = login_response.data.token;
          // 0. 将token设置到状态机
          context.commit('refreshToken',token);
          setToken(token)
      },
      async info(context,token){
          let info_response = await get("/user/info?token="+token);
          context.commit("refreshOrders",info_response.data);
            
      },
      // 退出
      async logout(context){
        // 1. 请求后台退出
        await post("/user/logout");
        // 2. 移除本地缓存中的token
        removeToken();
        // 3. 移除状态机中的token以及info
        context.commit("refreshOrders",null);
        context.commit("refreshToken","");
      }
  }
}