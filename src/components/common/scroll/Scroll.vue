<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
   name:'Scroll',
   props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
   },
   data(){
       return{
           scroll:null,
       }
   },
   mounted(){
       //this.$refs获取当前组件的wrapper
      //  console.log(this.$refs.wrapper);
        this.scroll = new BScroll(this.$refs.wrapper, {
           click: true,
           observeDOM:true,
           observeImage:true,
           probeType: this.probeType,
           pullUpLoad : this.pullUpLoad, 
          
      })
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
      // 监听上拉加载更多
      if(this.pullUpLoad){
         this.scroll.on('pullingUp',() => {
        // 发送事件给父亲
         this.$emit('pullingUp')
      })
      }

   },
   methods:{
     scrollTo(x,y,time=500){
      //  先判断有值吗再调用
      this.scroll && this.scroll.scrollTo(x,y,time);
     },
     refresh(){
      //  先判断有值吗
      // console.log('---');
      this.scroll && this.scroll.refresh();
     },
     finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
     },
    
     getScrollY(){
       return this.scroll ? this.scroll.y : 0
     }
   }
}
</script>

<style scoped>

</style>