<template>
  <div class="cartlist">
      <scroll class="content"  ref="scroll">
          <cart-list-item v-for="(item,index) in cartList"
                          :key="index"
                          :item-info="item">
                          </cart-list-item>
      </scroll>
  </div>
</template>

<script>
import cartListItem from './cartListItem.vue'
import Scroll from 'components/common/scroll/Scroll'

import { mapGetters } from 'vuex'
export default {
  name:'cartList',
  components:{
      cartListItem,
      Scroll

  },
  computed:{
      ...mapGetters(['cartList'])
  },
  activated(){
      this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
.cartlist{
    height: calc(100% - 44px - 49px - 40px);
   
}
.content{
     height: 100%;
     overflow: hidden;
    
}

</style>