<template>
  <div id="app">
      <main-tar-bar class="main-tar-bar"></main-tar-bar>
      <keep-alive exclude="Detail">
         <router-view></router-view>
      </keep-alive>
       <!-- <router-view></router-view> -->
    
     
  </div>
</template>

<script>
  import MainTarBar from 'components/content/mainTabbar/MainTarBar.vue'
export default {
   name:'App',
   components:{
     MainTarBar,
   }
}
</script>

<style>
  @import './assets/css/index.css';

</style>