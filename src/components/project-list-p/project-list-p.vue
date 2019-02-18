<template>
  <div class="project-list">
    <div class="all-project-info">
      <div class="info-item">
        <p style="color: #000">{{projectsRate.allTaskNum}}</p>
      </div>
      <div class="info-item">
        <p style="color: #409EFF">{{projectsRate.finishedTaskNum}}</p>
      </div>
      <div class="info-item">
        <p style="color: #909399">{{projectsRate.waitTaskNum}}</p>
      </div>
      <div class="info-item">
        <div class="info-circle">
          <el-progress :width="40" type="circle" :percentage="projectsRate.finishRate" color="#f56c6c"></el-progress>
        </div>

      </div>
    </div>
    <div class="info-text">
      <p>总任务</p>
      <p>已完成任务</p>
      <p>待做任务</p>
      <p>完成率</p>
    </div>
    <div class="project-con" v-for="item in projects" v-bind:project="item" 
    v-bind:key="item.projectId">
      <b-card class="project-item" border-variant="danger" v-bind:title="item.projectName" v-bind:sub-title="'截止时间'+item.deadLine">
        <p class="card-text">
          {{item.projectInfo}}
        </p>
        <el-progress :width="80" type="circle" v-bind:percentage="item.projectRate" color="#f56c6c"></el-progress>
        <el-button v-on:click="toProject(item)" class="go-project-info-btn" type="danger">查看详情</el-button>
      </b-card>
    </div>
  </div>
</template>
<script>
  import Bcrad from 'bootstrap-vue/es/components/card/card'
  import qs from 'qs'
  export default {
    data() {
      return {
        projects: '',
        id: '',
        projectsRate: '',
      }
    },
    created: function () {
      this.getId();
      this.getInfo();
    },
    components: {
      Bcrad
    },
    methods: {
      toProject(item) {
        console.log('项目id'+item.projectId)
        this.$router.push({
          path: '/publisher/project-p',
          query: {
            projectId: item.projectId,
            id: this.id
          }
        })
      },
      getId() {
        this.id = this.$route.query.id;
        console.log('l'+this.id)
      },
      getInfo() {
        this.$http.post('/api/showWaitProjectForLeader.php', qs.stringify({
            id: this.id
          }))
          .then(res => {
            this.projects = res.data;
          });
        this.$http.post('/api/showKindsTaskNumForLeader.php', qs.stringify({
            id: this.id
          }))
          .then(res => {
            this.projectsRate = res.data;
          });
        // this.$http.post('/api/showTaskState.php', qs.stringify({
        //     id: this.id
        //   }))
        //   .then(res => {
        //     this.allTaskInfo = res.data;
        //     console.log(this.allTaskInfo);
        //   });
      }
    }
  }

</script>
<style scoped>
  .project-list {
    padding: 0 40px 40px 40px;
    position: relative;
    overflow: hidden;
  }

  .info-text {
    display: flex;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid #666;
  }

  .info-text p {
    flex: 1;
    font-size: 0.8rem;
    text-align: center;
  }

  .all-project-info {
    margin-top: 2rem;
    display: flex;
  }

  .all-project-info p {
    font-size: 2rem;
    line-height: 2.5rem
  }

  .info-circle {
    position: relative;
    left: 50%;
    margin-left: -20px;

  }

  .info-item {
    flex: 1;
  }

  .info-item p {
    text-align: center;
  }

  .project-item {
    position: relative;
    padding-left: 30px;
    height: 12rem;
    margin-bottom: 1rem;
  }

  .project-con {
    height: 12rem;
    width: 420px;
    float: left;
    margin-bottom: 1rem;
    margin-right: 0.5rem;
  }

  .project-item .card-text {
    font-size: 0.9rem;
    margin-bottom: 10px;
    overflow: hidden;
    line-height: 1rem;
    height: 2rem;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .card-subtitle {
    font-size: 0.8rem;
  }

  .project-state {
    margin-left: 10px;
  }

  .project-item .go-project-info-btn {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
  }


  @media(max-width: 960px) {
    .project-con {
      width: 100%;
      float: left;
      margin: 0.5rem 0 0.5rem 0;
    }

    .project-list {
      padding: 0;
    }
  }

</style>
