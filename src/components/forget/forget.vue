<template>

  <div class="forget">
      <el-input v-model="id" type="text" placeholder="账号"></el-input>
     <el-input v-model="code" type="text" placeholder="验证码" style="width: 50%; display: inline-block; margin-right: 1rem;"></el-input>
     <el-button type="primary" style="display: inline-block; width: 40%;" @click="getCode">获取验证码</el-button>
     <el-input v-model="newPwd" type="text" placeholder='新密码'></el-input>
     <el-button type="primary" @click="changePwd">修改密码</el-button>
  </div>


</template>

<script>
  import qs from 'qs'

  export default {
    name: "forget",
    data() {
      return {
          id: '',
          tel: '',
          code: '',
          verifyCode: '',
          newPwd: ''
      }
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
    
    methods: {
      
      getCode() {
        this.verifyCode = Math.floor(Math.random() * 10000);
        this.$http.post('/api/smsyzm.php', qs.stringify({
          'id': this.id,
          'yzm': this.verifyCode
        })).then(res => {
          console.log(res.data)
        })
      },
      changePwd() {
        if(this.verifyCode == this.code) {
          this.$http.post('/api/changePassword.php', qs.stringify({
          'id': this.id,
          'password': this.newPwd
        })).then(res => {
          this.$message('密码修改成功');
          this.$router.push('/login')
        })
        }
        
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

  .forget {
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
  .el-input {
      margin-top: 2rem;
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
