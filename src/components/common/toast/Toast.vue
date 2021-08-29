<template>
  <div class="toast" v-show="show">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  props:{
    //   message:{
    //       type:String,
    //       default:''
    //   },
    //   isShow:{
    //       type:Boolean,
    //       default:false
    //   }
  },
  data(){
      return{
         message:'',
         isShow:false
      }
  },
  methods:{
      show(message,duration){
        this.isShow = true;
        this.message = message

        setTimeout(() => {
            this.isShow = false;
            this.message = ''
        },duration)
      }
  }
}
</script>

<style>
  .toast{
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: rgba(0,0,0,.7);
      z-index: 999;
  }
</style>