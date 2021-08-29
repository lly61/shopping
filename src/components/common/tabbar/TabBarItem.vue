<template>
    <div class="tab-bar-item" @click="itemClick">
        <!-- <img src="../../assets/images/home.png" alt="">
        <div>首页</div> -->
        <!-- 使用插槽动态添加图片和文字 -->
        <!-- <slot v-if="!isActive" name="item-icon"></slot> -->
        <!-- 包装一下插槽，插槽最好不添加属性 -->
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <!-- <slot v-else name="item-icon-active"></slot> -->
        <div v-else><slot name="item-icon-active"></slot></div>
        <!-- <slot :class="{active:isActive}" name="item-text"></slot> -->
        <!-- 动态绑定样式属性 -->
        <div :style="activeStyle"><slot name="item-text"></slot></div>
        </div>
</template>

<script>
export default {
   name:'TabBarItem',
   props:{
      path:String,
      activeColor:{
          type:String,
          default:'deeppink'
      }
   },
   data(){
       return{
        //    isActive:true,
       }
   },
   computed:{
    //    计算属性， 不等于-1的时候当前为this.path
       isActive(){
           return this.$route.path.indexOf(this.path) !==-1;
       },
    //    计算属性，如果当前活跃 颜色为activeColor    如果没有活跃，颜色默认
       activeStyle(){
           return this.isActive ? {color:this.activeColor} : {}
       }
   },
   methods:{
       itemClick(){
           this.$router.push(this.path);
       }
   }
}
</script>

<style>
  .tab-bar-item{
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 14px;
    margin-top: 3px;
  }
  .tab-bar-item img{
      width: 24px;
      height: 24px;
      vertical-align: middle;
  }
  /* .active{
      color: greenyellow;
  } */
</style>