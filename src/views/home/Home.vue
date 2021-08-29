<template>
  <div id="home" class="wrapper">
    <nav-bar  class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
             @tabclick="tabClick"
             ref="tabControl1"
             class="tab-control"
             v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore"
            >
        <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']"
             @tabclick="tabClick"
             ref="tabControl2"
             ></tab-control>
        <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

   
  </div>
</template>

<script>
import HomeSwiper from 'views/home/childComps/HomeSwiper'
import RecommendView from 'views/home/childComps/RecommendView'
import FeatureView from 'views/home/childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'


import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'


export default {
  name:'Home',
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0, list: []},
        'new':{page:0, list: []},
        'sell':{page:0, list: []}
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffTop:613,
      isTabFixed:false,
      saveY: 0
    }
  },
  computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
  },
  created(){
    // 1.请求多个数据
       this.getHomeMultidata();
      //  2.请求商品数据
       this.getHomeGoods('pop');
       this.getHomeGoods('new');
       this.getHomeGoods('sell');     
    
  },
  activated(){
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      
  },
  deactivated(){
      this.saveY = this.$refs.scroll.getScrollY();
  },
  mounted(){
    // 图片加载完成的事件监听，调用了debounce防抖函数
    const refresh = debounce(this.$refs.scroll.refresh,200)
        // 事件总线监听图片加载完成
       this.$bus.$on('itemimgload', () => {
        //  this.$refs.scroll && this.$refs.scroll.refresh();
        refresh()
       })

  },
  methods:{
  
    // 事件监听相关方法
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
      this.$refs.tabControl1.cuttnerindex = index;
      this.$refs.tabControl2.cuttnerindex = index;
     
    },
    backClick(){
         this.$refs.scroll.scrollTo(0,0);
        //  console.log('aaa');
    },
    contentScroll(position){
      // 1.判断BackTop是否显示
           this.isShowBackTop = Math.abs(position.y) > 1000

          //  2.决定tabControl是否吸顶
          this.isTabFixed = Math.abs(position.y) > this.tabOffTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad(){
      // console.log(this.$refs.tabControl2.$el.offsetTop);

    },
    // 网络请求相关方法
     getHomeMultidata(){
         getHomeMultidata().then(res =>{
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
     },
    //  网络请求相关方法
     getHomeGoods(type){
      //  定义一个page动态绑定数据页码
       const page = this.goods[type].page + 1;
       getHomeGoods(type,page).then(res => {
        //  console.log(res);
        // ...es6扩展运算符，可以将数组里的数据展开，数据一一对应
          this.goods[type].list.push(...res.data.list);
          // 原来页码加1，因为给了一组数据，所以当前页码为1
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp();
       })
     }
  }
}
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    /* position: relative; */
    height: 100vh;
    
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    /* position: sticky; */
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

</style>