<template>
  <div class="project-n">
    <h3>项目信息</h3>
    <el-form class="project-form" ref="form" :model="form" label-width="80px">
      <el-form-item label="项目名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="项目时间">
        <div>
          <el-date-picker popper-class="form-time-picker" v-model="form.value1" type="daterange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="项目简介">
        <el-input type="textarea" autosize v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-con">
      <el-button type="primary" @click="publishProject">立即创建</el-button>
      <el-button>取消</el-button>
    </div>



  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    data() {
      return {
        id: '',
        form: {
          name: '',
          value1: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          requirements: ''
        }
      }
    },
    created: function () {
      this.getId();
    },
    methods: {
      getId() {
        this.id = this.$route.query.id;
      },
      publishProject() {
        this.$http.post('/api/submit.php', qs.stringify({
            projectName: this.form.name,
            projectInfo: this.form.desc,
            releaseDate: this.form.value1[0],
            deadLine: this.form.value1[1],
            id: this.id
          }))
          .then(
            this.$alert('发布项目成功', '提示', {
                confirmButtonText: '确定',
              }
            )
          )
      }
    }

  }

</script>

<style scoped>
  .project-n {
    position: relative;
    padding: 2rem;
    overflow: hidden;
  }

  .project-form {
    position: relative;
    top: 2rem;
    padding-bottom: 2rem;
  }

  .btn-con {
    float: right;
    margin: 2rem 2rem 0 0;
  }

</style>
