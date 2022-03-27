<template id="login" >
  <div id="body">
    <div class="log-in">
      <div id="header-font">
        <P id="font1">GRTS订餐管理系统</P>
        <P id="font2">DING CAN GUAN LI XI TONG</P>
      </div>
      <div id="content">
        <div class="lt tu">
          <img src="../assets/a.png" alt="图片" />
        </div>
        <div class="rt login">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
            v-model="user.userName"
            clearable
          >
          </el-input>
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="user.passWord"
            clearable
            show-password
          >
          </el-input>
          <el-button id="forget" type="primary" plain>忘记密码</el-button>
          <el-button id="register" type="primary" plain>注册</el-button>
          <el-button id="login" @click="login" type="primary" plain
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        userName: "",
        passWord: "",
      },
    };
  },
  created() {},
  methods: {
    login() {
      if (this.user.userName == "") {
        this.$message({
          message: "用户名不能为空!",
          type: "warning",
        });
        return;
      } else if (this.user.passWord == "") {
        this.$message({
          message: "密码不能为空!",
          type: "warning",
        });
        return;
      }
      this.$http
        .post("http://localhost:8081/user/login", this.user)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "登陆成功",
              type: "success",
            });
            console.log(res.data.data);
            //2.吧用户的昵称和头像存起来
            sessionStorage.setItem("nickName", res.data.data.user.nickName);
            sessionStorage.setItem("avatar", res.data.data.user.avatar);
            //3.跳转页面（首页）
            this.$router.push("/index");
          } else {
            this.$message.error(res.data.message);
            this.user = {};
          }
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
  },
};
</script>
<style>
#body {
  background-image: url(../assets/login_bg.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.lt {
  float: left;
}
.rt {
  float: right;
}
a {
  text-decoration: none;
}
.log-in {
  width: 900px;
  height: 565px;
  margin: 0 auto;
  margin-top: 100px;
}
#header-font {
  width: 900px;
  height: 100px;
  margin: 0 auto;
  color: #fff;
}
#font1 {
  font-size: 30px;
  text-align: center;
}
#font2 {
  text-align: center;
  font-size: 12px;
  padding-top: 10px;
}
#content {
  width: 900px;
  height: 465px;
  border: #bbbdbf solid 1px;
  border-radius: 6px;
  background: #fff;
  box-shadow: #868686 0px 0px 20px;
}
#content > .tu {
  width: 450px;
  height: 465px;
}
#content > .tu > img {
  width: 450px;
  margin: 70px auto;
}
.login {
  width: 450px;
  height: 255px;
  margin-top: 60px;
}
.el-input {
  width: 400px;
  margin: 20px 20px;
}
#forget {
  width: 150px;
  margin: 20px 20px;
}
#register {
  float: right;
  width: 150px;
  margin: 20px 20px;
  margin-right: 30px;
}
#login {
  width: 400px;
  margin: 20px 20px;
  
}
</style>