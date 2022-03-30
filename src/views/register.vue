<template id="register" >
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
            @blur="checkData(1)"
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
          <el-input
            class="userInput"
            placeholder="请输入昵称(选填)"
            prefix-icon="el-icon-user-solid"
            v-model="user.nickName"
            clearable
          >
          </el-input>
          <el-input
            @blur="checkData(2)"
            class="userInput"
            placeholder="请输入邮箱"
            prefix-icon="el-icon-message"
            v-model="user.email"
            clearable
          >
          </el-input>
          <span style="margin: 0px 21px; color: #606266; font-size: 8px"
            >请点击上传头像</span
          >
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8081/user/uploadAvatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="user.avatar" :src="user.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <router-link to="/">
            <el-button id="backLogin" type="primary" plain>返回登录</el-button>
          </router-link>
          <el-button
            :disabled="disabled"
            id="register"
            @click="addUser()"
            type="primary"
            plain
            >注册</el-button
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
      disabled: false,
      user: {
        userName: "",
        passWord: "",
        nickName: "",
        email: "",
        avatar: "",
        // verifyCode: "",
      },
    };
  },
  created() {},
  methods: {
    checkData(type) {
      this.disabled = false;
      let checkData = "";
      if (type == 1) {
        checkData = this.user.userName;
      } else if (type == 2) {
        checkData = this.user.email;
      }
      this.$http
        .get("http://localhost:8081/user/checkData/" + type + "/" + checkData)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            if (type == 1) {
              this.$message({
                message: "用户名可用",
                type: "success",
              });
            }
            if (type == 2) {
              this.$message({
                message: "邮箱可用",
                type: "success",
              });
            }
            this.disabled = false;
          } else if (res.data.code == 500) {
            this.$message({
              message: res.data.message,
              type: "warning",
            });
            this.disabled = true;
          }
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
    register() {
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
      } else if (this.user.email == "") {
        this.$message({
          message: "邮箱不能为空!",
          type: "warning",
        });
        return;
      }
    },
    addUser() {
      this.$http
        .post("http://localhost:8081/user/addUser", this.user)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "注册成功，请去邮箱激活账号",
              type: "success",
            });
            this.$router.push("/");
          } else if (res.data.code == 500) {
            this.$message({
              message: res.data.message,
              type: "warning",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.user.avatar = res.data.imgPath;
      this.$message({
                message: "上传头像成功",
                type: "success",
              });

      //this.user.imageUrl = "http://localhost/obito.jpg";
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
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
.login {
  width: 450px;
  height: 425px;
  margin-top: 20px;
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

#backLogin {
  width: 150px;
  margin: 10px 20px;
  margin-right: 30px;
}
#register {
  float: right;
  width: 200px;
  margin: 10px 20px;
  margin-right: 30px;
}
.avatar-uploader {
  width: 80px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 20px;
  margin-top: 5px;
  display: inline-block;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
</style>