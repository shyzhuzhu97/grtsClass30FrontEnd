<template id="addDishCategory" >
  <div>
    <h3 class="title">添加菜品分类</h3>
    <el-form label-width="120px" style="margin-left: 290px; margin-top: 100px">
      <el-form-item label="菜品分类名称">
        <el-input
          v-model="category.dishCategoryName"
          style="width: 300px; margin-left: 50px"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜品分类描述">
        <el-input
          type="textarea"
          :rows="4"
          v-model="category.dishCategoryDes"
          style="width: 300px; margin-left: 50px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          style="width: 300px; margin-left: 50px"
          >添加分类</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      category: {
        dishCategoryName: "",
        dishCategoryDes: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.category.dishCategoryName == "") {
        this.$message({
          message: "菜品分类名称不能为空!",
          type: "warning",
        });
        return;
      } else if (this.category.dishCategoryName == "") {
        this.$message({
          message: "菜品分类描述不能为空!",
          type: "warning",
        });
        return;
      }
      this.$http
        .post("http://localhost:8081/category/addCategory", this.category)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.$router.push("/showDishCategory");
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
  },
};
</script>


<style>
.title {
  margin-top: 20px;
  color: #606266;
  text-align: center;
}
</style>
