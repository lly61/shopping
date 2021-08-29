<template>
  <div class="bottom-bar"> 
      <div class="check-content">
          <check-button class="check-botton" :is-checked="isSelectAll" @click.native="checkClick"/>
          <span>全选</span>
      </div>
      
      <div class="check-all">
          合计:{{toallPrice}}
      </div>

      <div class="check-go" @click="calcClick">
          去结算:{{checkCount}}
      </div>
  </div>
</template>

<script>
import checkButton from 'components/common/checkbutton/checkButton'
export default {
  name:'bottomBar',
  components:{
      checkButton
  },
  computed:{
      toallPrice(){
          return '￥' + this.$store.state.cartList.filter(item => {
              return item.checked
          }).reduce((preValue,item) => {
              return preValue + item.count * item.price
          },0).toFixed(2)
      },
      checkCount(){
          return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
          if(this.$store.state.cartList.length === 0) return false

        //   1.使用filter
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        // 2.使用find
        // return !this.$store.state.cartList.find(item => !item.checked)
        // 3.for循环遍历
        for(let item of this.$store.state.cartList){
            if(!item.checked){
                return false
            }
        }
        return true
      }
  },
  methods:{
      checkClick(){
          if(this.isSelectAll){   //如果全部选中
              this.$store.state.cartList.forEach(item => item.checked = false)    //点击全部不选中
          }else{    //如果全部不选中或部分不选中
              this.$store.state.cartList.forEach(item => item.checked = true)    //点击全部选中
          }
      },
      calcClick(){
          if(!this.isSelectAll){
              this.$toast.show('请选择购买的商品',4000)
          }
      }
  }
}
</script>

<style scoped>
.bottom-bar{
    display: flex;
    justify-content: space-between;
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
}
.check-button{
    width:20px;
    height: 20px;
    line-height: 20px;
}
.check-content span{
    margin-left: 5px;
}
.check-go{
    width: 80px;
    background-color: var(--color-tint);
    text-align: center;
    color: snow;
}
</style>