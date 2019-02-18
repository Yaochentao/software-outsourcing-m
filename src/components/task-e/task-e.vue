<template>
  <div class="task">
    <span @click="closeTask" class="close-btn"></span>
    <h3>任务状态 ：</h3>
    <p class="e-name">{{task.state}}</p>
    <br/>>
    <h3>发布时间 ：</h3>
    <p class="e-name">{{task.releaseDate}}</p>
    <br/>>
    <h3>截止时间 ：</h3>
    <p class="e-name">{{task.deadLine}}</p>
    <h3 style="display: block;">任务内容 ：</h3>
    <p style="text-indent: 2em; margin-bottom: 2rem;">{{task.taskInfo}}</p>
    <task-file :taskId="task.taskId" :projectId="projectId"></task-file>
    
  </div>
</template>
<script>
  import vue from 'vue';
  import qs from 'qs'
  import bFormFile from 'bootstrap-vue/es/components/form-file/form-file'
  import taskFile from '../task-file/task-file'
  export default {
    props: [
      'task',
      'projectId'
    ],
    data() {
      return {
        taskShow: false
      }
    },
    methods: {
      closeTask() {
        this.$emit('closeTask', this.taskShow);
      },
      doneTask() {
        this.$http.post('/api/changeTaskRate.php', qs.stringify({
            taskId: this.task.taskId,
            taskRate: 100
          }))
          .then(res => {
            this.task.state = '完成';
            this.$alert('该任务审核通过', '提示', {
              confirmButtonText: '确定',
            });
            this.closeTask();
          })
      }
    },
    components: {
      bFormFile,
      taskFile
    }
  }

</script>
<style scoped>
  .task {
    position: relative;
    padding: 1rem;
    width: 20rem;
    height: 30rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -10rem;
    margin-left: -10rem;
    background: #fff;
    border-radius: 0.5rem;
    z-index: 100;
    box-shadow: 0px 0px 8px #999;

  }

  .close-btn {
    position: absolute;
    top: 0rem;
    right: 0rem;
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background: #fff url(close1.png);
    background-size: 1.6rem 1.6rem;
    cursor: pointer;
  }

  h3 {
    color: #409EFF;
    margin-bottom: 0.5rem;
    display: inline-block;
  }

  p {
    font-size: 0.8rem;
  }

  .e-name {
    display: inline-block;
    margin-left: 0.5rem;
    margin-bottom: 1rem;
  }

  .task-file-con {
    margin-bottom: 1rem;
  }

  .task-btn {
    position: relative;
    left: 6rem;
  }

</style>
