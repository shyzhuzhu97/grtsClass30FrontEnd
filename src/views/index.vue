<template id="index">
  <div id="body2">
    <el-container>
      <el-header>
        <div class="header">
          <h3>当麦基订餐后台管理系统</h3>
          <div class="userInfo">
            <span v-text="'欢迎您, ' + this.nickName"></span>
            <el-dropdown @command="handleCommand"
              ><img :src="avatar" alt="" />

              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item icon="el-icon-s-home" command="home"
                  >个人中心</el-dropdown-item
                >
                <el-dropdown-item icon="el-icon-s-unfold" command="logout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                :router="true"
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#2F4050"
                text-color="#A7B1C2"
                active-text-color="#fff"
                :default-active="$route.path"
              >
                <el-menu-item index="/index">
                  <i class="el-icon-menu"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-dish-1"></i>
                    <span>菜品分类管理</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title"></template>
                    <el-menu-item index="/addDishCategory"
                      >添加菜品分类</el-menu-item
                    >
                    <el-menu-item index="/showDishCategory"
                      >管理菜品分类</el-menu-item
                    >
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-fork-spoon"></i>
                    <span>菜品管理</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title"></template>
                    <el-menu-item index="/addDish">添加菜品</el-menu-item>
                    <el-menu-item index="/showDish">管理菜品</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      avatar: "",
      nickName: "",
    };
  },
  created() {
    this.avatar = sessionStorage.getItem("avatar");
    this.nickName = sessionStorage.getItem("nickName");
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleCommand(command) {
      if (command == "home") {
        this.$router.push("/home");
      } else if (command == "logout") {
        this.$router.push("/");
        sessionStorage.clear();
      }
    },
  },
};
</script>


<style>
* {
  margin: 0px;
  padding: 0px;
}
#body2 {
  height: 100%;
  width: 100%;
}
.el-menu {
  border-right: 0px;
}
.el-header,
.el-footer {
  background-color: #2f4050;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
  padding: 0px;
}
.el-aside {
  background-color: #2f4050;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
  height: 100%;
}
.el-main {
  background-color: #f3f3f4;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container {
  height: 100%;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.header {
  height: 60px;
  background: #263340;
  color: #fff;
  text-align: center;
  overflow: hidden;
}
.header h3 {
  float: left;
  width: 60%;
  height: 100%;
  padding-left: 20%;
}
.userInfo {
  float: right;
  width: 20%;
  height: 100%;
}
.userInfo img {
  float: right;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.userInfo .el-dropdown {
  float: right;
  width: 50px;
  height: 50px;
  margin-top: 5px;
  margin-right: 40px;
  border-radius: 50%;
}
.userInfo span {
  float: left;
  margin-left: 60px;
  width: 120px;
  height: 60px;
  text-overflow: ellipsis;
}
</style>