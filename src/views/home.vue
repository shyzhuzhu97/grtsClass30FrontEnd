<template id="home" >
  <div>
    <h3 class="title">个人中心</h3>
    <el-form ref="form" :model="user"
      label-width="60px"
      style="margin-left: 160px"
    >
      <el-form-item label="昵称">
        <el-input v-model="user.nickName" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          showPassword
          v-model="user.passWord"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像" style="height: 80px">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8081/user/uploadAvatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="user.avatar" :src="user.avatar" class="avatar" />
          <i
            style="margin-top: 30px"
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        id: sessionStorage.getItem("id"),
        userName: "",
        passWord: "",
        nickName: "",
        avatar: sessionStorage.getItem("avatar"),
        email: "",
      },
    };
  },
  created() {
    let id = sessionStorage.getItem("id");
    this.getInfo(id);
  },
  methods: {
    getInfo(id) {
      this.$http
        .post("http://localhost:8081/user/getInfo/" + id)
        .then((res) => {
          this.user.nickName = res.data.data.info.nickName;
          this.user.email = res.data.data.info.email;
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
    onSubmit() {
      if (this.user.passWord == "") {
        this.$message({
          message: "用户密码不能为空!",
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
      this.$http
        .post("http://localhost:8081/user/updateUser" , this.user)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            
            this.$message({
              message: "修改成功，请重新登录",
              type: "success",
            });
            this.$router.push("/");
            sessionStorage.clear();
          } else if (res.data.code == 500) {
            this.$message({
              message: "修改失败",
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
      this.user.avatar = res.data.imgPath;
      this.$message({
        message: "上传头像成功",
        type: "success",
      });
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
.title {
  margin-bottom: 20px;
  color: #606266;
  text-align: center;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
.avatar-uploader {
  width: 200px;
  height: 200px;
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
  width: 80px;
  height: 80px;
}
</style>