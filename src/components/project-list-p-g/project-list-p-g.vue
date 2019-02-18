<template>
  <div class="project-list">
        <div class="project-con" v-for="item in notReceivedProject" v-bind:key="item.projectId">
          <b-card class="project-item" border-variant="danger" title="项目名称" v-bind:sub-title="'发布时间'+item.releaseDate+'  截止时间'+item.deadLine">
            <p class="card-text">
              {{item.projectInfo}}
            </p>
            <span class="project-state">发包人: {{item.name}}</span>
            <div class="go-project-info-btn">
              <el-button v-on:click="toProject(item)" type="primary">查看详情</el-button>
            <el-button type="danger" @click="getThis(item.projectId)">参与竞标</el-button>
            </div>
          </b-card>
        </div>


  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    data() {
      return {
        id: '',
        notReceivedProject: []
      }
    },
    created: function () {
      this.getId();
      this.getInfo();
    },
    methods: {
      getId() {
        this.id = this.$route.query.id;
        console.log('get'+this.id)
      },
      getInfo() {
        this.$http.post('/api/showNotReceivedProject.php')
          .then(res => {
            this.notReceivedProject = res.data;
            console.log(this.notReceivedProject)
          });
      },
      toProject(item) {
        console.log('项目id')
        this.$router.push({
          path: '/publisher/project-c',
          query: {
            projectId: item.projectId,
            id: this.id
          }
        })
      },
      getThis(projectId) {
        this.$http.post('/api/receiveProject.php', qs.stringify({
            id: this.id,
            projectId: projectId
          }))
        .then(res => {
          this.getInfo();
          this.$alert('参与竞标成功', '提示', {
          confirmButtonText: '确定',
        });
        })
      }
    }
  }

</script>
<style scoped>
   .project-list {
    padding: 40px 40px 40px 40px;
    position: relative;
    overflow: hidden;
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
