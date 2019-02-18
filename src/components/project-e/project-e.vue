<template>
  <div class="project">
    <task @closeTask="closeTask" v-if="taskShow" :task='this.openTask' :projectId="projectId"></task>
    <span class="project-name">{{projectInfo.projectName}}</span>
    <el-progress style="position: absolute;top: 2rem;right: 3rem;" :width="80" type="circle" :percentage="this.doneTaskPer" color="#f56c6c"></el-progress>
    <span class="project-desc">{{projectInfo.projectInfo}}</span>

    <div class="btn-con">
      <el-button type="primary" :disabled=this.startWorkBtn @click="startWork">签到并开始工作</el-button>
      <el-button type="warning" :disabled=this.overWorkBtn @click="overWork">签退并结束工作</el-button>
    </div>
    <h4 class="title">任务</h4>
    <el-select class="task-select" v-model="value" size="small" @change="seletTask">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>

    <el-table :data="taskTableData" style="width: 100%" @row-click="openDetails">
      <el-table-column prop="taskInfo" label="任务" width="180">
      </el-table-column>
      <el-table-column prop="releaseDate" label="发布时间" width="180">
      </el-table-column>
      <el-table-column prop="deadLine" label="截止时间" width="180">
      </el-table-column>
      <el-table-column prop="state" label="完成情况">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import projectInfo from '../project-info/project-info'
  import qs from 'qs'
  import task from '../task-e/task-e'
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
        doneTaskNum: 0,
        doneTaskPer: 0,
        deadTasks: [],
        openTask: {},
        taskShow: false,
        startWorkBtn: false,
        overWorkBtn: true,
        projectInfo,

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
          label: '审核未通过'
        }],
        value: 'all',
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
        this.$http.post('/api/showAllTaskInAProjectForWorker.php', qs.stringify({
            id: this.id,
            projectId: this.projectId
          }))
          .then(res => {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].state === 0) {
                res.data[i].state = '待办'
                this.todoTasks.push(res.data[i]);
              } else if(res.data[i].state === 1){
                res.data[i].state = '完成'
                this.doneTaskNum++;
                this.doneTasks.push(res.data[i]);
              }else if(res.data[i].state === -2){
                res.data[i].state = '延期'
                this.todoTaskNum++;
                this.deadTasks.push(res.data[i]);
              }else {
                res.data[i].state = '被驳回'
                this.notTask.push(res.data[i])
              }

            }
            this.tasks = res.data;
            this.taskTableData = this.tasks;
            this.doneTaskPer = Math.floor(this.doneTaskNum/this.tasks.length*100);
          });
          this.$http.post('/api/showRefusedTaskForWorker.php', qs.stringify({
            id: this.id,
            projectId: this.projectId
          }))
          .then(res =>{
            this.notTask = res.data;
            for(let i = 0; i < this.notTask.length; i++) {
              this.notTask[i].state = '审核未通过'
            }
          })
          this.$http.post('/api/showProjectNameAndInfoById.php',qs.stringify({
            projectId: this.projectId
          })).then(res => {
            this.projectInfo = res.data
          })
      },
      openDetails(row) {
        console.log(row)
        this.openTask= row;
        console.log(this.openTask)
        this.taskShow = true;
      },
      closeTask(taskShow) {
        this.taskShow = taskShow;
      },
      seletTask() {
        if(this.value == "done") {
          console.log('done')
          this.taskTableData = this.doneTasks;
        }
        else if(this.value == "todo") {
          console.log('todo');
          this.taskTableData = this.todoTasks;
        }else if(this.value == "not"){
          this.taskTableData = this.notTask;
        }else if (this.value == "dead") {
          console.log('not');
          this.taskTableData = this.deadTasks;
        } else {
          this.taskTableData = this.tasks
        }
      },
      startWork() {
        this.$http.post('/api/clickToStartWork.php', qs.stringify({
            id: this.id
          }))
        this.$alert('签到成功', '提示', {
          confirmButtonText: '确定',
        });
        this.startWorkBtn = !this.startWorkBtn;
        this.overWorkBtn = !this.overWorkBtn;
      },
      overWork() {
        this.$http.post('/api/clickToOverWork.php', qs.stringify({
            id: this.id
          }))
        this.$alert('签退成功', '提示', {
          confirmButtonText: '确定',
        });
        this.startWorkBtn = !this.startWorkBtn;
        this.overWorkBtn = !this.overWorkBtn;
      }
    },
    components: {
      projectInfo,
      task
    }
  }

</script>
<style scoped>
  @media(max-width: 400px) {
    .btn-con {
      display: none;
    }
  }

  .project {
    position: relative;
    padding: 2rem;
  }

  .project-name {
    display: block;
    max-width: 620px;
    font-size: 1.6rem;
    line-height: 3rem;
    text-align: left;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: default;
  }

  .btn-con {
    margin-bottom: 1.5rem;
  }

  .project-desc {
    margin-bottom: 2rem;
    display: block;
    width: 620px;
    font-size: 0.8rem;
    color: #777777;
    word-wrap: break-word;
    cursor: default;
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
