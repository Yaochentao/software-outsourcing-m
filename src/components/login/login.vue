<template>
  <el-form class="login-container" ref="AccountForm" :model="account" :rules="loginRules" label-position="left">
    <video ref="video" id="video" class="portrait" autoplay style="width: 100px;height: 100px; border-radius: 50%"></video>
    <canvas ref="canvas" id="canvas" width="480" height="480" style="display: none"></canvas>
    <el-form-item prop="username">
      <el-input v-model="account.username" type="text" placeholder="账号">
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="account.password" type="password" placeholder="密码"></el-input>
    </el-form-item>
    <span class="forget" @click="forget">忘记密码</span>
    <el-form-item>
      <el-button @click.native.prevent="handleLogin" :loading="logining" type="primary">登陆</el-button>
      <el-button type="primary" class="resetBtn" @click.native.prevent="goSignUp">注册</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
  import qs from 'qs'
  import axios from 'axios';
  import {
    requseLogin
  } from '../../axios/api';

 
  export default {
    name: "login",
    data() {
      return {
        account: {
          username: '',
          password: ''
        },
        context: '',
        canvas: '',
        id: '',
        faceTrue: false,
        loginRules: {
          username: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
        },
        checked: true,
        logining: false
      };
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

    },
    methods: {
      handleLogin() {
        //人脸识别
           this.context.drawImage(this.video, 0, 0, 480, 480);

            var imgData = this.canvas.toDataURL();

            var base64Data = imgData.substr(22);
            console.log(base64Data)

            this.$http.post('/api/verifyFace.php', qs.stringify({
            'id': this.account.username,
            'base64Data': base64Data
          })).then(res => {
             if(res.data.score > 70) {
               this.faceTrue = true;
             } else{
               this.faceTrue = false;
             }
          })
        //账号密码识别
        this.$refs.AccountForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            let loginParams = qs.stringify({
              id: this.account.username,
              password: this.account.password
            })
            // 调用axios登录接口
            requseLogin(loginParams).then(res => {
              // debugger;
              this.logining = false;
              console.log(this.faceTrue);
              if (res.data.result === "true" && this.faceTrue === true) {
                // elementui中提示组件
                this.$message({
                  type: 'success',
                  message: "登陆成功"
                });
                this.id = parseInt(this.account.username);

                // // 登陆成功，用户信息就保存在sessionStorage中
                // sessionStorage.setItem('user', JSON.stringify(user));
                // 跳转到后台主页面
                console.log(res.data.realRole)
                switch (parseInt(res.data.realRole)) {
                  case 1:
                    this.$router.push({
                      path: '/engineer',
                      query: {
                        id: this.id
                      }
                    });
                    break;
                  case 2:
                    this.$router.push({
                      path: '/publisher',
                      query: {
                        id: this.id
                      }
                    });
                    break;
                  case 3:
                    this.$router.push({
                      path: '/customer',
                      query: {
                        id: this.id
                      }
                    });
                    break;
                  case 4:
                    this.$router.push({
                      path: '/manager',
                      query: {
                        id: this.id
                      }
                    });
                    break;
                }


              } else if(this.faceTrue === false){
                this.$message({
                  type: 'error',
                  message: '人脸错误',
                });
              } else if(res.data.result === "false"){
                this.$message({
                  type: 'error',
                  message: '用户名或密码错误',
                });
              }
            }) 
          } else {
            return false;
          }
        })
      },
      goSignUp() {
        this.$router.push({
          path: '/sign-up'
        })

      },
      forget() {
        this.$router.push({
          path: '/forget'
        })
      }
    }
  }

</script>
<style scoped>
  .portrait {
    position: relative;
    left: 50%;
    margin-left: -50px;
    display: block;
    border-radius: 50%;
  }

  .login-container {
    position: absolute;
    background: #fff;
    width: 350px;
    left: 50%;
    top: 50%;
    margin-top: -200px;
    margin-left: -175px;
    border: 1px solid #d3d3d3;
    box-sizing: border-box;
    padding: 10px 30px;
    border-radius: 5px;
    z-index: 10;
  }
  .forget {
    font-size: 0.8rem;
    color: #409EFF;
    cursor: pointer;
  }
  .el-button {
    width: 100%;
    box-sizing: border-box;
    margin: 10px 0;
    margin-left: 0 !important;
  }

  @media (max-width: 960px) {
    .login-container {
      top: 50%;
      left: 0;
      width: 100%;
      margin-left: 0;

    }
  }

</style>
