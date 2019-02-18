<template>

  <div class="signUp">
    <video ref="video" class="portrait" autoplay style="width: 100px;height: 100px; border-radius: 50%"></video>
    <canvas ref="canvas" width="280" height="280" v-show="canvasShow"></canvas>
    <el-tabs class="sign-up-container" v-model="activeTab">
    <el-tab-pane label="接包人员注册" name="first">
      <el-form ref="AccountForm" :model="account" :rules="loginRules" label-position="left">
        
        <el-form-item prop="id">
          <el-input v-model="account.id" type="text" placeholder="账号">
          </el-input>
        </el-form-item>
        <el-form-item prop="id">
          <el-input v-model="account.name" type="text" placeholder="姓名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="account.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="tel">
          <el-input v-model="account.tel" type="text" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="code" type="text" placeholder="请输入收到的短信验证码"></el-input>
          <el-button type="primary" @click.native.prevent="getCode">获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="skill">
          <el-input v-model="account.skill" type="text" placeholder="技术栈"></el-input>
        </el-form-item>
        <el-form-item prop="teamId">
          <el-input v-model="account.teamId" type="text" placeholder="团队ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="signUp">提交</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="接包组长注册" name="second">
      <el-form ref="AccountForm" :model="account" :rules="loginRules" label-position="left">
        <el-form-item prop="id">
          <el-input v-model="account.id" type="text" placeholder="账号">
          </el-input>
        </el-form-item>
        <el-form-item prop="id">
          <el-input v-model="account.name" type="text" placeholder="姓名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="account.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="tel">
          <el-input v-model="account.tel" type="text" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="code" type="text" placeholder="请输入收到的短信验证码"></el-input>
          <el-button type="primary" @click.native.prevent="getCode">获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="teamId">
          <el-input v-model="account.skill" type="text" placeholder="团队ID"></el-input>
        </el-form-item>
        <el-form-item prop="teamName">
          <el-input v-model="account.teamName" type="text" placeholder="团队名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="signUp">提交</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="发包公司注册" name="third">
      <el-form ref="AccountForm" :model="account" :rules="loginRules" label-position="left">
        <el-form-item prop="id">
          <el-input v-model="account.id" type="text" placeholder="账号">
          </el-input>
        </el-form-item>
        <el-form-item prop="id">
          <el-input v-model="account.name" type="text" placeholder="姓名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="account.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="tel">
          <el-input v-model="account.tel" type="text" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="code" type="text" placeholder="请输入收到的短信验证码"></el-input>
          <el-button type="primary" @click.native.prevent="getCode">获取验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="signUp">提交</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  </div>


</template>

<script>
  import qs from 'qs'
  import {
    requseLogin
  } from '../../axios/api';

  export default {
    name: "login",
    data() {
      return {
        account: {
          id: '',
          name: '',
          password: '',
          tel: '',
          skill: '',
          expRole: '',
          teamId: '',
          teamName: '',
        },
        code: '',
        verifyCode: '',
        context: '',
        canvas: '',
        activeTab: 'first',
        canvasShow: false,
        loginRules: {
          id: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          tel: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          }],
          skill: [{
            required: true,
            message: '请输入技术栈',
            trigger: 'blur'
          }],
          expRole: [{
            required: true,
            message: '请输入注册人员类型',
            trigger: 'blur'
          }]
        },
      };
    },
    computed: {
      expRoleNum() {
        if (this.activeTab == 'first') {
          return 1;
        } else if (this.activeTab == 'second') {
          return 2;
        } else {
          return 3;
        }
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

    },
    methods: {
      signUp() {
        if (this.verifyCode == this.code) {
          console.log('codeTrue')
          this.canvasShow = true;
          console.log(this.video)
          this.context.drawImage(this.video, 0, 0, 280, 280);

          var imgData = this.canvas.toDataURL();

          var base64Data = imgData.substr(22);
          console.log(base64Data)
          this.$http.post('/api/addFace.php', qs.stringify({
            'id': this.account.id,
            'base64Data': base64Data
          })).then(res => {
            console.log(res)
          })
          this.account.expRole = this.expRoleNum;
          this.$http.post('/api/register.php', qs.stringify(this.account))
          console.log(this.account)
          this.$alert('提交成功，等待管理员审核', '提示', {
            confirmButtonText: '确定',
          });
          this.$router.push({
            path: '/login'
          })
        }
      },
      getCode() {
        this.verifyCode = Math.floor(Math.random() * 10000)
        this.$http.post('/api/smsyzmWhileRegister.php', qs.stringify({
          'tel': this.account.tel,
          'yzm': this.verifyCode
        })).then(res => {
          console.log(res.data)
          this.$alert('验证码已发送，收到后请填入下方输入框', '提示', {
            confirmButtonText: '确定',
          });
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
  .signUp {
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
