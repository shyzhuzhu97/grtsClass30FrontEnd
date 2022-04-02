<template id="addDish" >
  <div>
    <h3 class="title">添加菜品</h3>
    <el-form label-width="120px" style="margin-left: 290px; margin-top: 30px">
      <el-form-item label="菜品名称">
        <el-input
          v-model="dish.dishName"
          style="width: 300px; margin-left: 50px"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜品描述">
        <el-input
          type="textarea"
          :rows="4"
          v-model="dish.dishDes"
          style="width: 300px; margin-left: 50px"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜品分类">
        <el-select
          v-model="value"
          placeholder="请选择菜品分类"
          style="width: 300px; margin-left: 50px"
          value-key="id" 
        >
        
          <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.dishCategoryName"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜品图片">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8081/img/uploadDishImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          style="margin-left: 35px"
        >
          <img v-if="dish.dishImg" :src="dish.dishImg" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="菜品价格">
        <el-input
          type="number"
          v-model="dish.price"
          style="width: 300px; margin-left: 50px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          style="width: 300px; margin-left: 50px"
          >添加菜品</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dish: {
        dishName: "",
        dishDes: "",
        dishImg: "",
        price: "",
        category: {},
      },
      categories: [],
      value: {},
    };
  },
  created() {
    this.showCategoryAll();
  },
  methods: {
    onSubmit() {
      this.dish.category = this.value;
      if (this.dish.dishName == "") {
        this.$message({
          message: "菜品名称不能为空!",
          type: "warning",
        });
        return;
      } else if (this.dish.dishDes == "") {
        this.$message({
          message: "菜品描述不能为空!",
          type: "warning",
        });
        return;
      } else if (this.dish.dishImg == "") {
        this.$message({
          message: "菜品图片不能为空!",
          type: "warning",
        });
        return;
      }else if (this.dish.price == "") {
        this.$message({
          message: "菜品价格不能为空!",
          type: "warning",
        });
        return;
      }
      
      this.$http
        .post("http://localhost:8081/dish/addDish", this.dish)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.$router.push("/showDish");
          } else if (res.data.code == 500) {
            this.$message({
              message: "添加失败",
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
      this.dish.dishImg = res.data.imgPath;
      this.$message({
        message: "上传图片成功",
        type: "success",
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传菜品图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传菜品图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    showCategoryAll() {
      this.$http
        .get("http://localhost:8081/category/showCategoryAll")
        .then((res) => {
          this.categories = res.data.data.categories;
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
