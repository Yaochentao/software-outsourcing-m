<template>
  <div class="main">
    <video ref="video" id="video" class="portrait" autoplay style="display: none;width: 100px;height: 100px; border-radius: 50%"></video>
    <canvas ref="canvas" id="canvas" width="480" height="480" style="display: none"></canvas>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand>智能众包</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item @click="toList">项目</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content"><em>User</em></template>
            <b-dropdown-item @click="toProfile">Profile</b-dropdown-item>
            <b-dropdown-item to="/login">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="content-container">
      <div class="center-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import bNavbar from 'bootstrap-vue/es/components/navbar/navbar'
  import qs from 'qs'
  export default {
    data() {
      return {
        id: '',
        context: '',
        canvas: '',
      }
    },
    mounted() {
       //访问用户媒体设备的兼容方法
        function getUserMedia(constrains, success, error) {
            if (navigator.mediaDevices.getUserMedia) {
                //最新标准API
                navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
            } else if (navigator.webkitGetUserMedia) {
                //webkit内核浏览器
                navigator.webkitGetUserMedia(constrains).then(success).catch(error);
            } else if (navigator.mozGetUserMedia) {
                //Firefox浏览器
                navagator.mozGetUserMedia(constrains).then(success).catch(error);
            } else if (navigator.getUserMedia) {
                //旧版API
                navigator.getUserMedia(constrains).then(success).catch(error);
            }
        }
       
        var video = this.$refs.video;
        var canvas = this.$refs.canvas;
        console.log(video)
        var context = canvas.getContext("2d");
        this.context = context;
        this.canvas = canvas;
        this.video = video;

        //成功的回调函数
        function success(stream) {
            //兼容webkit内核浏览器
            var CompatibleURL = window.URL || window.webkitURL;
            //将视频流设置为video元素的源
            video.src = CompatibleURL.createObjectURL(stream);
            //播放视频
            video.play();
        }

        //异常的回调函数
        function error(error) {
            console.log("访问用户媒体设备失败：", error.name, error.message);
        }
        if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
            //调用用户媒体设备，访问摄像头
            getUserMedia({
                video: {
                    width: 480,
                    height: 480
                }
            }, success, error);
        } else {
            alert("你的浏览器不支持访问用户媒体设备");
        }
        if(this.timer) {
          clearInterval(this.timer);
        } else {
          this.timer = setInterval(() => {
            this.checkFace();
          },180000)
        }

    },
    created: function () {
      this.getId();
    },
    destroyed() {
      clearInterval(this.timer)
    },
    methods: {
      getId() {
        this.id = this.$route.query.id;
        console.log('e' + this.id)
      },
      checkFace() {
        console.log(this.video)
        this.context.drawImage(this.video, 0, 0, 280, 280);

            var imgData = this.canvas.toDataURL();

            var base64Data = imgData.substr(22);
            console.log(base64Data)
            console.log(this.id)
        this.$http.post('/api/verifyFace.php', qs.stringify({
            'id': this.id,
            'base64Data': base64Data
          })).then(res => {
            console.log(res.data.msg)
             if(res.data.msg == '未检测到人脸' || res.data.msg == '人脸匹配度低' || res.data.msg == '检测到多张人脸') {
               this.$router.push({
                 path: '/login'
               })
             }
          })
      },
      toList() {
        this.$router.push({
          path: '/engineer/project-list-e',
          query: {
            id: this.id
          }
        });
      },
      toProfile() {
        this.$router.push({
          path: '/engineer/profile',
          query: {
            id: this.id
          }
        });
      },

    },
    components: {
      bNavbar
    }
  }

</script>
<style scoped>
  .content-container {
    width: 100%;
    overflow: hidden;
  }

  @media (min-width: 961px) {
    .center-container {
      background: #fff;
      width: 962px;
      margin: 30px auto;
      min-height: 500px;
      border-radius: 4px;
      border-color: #E3E3E3;
      box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.12);
      overflow: hidden;
    }
  }

  @media (max-width: 960px) {
    .center-container {
      background: #fff;
      width: 100%;
      margin: 0px auto;
      border-radius: 4px;
      border-color: #E3E3E3;
      box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.12);
      overflow: hidden;
    }
  }

</style>
