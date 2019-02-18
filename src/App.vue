<template>
  <div id="app">
    <div id="particles"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      particlesJS.load('particles', '/static/particles.data');
    }
  }

</script>

<style>
  @media screen and (min-width: 320px) {
    html {font-size: 14px;}
}
 
@media screen and (min-width: 360px) {
    html {font-size: 16px;}
}
 
@media screen and (min-width: 400px) {
    html {font-size: 18px;}
}
 
  body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  #app {
    width: 100%;
  }
  #particles {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    z-index: -10;
  }

</style>
