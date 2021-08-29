<template>
  <div class="cart">
    <!-- 导航 -->
      <nav-bar class="navbar">
        <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>

      <!-- 商品列表 -->
       <cart-list/>


      <!-- 底部 -->
      <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import cartList from './children/cartList.vue'
import bottomBar from './children/bottomBar.vue'

import { mapGetters } from 'vuex'
export default {
  name:'Cart',
  components:{
    NavBar,
    cartList,
    bottomBar
  },
  computed:{
    // cartLength(){
      // return this.$store.state.cartList.length
      // })
       // 两种语法
      ...mapGetters(['cartLength','cartList'])
    //   ...mapGetters({
    //     length:'cartLength',
    //     list:'cartList'
    // })
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.navbar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>