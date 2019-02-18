<template>
  <div class="project-p">
    <task @closeTask="closeTask" v-if="taskShow" :task='this.openTask' :projectId='projectId'></task>
    <div class="all-project-info">
      <div class="info-item">
        <p style="color: #000">{{this.tasks.length}}</p>
      </div>
      <div class="info-item">
        <p style="color: #409EFF">{{this.doneTaskNum}}</p>
      </div>
      <div class="info-item">
        <p style="color: #f56c6c">{{this.todoTaskNum}}</p>
      </div>
      <div class="info-item">
        <div class="info-circle">
          <el-progress :width="40" type="circle" :percentage="this.doneTaskPer" color="#f56c6c"></el-progress>
        </div>
      </div>
    </div>
    <div class="info-text">
      <p>总任务</p>
      <p>已完成任务</p>
      <p>待做任务</p>
      <p>完成率</p>
    </div>

    <el-tabs value="first">
      <el-tab-pane label="查看任务信息" name="first">
        <h4 class="title">任务</h4>

        <el-select class="task-select" v-model="value" size="small" @change="seletTask">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <!-- <el-button v-on:click="toProjectInfo" class="project-btn" type="info">查看项目详细信息</el-button>
        <el-button v-on:click="toNewspaper" class="project-btn" type="primary">查看周报</el-button> -->
        <el-table :data="taskTableData" style="width: 100%" @row-click="openDetails">
          <el-table-column prop="taskInfo" label="任务" width="180">
          </el-table-column>
          <el-table-column prop="workerName" label="接包员" width="180">
          </el-table-column>
          <el-table-column prop="releaseDate" label="发布时间" width="180">
          </el-table-column>
          <el-table-column prop="deadLine" label="截止时间" width="180">
          </el-table-column>
          <el-table-column prop="state" label="完成情况">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="新增任务" name="second">
        <el-form :inline="true" class="tasks-input" style="margin-top: 2rem;">
          <el-form-item label="任务">
            <el-input placeholder="任务内容" v-model="taskInfo"></el-input>
          </el-form-item>
          <el-form-item label="接包组员">
            <el-select v-model="workerId" placeholder="请选择">
              <el-option v-for="item in workers" :key="item.name" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务截止时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="deadLine" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" style="float: right;margin-right:2rem;" @click="addNewTask">添加任务</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="项目文件" name="third">
        <file :projectId="projectId"></file>
      </el-tab-pane>
    </el-tabs>
    <!-- <task></task> -->


  </div>
</template>
<script>
  import qs from 'qs'
  import task from '../task-p/task-p'
  import file from '../file//file.vue'
  export default {
    data() {
      return {
        projectId: '',
        id: '',
        taskTableData: [],
        tasks: [],
        doneTasks: [],
        todoTasks: [],
        notTask: [],
        deadTasks: [],
        doneTaskNum: 0,
        todoTaskNum: 0,
        doneTaskPer: 0,
        openTask: {},
        taskShow: false,
        taskInfo: '',
        releaseDate: '',
        deadLine: '',
        workerId: '',

        options: [{
          value: 'all',
          label: '全部任务'
        }, {
          value: 'done',
          label: '已完成任务'
        }, {
          value: 'todo',
          label: '待完成任务'
        },{
          value: 'dead',
          label: '延期任务'
        },{
          value: 'not',
          label: '被驳回'
        }],
        value: 'all',



        workers: []


      };
    },
    created: function () {
      this.getId();
      this.getTaskInfo();
      this.$http.post('api/changeTaskState.php')
    },
    methods: {
      getId() {
        this.id = this.$route.query.id;
        this.projectId = this.$route.query.projectId;
      },
      getTaskInfo() {
        this.$http.post('/api/showAllTaskInAProjectForLeader.php', qs.stringify({
            projectId: this.projectId,
            id: this.id
          }))
          .then(res => {
            this.doneTaskNum = 0;
            this.todoTaskNum = 0;
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].state === 0) {
                res.data[i].state = '待办'
                this.todoTaskNum++;
                this.todoTasks.push(res.data[i]);
              } else if(res.data[i].state === 1){
                res.data[i].state = '完成'
                this.doneTaskNum++;
                this.doneTasks.push(res.data[i]);
              } else if(res.data[i].state === -2){
                res.data[i].state = '延期'
                this.doneTaskNum++;
                this.deadTasks.push(res.data[i]);
              }
               else {
                res.data[i].state = '被驳回'
                this.notTask.push(res.data[i])
              }
            }
            this.tasks = res.data;
            this.taskTableData = this.tasks;
            this.doneTaskPer = parseInt(this.doneTaskNum / this.tasks.length * 100);
          });
        // this.$http.post('/api/showTaskRate.php', qs.stringify({
        //     projectId: this.projectId,
        //     id: this.id
        //   }))
        //   .then(res => {
        //     console.log(res.data)
        //     this.notTask = res.data;
        //       for(let i = 0; i< this.notTask.length; i++) {
        //         this.notTask[i].state = '审核未通过'
        //       }
        //   })

        this.$http.post('/api/showWorker.php', qs.stringify({
            id: this.id
          }))
          .then(res => {
            this.workers = res.data;
            console.log(this.workers)
          });
      },
      openDetails(row) {
        console.log(row)
        this.openTask = row;
        console.log(this.openTask)
        this.taskShow = true;
      },
      closeTask(taskShow) {
        this.taskShow = taskShow;
      },
      seletTask() {
        if (this.value == "done") {
          console.log('done')
          this.taskTableData = this.doneTasks;
        } else if (this.value == "todo") {
          console.log('todo');
          this.taskTableData = this.todoTasks;
        } else if (this.value == "todo") {
          console.log('dead');
          this.taskTableData = this.todoTasks;
        } else if (this.value == "dead") {
          console.log('not');
          this.taskTableData = this.deadTasks;
        } else {
          this.taskTableData = this.tasks;
        }
      },

      toProjectInfo: function () {
        this.$router.push({
          path: '/publisher/project-info'
        })
      },
      toNewspaper: function () {
        this.$router.push({
          path: '/publisher/newspaper'
        })
      },
      addNewTask() {
        var nowDate = new Date();
        var month = nowDate.getMonth() + 1;
        this.releaseDate = nowDate.getFullYear() + '-' + month + '-' + nowDate.getDate()
        console.log(this.releaseDate)
        console.log(this.deadLine)
        console.log(typeof (this.projectId))
        console.log(typeof (this.id))
        console.log(this.taskInfo)
        console.log(typeof (this.workerId))

        this.$http.post('/api/allocTask.php', qs.stringify({
            id: this.id,
            releaseDate: this.releaseDate,
            deadLine: this.deadLine,
            taskInfo: this.taskInfo,
            workerId: this.workerId,
            projectId: this.projectId
          }))
          .then(res => {
            this.getTaskInfo();
            this.taskInfo = '';
            this.$alert('添加任务成功', '提示', {
              confirmButtonText: '确定',
            });
          });
      }
    },
    components: {
      task,
      file
    }
  }

</script>
<style scoped>
  .project-p {
    padding: 0 20px 20px 20px;
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

  .title {
    margin-bottom: 10px;
    display: inline-block;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.25;
    color: #44acb6;
  }

  .task-select {
    display: inline-block;
    margin-left: 1rem;
  }

</style>
