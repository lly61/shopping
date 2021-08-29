<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils'
export default {
  name:'DetailCommentInfo',
  props:{
    commentInfo:{
      type:Object,
      default(){
        return{}
      }
    }
  },
  filters:{
    showDate(value){
      // 1.将时间戳转换成Date对象
      const date = new Date(value * 1000)
      // 2.将date进行格式化
      return formatDate(date,'yyyy-MM-dd hh:mm:ss')
    }
  }
}
</script>

<style scoped>
.comment-info{
  padding: 10px 5px;
  border-bottom: 5px solid #f2f5f8;
}
.info-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 3px solid #f2f5f8;
}


.info-user{
  margin: 10px 5px;
  display: flex;
  align-items: center;
}
.info-user img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.info-user span{
  margin-left: 8px;
  font-size: 16px;
  color: black;
}

.info-other{
  margin-top: 5px;
  font-size: 6px;
}
.info-other span:nth-child(2){
  margin-left: 8px;
}
.info-imgs{
  padding: 15px 0;
}
.info-imgs img{
  width: 80px;
  height: 80px;
  margin-right: 5px;
}
</style>