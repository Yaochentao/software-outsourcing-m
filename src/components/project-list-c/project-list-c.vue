<template>
  <div class="project-list">
    <div class="all-project-info">
      <div class="info-item">
        <p style="color: #000">{{this.received.length+this.notReceived.length}}</p>
      </div>
      <div class="info-item">
        <p style="color: #409EFF">{{this.received.length}}</p>
      </div>
      <div class="info-item">
        <p style="color: #f56c6c">{{this.notReceived.length}}</p>
      </div>
    </div>
    <div class="info-text">
      <p>我发布的项目</p>
      <p>已被接包</p>
      <p>等待被接包</p>
    </div>
    <el-tabs value="first">
      <el-tab-pane label="已被承接" name="first">
        <div class="project-con" v-for="item in this.received" v-bind:key="item.projectInfo">
          <b-card class="project-item" border-variant="primary" :title="item.projectName" :sub-title="'截止时间'+item.deadLine">
            <p class="card-text">
              {{item.projectInfo}}
            </p>
            <span class="project-state">承接团队 ：{{item.receive[0].teamName}}</span>
            <el-button v-on:click="toProject(item)" class="go-project-info-btn" type="primary">查看详情</el-button>
          </b-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="正在竞标" name="second">
        <div class="project-con" v-for="item in this.halfReceived" v-bind:key="item.projectInfo">
          <b-card class="project-item" border-variant="primary" :title="item.projectName" :sub-title="'截止时间'+item.deadLine">
            <p class="card-text">
              {{item.projectInfo}}
            </p>
            <span class="project-state">项目状态 ：竞标中</span>
            <el-button v-on:click="toProject(item)" class="go-project-info-btn" type="primary">查看详情</el-button>
          </b-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="等待承接" name="third">
        <div class="project-con" v-for="item in this.notReceived" v-bind:key="item.projectInfo">
          <b-card class="project-item" border-variant="primary" :title="item.projectName" :sub-title="'截止时间'+item.deadLine">
            <p class="card-text">
              {{item.projectInfo}}
            </p>
            <span class="project-state">项目状态 ：等待承接</span>
            <el-button v-on:click="toProject(item)" class="go-project-info-btn" type="primary">查看详情</el-button>
          </b-card>
        </div>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>
<script>
import qs from 'qs'
  export default {
    data () {
      return {
        id: '',
        received: [],
        halfReceived: [],
        notReceived: [],
        done: []
      }
    },
    created: function () {
      this.getId();
      this.getInfo();
      // // this.$http.post('/api/peopleManagement.php',qs.stringify({id: this.id}))
      // //   .then(res => {
      // //     this.projects = res.data;
      // //   });
    },
    methods: {
      toProject(item) {
        console.log('项目id')
        this.$router.push({
          path: '/customer/project-c',
          query: {
            projectId: item.projectId,
            id: this.id,
            state: item.state
          }
        })
      },
      getId() {
        this.id = this.$route.query.id;
      },
      getInfo() {
        
        this.$http.post('/api/showProjectForSender.php',qs.stringify({id: this.id}))
        .then(res => {
          console.log(res.data)
          this.received = [];
          this.halfReceived = [];
          this.notReceived = [];
          this.done = [];
          for(let i = 0; i<res.data.length; i++) {
            if(res.data[i].state == -2) {
              this.halfReceived.push(res.data[i])
            } else if(res.data[i].state == -0) {
              this.received.push(res.data[i])
            } else if(res.data[i].state == -1) {
              this.notReceived.push(res.data[i])
            } else if(res.data[i].state == 1) {
              this.done.push(res.data[i])
            } 
          }
        })
        
      }
    },
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
