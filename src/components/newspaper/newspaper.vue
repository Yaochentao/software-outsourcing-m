<template>
    <div class="newspaper">
        <h4 class="title">本周完成任务 (2018-09-01 ~ 2018-09-08)</h4>
        <ul>
            <li class="task-item">任务名文本文本文本<i class="task-time">完成人 2018-10-20</i></li>
             <li class="task-item">任务名文本文本文本<i class="task-time">完成人 2018-10-20</i></li>
              <li class="task-item">任务名文本文本文本<i class="task-time">完成人 2018-10-20</i></li>
               <li class="task-item">任务名文本文本文本<i class="task-time">完成人 2018-10-20</i></li>
                <li class="task-item">任务名文本文本文本<i class="task-time">完成人 2018-10-20</i></li>
                 <li class="task-item">任务名文本文本文本<i class="task-time">完成人 2018-10-20</i></li>
        </ul>
        <h4 class="title">剩余任务 （任务截止时间 2018-10-20）</h4>
        <ul>
            <li class="task-item">任务名文本文本文本</li>
             <li class="task-item">任务名文本文本文本</li>
              <li class="task-item">任务名文本文本文本</li>
               <li class="task-item">任务名文本文本文本<li>
                <li class="task-item">任务名文本文本文本</li>
                 <li class="task-item">任务名文本文本文本</li>
        </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.newspaper {
    padding: 40px;
}
.title {
    margin-bottom: 10px;
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.25;
    color: #54c8cb;
  }
.task-time {
    display: inline-block;
    position: relative;
    top: -2px;
    margin: 0 0 0 5px;
    padding: 4px 7px;
    line-height: 1;
    background-color: #e9f2f2;
    font-size: 12px;
    color: #777777;
    font-style: normal;
    vertical-align: middle;
    white-space: nowrap;
    word-break: keep-all;
    word-wrap: normal;
    border-radius: 10px;
  }
.task-item {
    padding: 10px;
    cursor: default;
    font-size: 16px;
}
</style>

