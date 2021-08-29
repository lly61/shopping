<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
      <div class="info-desc">
          <div class="start"></div>
          <div class="desc">{{detailInfo.desc}}</div>
          <div class="end"></div>
      </div>
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list">
          <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
      </div>
  </div>
</template>

<script>
export default {
  name:'DetailGoodsInfo',
  props:{
      detailInfo:{
          type:Object,
          default(){
              return {}
          }
      }
  },
  data(){
      return{
          counter:0,
          imagesLength:0
      }
  },
  methods:{
      imgLoad(){
          if(++this.counter === this.imagesLength){
              this.$emit('imageLoad')
          }
      }
  },
  watch:{
      detailInfo(){
          this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
  }
}
</script>

<style scoped>
.goods-info{
    padding: 5px 5px;
    border-bottom: 5px solid #f2f5f8;
    position: relative;
}
.info-desc{
    margin-top: 5px;
}
.start{
    width: 60px;
    height: 2px;
    margin-top: 10px;
    background-color: #ccc;
}
.desc{
    font-size: 16px;
    color: #333;
    margin: 10px;
}
.end{
    width: 60px;
    height: 2px;
    float: right;
    background-color: #ccc;
}
.info-key{
    float: left;
    margin: 10px 5px;
    color: black;
}
.info-list{
    position: relative;
    margin-top: 20px;
}
.info-list img{
     width: 100%;
     margin: 0;
}  
</style>