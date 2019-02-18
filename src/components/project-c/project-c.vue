<template>
  <div class="project">
    <div class="teams">
      <el-table :data="teams" style="width: 100%; margin: 2rem 0 2rem 0;" v-if="this.state == -2 || this.state == 0 || this.state == 1">
        <el-table-column prop="teamName" label="团队" width="180">
        </el-table-column>
        <el-table-column prop="leaderName" label="负责人" width="180">
        </el-table-column>
        <el-table-column prop="score" label="团队评分" width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" v-if="this.state == -2">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="pass(scope.row)">让该团队接包</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <file :projectId="projectId"></file>
  </div>
</template>
<script>
  import qs from 'qs'
  import file from '../file/file'
  export default {
    data() {
      return {
        id: '',
        projectId: '',
        teams: [],
        state: ''
      }
    },
    created: function () {
      this.getId();
      this.getInfo();
    },
    methods: {
      getId() {
        this.id = this.$route.query.id;
        this.projectId = this.$route.query.projectId;
        this.state = this.$route.query.state;
      },
      getInfo() {
        this.$http.post('/api/checkTeam.php', qs.stringify({
            id: this.id,
            projectId: this.projectId
          }))
          .then(res => {
            this.teams = res.data
            console.log(res.data)
          })
      },
      pass(row) {
        console.log(row)
        this.$http.post('/api/selectTeam.php', qs.stringify({
            leaderId: row.leaderId,
            projectId: this.projectId
          }))
          .then(res => {
            this.$message({
              message: '该项目已交给' + row.teamName + '承接',
              type: 'success'
            });
            this.$router.push({
              path: '/customer/project-list-c',
              query: {
                id: this.id
              }
            })
          })
      }
    },
    components: {
      file
    }

  }

</script>
