<template>
  <div class="team">
    <radar v-if="this.radarShow" :engineerInfo="this.aEngineerInfor" @closeRader="closeRader"></radar>
    <div class="team-header">
      <h4 class="name">团队名称</h4><span class="team-num">(共 {{this.workers.length}} 人)</span>
    </div>
    <el-tabs value="first">
      <el-tab-pane label="组员" name="first">
        <el-table :data="workers" style="width: 100%" @row-click="showRader">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="tel" label="联系方式"></el-table-column>
          <el-table-column prop="skill" label="擅长方向"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待审核" name="second">
        <el-table :data="notReceivedWorker" style="width: 100%">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="tel" label="联系方式"></el-table-column>
          <el-table-column prop="skill" label="擅长方向"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="pass(scope.row)">通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  import radar from '../radar/radar'
  import qs from 'qs'
  export default {
    data() {
      return {
        id: '',
        workerId: '',
        workers: [],
        notReceivedWorker: [],
        aEngineerInfor:'',
        radarShow: false
      };

    },
    created: function () {
      this.getId();
      this.getInfo();
    },
    methods: {
      closeRader(raderShow) {
        this.radarShow = raderShow;
      },
      showRader(row) {
        console.log(row);
        this.radarShow = true;
        this.aEngineerInfor = row;
      },
      getId() {
        this.id = this.$route.query.id;
        console.log('a' + this.id)
      },
      getInfo() {
        console.log("get")
        this.$http.post('/api/showWorker.php', qs.stringify({
            id: this.id
          }))
          .then(res => {
            this.workers = res.data;
            console.log(this.workers)
          });
        this.$http.post('/api/showNotReceivedWorker.php', qs.stringify({
            id: this.id
          }))
          .then(res => {
            if (res.data == null) {
              this.notReceivedWorker = null;
            } else {
              this.notReceivedWorker = res.data;
              console.log(this.notReceivedWorker)
            }

          });
      },
      pass(row) {
        this.workerId = row.id;
        this.$http.post('/api/reviewWorkerPass.php', qs.stringify({
          leaderId: this.id,
          workerId: this.workerId
        }))
        .then(res => {
          this.getInfo();
          this.$alert('审核通过', '提示', {
          confirmButtonText: '确定',
        });
        });
        
      }
    },
    components: {
      radar
    }
  }

</script>
<style scoped>
  .team {
    position: relative;
    padding: 40px;
  }

  .team-header {
    padding-bottom: 30px;
    border-bottom: 1px solid #E3E3E3;
  }

  .team-header .name {
    display: inline-block;
    font-size: 20px;
    vertical-align: baseline;
    line-height: 35px;
    font-weight: bold;
  }

  .team-header .team-num {
    padding-left: 10px;
    display: inline-block;
    font-weight: normal;
    font-size: 16px;
    color: #777777;
    vertical-align: middle;
    line-height: 1;
  }

  .team-member li {
    position: relative;
    line-height: 52px;
  }

  .team-member .member-name {
    font-size: 18px;
    font-weight: 500;
  }

  .team-member .member-name:hover {
    color: #54c8cb;
    cursor: default;
  }

  .team-member .member-tel {
    float: right;
    font-size: 14px;
    color: #555555;
  }

</style>
