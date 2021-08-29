<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
         <detail-swiper :top-images="topImages"></detail-swiper>
         <detail-base-info :goods="goods"></detail-base-info>
         <detail-shop-info :shop="shop"></detail-shop-info>
         <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
         <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
         <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
         <goods-list :goods="recommends" ref="recommend"></goods-list>
      </scroll>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
      <!-- <toast/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'


import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'
// import Toast from 'components/common/toast/Toast'


import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {debounce} from 'common/utils.js'
import {mapActions} from 'vuex'
export default {
   name:'Detail',
   data(){
     return{
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      theTopYs:[],
      getTheTopY:null,
      currentIndex:0,
      isShowBackTop:false,
     }
   },
   components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop,
      // Toast
   },
   created(){
    //  1.保存传入的iid
      this.iid = this.$route.params.iid
      
      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        // 1.获取顶部的图片轮播数据
        const data = res.result;
        this.topImages = res.result.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4.获取商品详细信息
        this.detailInfo = data.detailInfo

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        
        // 6.获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
      // 7.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      this.getTheTopY = debounce(() => {
          this.theTopYs = [];
          this.theTopYs.push(0);
          // -44是因为减去nav的高度
          this.theTopYs.push(this.$refs.param.$el.offsetTop - 44);
          this.theTopYs.push(this.$refs.comment.$el.offsetTop - 44)
          this.theTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
          this.theTopYs.push(Number.MAX_VALUE)
      },100)
   },
   mounted(){
       
   },
   methods:{
     ...mapActions['addCart'],
     imageLoad(){
         this.$refs.scroll.refresh()
         this.getTheTopY();
     },
     titleClick(index){
      //  console.log(index);
       this.$refs.scroll.scrollTo(0,-this.theTopYs[index],200)
     },
      backClick(){
         this.$refs.scroll.scrollTo(0,0);
        //  console.log('aaa');
    },
    contentScroll(position){
      //  console.log(position);
      const positionY = -position.y;
      let length = this.theTopYs.length;
      for(let i = 0;i<length-1;i++){
        if(this.currentIndex !== i && (positionY >= this.theTopYs[i] && positionY < this.theTopYs[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
          
        }
      }
       // 1.判断BackTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000
   },
   addToCart(){
    //  console.log(111);
    // 1.获取购物车需要展示的信息
    const product = {};
    product.image = this.topImages[0];
    product.title = this.goods.title;
    product.desc = this.goods.desc;
    product.price = this.goods.realPrice;
    product.iid = this.iid;

    // 2.将商品添加到购物车里
    // this.$store.commit('addCart',product)
    // this.$store.dispatch('addCart',product)

    // this.addCart(product).then(res => {
    //   // console.log(res);
    //      this.$toast.show(res,4000)
    // })
 
    this.$store.dispatch('addCart',product).then(res => {
      console.log(res);
      this.$toast.show(res,4000)
      
    })

    
   }
   }
  
}
</script>

<style scoped>
#detail{
  z-index: 9;
  background-color: #fff;
  position: relative;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>