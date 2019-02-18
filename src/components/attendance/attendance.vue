<template>
  <div class="attendance">
    <el-table :data="attendanceTableData" style="width: 100%; margin-top: 2rem;">
      <el-table-column prop="id" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="tel" label="电话号码">
      </el-table-column>
      <el-table-column prop="startTime" label="签到时间">
      </el-table-column>
      <el-table-column prop="overTime" label="签退时间">
      </el-table-column>
    </el-table>
    <div class="date-con">
      <el-date-picker v-model="date1" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" @change='pick'>
    </el-date-picker>
    </div>
  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    data() {
      return {
        id: '',
        date1: '',
        attendanceTableData: [],
        allAttendance: [],
        oneAttendance: [],
      };
    },
    created: function () {
      this.getId();
      this.getInfo();
    },
    methods: {
      getId() {
        this.id = this.$route.query.id;
        console.log('a'+this.id)
      },
      getInfo() {
        this.$http.post('/api/showAllTime.php', qs.stringify({
            id: this.id
          }))
          .then(res => {
            this.allAttendance = res.data;
            this.attendanceTableData = this.allAttendance;
            console.log(this.allAttendance)
          });
      },
      pick() {
        if(this.date1 == null) {
          this.getInfo();
        }else {
          this.$http.post('/api/showOneTime.php', qs.stringify({
            id: this.id,
            date: this.date1
          }))
          .then(res => {
            this.oneAttendance = res.data;
            this.attendanceTableData = this.oneAttendance;
            console.log(this.oneAttendance)
          });
        }
      }
    }
  }

</script>

<style scoped>
  .attendance {
    padding: 1rem;
  }
  .date-con {
    margin-top: 1rem;
    float: right;
  }
</style>
