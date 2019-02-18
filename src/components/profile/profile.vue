<template>
  <div class="profile">
    <el-form ref="form" label-width="80px">
      <el-form-item label="ID">
        <el-input :placeholder="profile.id" v-model="profile.id" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input :placeholder="profile.password" v-model="profile.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input :placeholder="profile.name" v-model="profile.name"></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <el-input :placeholder="profile.realRole" v-model="profile.realRole" :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="团队ID">
        <el-input :placeholder="profile.teamId" v-model="profile.teamId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="团队名称">
        <el-input :placeholder="profile.teamName" type="textarea" v-model="profile.teamName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="技能">
        <el-input :placeholder="profile.skill" type="textarea" v-model="profile.skill"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input :placeholder="profile.tel" type="textarea" v-model="profile.tel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="renewProfile">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    data() {
      return {
        profile: {}
      }
    },
    created: function () {
      this.getId();
      this.getProfileInfo();
    },
    methods: {
      getId() {
        this.id = this.$route.query.id;
        console.log('profile' + this.id)
      },
      getProfileInfo() {
        this.$http.post('/api/showProfile.php', qs.stringify({
            id: this.id
          }))
          .then(res => {
            this.profile = res.data;
            if (this.profile.realRole = 1) {
              this.profile.realRole = "接包组员"
            } else if (this.profile.realRole = 2) {
              this.profile.realRole = "接包组长"
            } else if (this.profile.realRole = 3) {
              this.profile.realRole = "发包人员"
            } else {
              this.profile.realRole = "管理员"
            }
          });
      },
      renewProfile() {
        console.log(this.profile)
        // this.$http.post('/api/changeProfileForWorker.php', qs.stringify(this.profile));
        this.$alert('修改个人信息成功', '提示', {
          confirmButtonText: '确定',
        });
      }
    }
  }

</script>
<style scoped>
  .profile {
    position: relative;
    padding: 2rem;
  }

</style>
