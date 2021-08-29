import Vue from "vue";
import Vuex from 'vuex';


import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
    state:{
       cartList:[]
    },
     // 1.mutations唯一的目的是修改state中的状态
    // mutations中的每一个方法尽可能完成的事件比较单一一点
    mutations,
    actions,
    getters
})

// 3.挂载Vue实例上
export default store
