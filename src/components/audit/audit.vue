<template>
  <div class="audit">
    <el-tabs value="first">
      <el-tab-pane label="待审核" name="first">
        <el-table :data="newPeople" style="width: 100%; margin-bottom: 2rem;">
          <el-table-column prop="id" label="账号">
          </el-table-column>
          <el-table-column prop="name" label="姓名">
          </el-table-column>
          <el-table-column prop="tel" label="电话号码">
          </el-table-column>
          <el-table-column prop="expRoleT" label="申请类型">
          </el-table-column>
          <el-table-column prop="skill" label="技术栈">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="pass(scope.row)">通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- <el-tab-pane label="审核历史" name="second">
        <el-table :data="newPeople" style="width: 100%; margin-bottom: 2rem;">
          <el-table-column prop="username" label="账号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="tel" label="电话号码">
          </el-table-column>
          <el-table-column prop="submitTime" label="审核时间">
          </el-table-column>
        </el-table>
      </el-tab-pane> -->
    </el-tabs>

  </div>
</template>
<script>
  import qs from 'qs'
  export default {
    data() {
      return {
        newPeople: [],
      }
    },
    created: function () {
      this.getInfo();
    },
    methods: {
      getInfo() {
        this.$http.post('/api/audit.php')
        .then(res => {
          this.newPeople = res.data;
          for (let i = 0; i < this.newPeople.length; i++) {
            switch (this.newPeople[i].expRole) {
              case (1):
                this.newPeople[i].expRoleT = '接包组员';
                break;
              case (2):
                this.newPeople[i].expRoleT = '接包组长';
                break;
              case (3):
                this.newPeople[i].expRoleT = '发包人员';
                break;
            }
          }
          console.log(this.newPeople)


        });
      },
      pass(row) {
        this.$http.post('/api/agree.php', qs.stringify({
            id: row.id,
            expRole: row.expRole
          }))
          .then(res => {
            this.getInfo();
            this.$alert('审核通过', '提示', {
              confirmButtonText: '确定',
            });
          });

      }
    }
  }

</script>

<style scoped>
  .audit {
    padding: 1rem;
  }

</style>
