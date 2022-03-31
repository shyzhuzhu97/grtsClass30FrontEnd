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
        <div class="rt login1">
          <el-input
            class="userInput"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user-solid"
            v-model="user.userName"
            clearable
          >
          </el-input>
          <el-input
            class="userInput"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="user.passWord"
            clearable
            show-password
          >
          </el-input>
        </div>
        <!-- <div class="rt login2">
          <div id="verifyCode">
            <el-input
            
            placeholder="请输入验证码"
            v-model="user.verifyCode"
          ></el-input>
          </div>
          <img id="codeImg" src="" alt="验证码">
        </div> -->
        <div class="rt login3">
          <el-button id="forget" type="primary" plain>忘记密码</el-button>
          <router-link to="/register">
            <el-button id="register" type="primary" plain>注册</el-button>
          </router-link>
          <el-button id="login" @click="login()" type="primary" plain>登录</el-button>
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
        // verifyCode: "",
      },
    };
  },
  created() {
    // this.getVerifyCode();
  },
  methods: {
    getVerifyCode() {
      this.$http
        .post("http://localhost:8081/user/verifyCode")
        .then((res) => {})
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
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
              message: "登录成功",
              type: "success",
            });
            console.log(res.data.data);
            //2.吧用户的昵称和头像和id存起来
            sessionStorage.setItem("nickName", res.data.data.user.nickName);
            sessionStorage.setItem("avatar", res.data.data.user.avatar);
            sessionStorage.setItem("id", res.data.data.user.id);
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
    // toRegistr(){
    //   this.$router.push("/register");
    // }
  },
};
</script>
<style>
#body {
  background: url(../assets/login_bg.jpg);
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
.login1 {
  width: 450px;
  height: 125px;
  margin-top: 60px;
  overflow: hidden;
}
.login2 {
  width: 450px;
  height: 65px;
  margin-top: 10px;
  overflow: hidden;
}
.login3 {
  width: 450px;
  height: 125px;
  margin-top: 10px;
  overflow: hidden;
}

.userInput {
  width: 400px;
  margin: 10px 20px;
}
/* #verifyCode {
  width: 150px;
  height: 50px;
  margin: 10px 20px 10px;
  display: inline-block;
}
#codeImg {
  display: inline-block;
  line-height: 40px;
  width: 150px;
  height: 45px;
  margin: 10px 30px 10px 0px;
  background: red;
  float: right;
} */
#forget {
  width: 150px;
  margin: 10px 20px;
}
#register {
  float: right;
  width: 150px;
  margin: 10px 20px;
  margin-right: 30px;
}
#login {
  width: 400px;
  margin: 20px 20px;
}
</style>