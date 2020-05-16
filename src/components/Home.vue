<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>手机点餐后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleButton">|||</div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#379bff"
          :unique-opened="true"
          :collapse="iscollapse"
          :collapse-transition="false"
          :router="true"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-group"></i>
              <span>人员管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/users">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>服务员列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="password">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>密码管理</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-putitaway"></i>
              <span>菜品管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="foodlist">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>菜品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2-2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>管理菜品</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右部主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      iscollapse: false,
     
    };
  },

  methods: {
    toggleButton() {
      // 点击按钮切换菜单折叠与展开
      this.iscollapse = !this.iscollapse;
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 25px;
  font-weight: 700;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
    }
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>