<template>
  <div class="main">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand>智能众包</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/manager/power">权限管理</b-nav-item>
          <b-nav-item to="/manager/audit">新注册人员审核</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content"><em>User</em></template>
            <b-dropdown-item to="/engineer/profile">Profile</b-dropdown-item>
            <b-dropdown-item to="/login">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="content-container">
      <div class="center-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import bNavbar from 'bootstrap-vue/es/components/navbar/navbar'
  import qs from 'qs'

  export default {
    data() {
      return {
        id: ''
      }
    },
    created: function () {
      this.getId();
    },
    methods: {
      getId() {
        this.id = this.$route.query.id;
        console.log('managger' + this.id)
      },
    },
    components: {
      bNavbar
    }
  }

</script>
<style scoped>
  .content-container {
    width: 100%;
    overflow: hidden;
  }

  @media (min-width: 961px) {
    .center-container {
      background: #fff;
      width: 962px;
      margin: 30px auto;
      min-height: 500px;
      border-radius: 4px;
      border-color: #E3E3E3;
      box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.12);
      overflow: hidden;
    }
  }

  @media (max-width: 960px) {
    .center-container {
      background: #fff;
      width: 100%;
      margin: 0px auto;
      border-radius: 4px;
      border-color: #E3E3E3;
      box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.12);
      overflow: hidden;
    }
  }

</style>
