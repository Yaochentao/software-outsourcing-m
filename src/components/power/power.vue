<template>
  <div class="power">
    <el-tabs value="first">
      <el-tab-pane label="发包人" name="first">
        <el-table :data="customer" style="width: 100%; margin-bottom: 2rem;">
          <el-table-column prop="id" label="账号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="tel" label="电话号码">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">修改权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="接包团队leader" name="second">
        <el-table :data="leader" style="width: 100%; margin-bottom: 2rem;">
          <el-table-column prop="id" label="账号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="tel" label="电话号码">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">修改权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="接包团队组员" name="third">
        <el-table :data="worker" style="width: 100%; margin-bottom: 2rem;">
          <el-table-column prop="id" label="账号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="tel" label="电话号码">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">修改权限</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import qs from 'qs'
  export default {
    data() {
      return {
        customer: [],
        worker: [],
        leader: [],
      }
    },
    created: function() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        this.customer = [];
        this.worker = [];
        this.leader = [];
        this.$http.post('/api/peopleManagement.php')
        .then(res => {
          for(let i = 0; i < res.data.length; i++) {
            switch(res.data[i].realRole) {
              case(1): 
                this.worker.push(res.data[i]);
                break;
              case(2): 
                this.leader.push(res.data[i]);
                break;
              case(3): 
                this.customer.push(res.data[i]);
                break;
            }
          }
        })
        console.log(this.worker)
        console.log(this.leader)
        console.log(this.customer)
      }
    }
  }

</script>

<style scoped>
  .power {
    padding: 1rem;
  }

</style>
