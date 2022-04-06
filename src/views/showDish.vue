<template id="showDish" >
  <div>
    <el-form :inline="true" :model="queryDish" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="queryDish.dishName"
          placeholder="菜品名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryValue" placeholder="菜品分类" value-key="id">
          <el-option
            v-for="item in queryCategories"
            :key="item.id"
            :label="item.dishCategoryName"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-col :span="6">
          <el-date-picker
            type="date"
            placeholder="选择开始日期"
            v-model="queryDish.created"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="6">
          <el-date-picker
            type="date"
            placeholder="选择截止日期"
            v-model="queryDish.updated"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="findDish()">查询</el-button>
        <el-button @click="clear()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table
      stripe
      border
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="45"> </el-table-column>
      <el-table-column type="index" width="50" label="编号"></el-table-column>
      <el-table-column prop="dishImg" label="菜品图片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.dishImg" width="95" height="80" />
        </template>
      </el-table-column>
      <el-table-column prop="dishName" label="菜品名称" width="120">
      </el-table-column>
      <el-table-column prop="dishDes" label="菜品描述" width="320">
      </el-table-column>
      <el-table-column
        prop="category.dishCategoryName"
        label="菜品分类"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="price" label="菜品价格" width="80">
      </el-table-column>
      <el-table-column prop="created" label="创建时间" width="140">
      </el-table-column>
      <el-table-column prop="updated" label="修改时间" width="140">
      </el-table-column>
      <el-table-column prop="buyCount" label="购买数量" width="70">
      </el-table-column>
      <el-table-column fixed="right" width="160px">
        <template slot="header">
          <el-button
            type="danger"
            style="margin-left: 20px"
            @click="deleteIds()"
            >批量删除</el-button
          >
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              dialogFormVisible = true;
              handleEdit(scope.row);
            "
            >修改</el-button
          >
          <el-dialog
            title="修改菜品"
            :visible.sync="dialogFormVisible"
            append-to-body
          >
            <el-form ref="form" :model="dish">
              <el-form-item label="菜品名称" :label-width="formLabelWidth">
                <el-input v-model="dish.dishName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="菜品描述" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="dish.dishDes"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="菜品分类" :label-width="formLabelWidth">
                <el-select
                  v-model="value"
                  placeholder="请选择菜品分类"
                  style="width: 300px"
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
              <el-form-item label="菜品图片" :label-width="formLabelWidth">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:8081/img/uploadDishImg"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="dish.dishImg" :src="dish.dishImg" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="菜品价格" :label-width="formLabelWidth">
                <el-input
                  type="number"
                  v-model="dish.price"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitDish()">确 定</el-button>
            </div>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            style="margin-left: 5px"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange(currentPage,queryDish)"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :total="totalNum"
        :current-page.sync="currentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      totalNum: 0,
      currentPage: 1,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      queryDish: {
        dishName: "",
        price: "",
        category: {},
        created: "",
        updated: "",
      },
      dish: {
        id: "",
        buyCount: "",
        dishName: "",
        dishDes: "",
        dishImg: "",
        price: "",
        category: {},
        created: "",
        updated: "",
      },
      categories: [],
      queryCategories: [],
      dishs: [],
      value: {},
      queryValue: {},
    };
  },
  created() {
    this.handleCurrentChange(1, this.queryDish);
    this.showCategoryAll();
  },
  methods: {
    //多条件展示菜品
    handleCurrentChange(val, dish) {
      this.$http
        .post("http://localhost:8081/dish/showDishByPage/" + val, dish)
        .then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.dishs;
            this.totalNum = res.data.data.dishNum;
          } else if (res.data.code == 500) {
            this.$message({
              message: "连接超时",
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
    //多条件查询
    findDish() {
      this.currentPage = 1;
      this.queryDish.category = this.queryValue;
      this.handleCurrentChange(1, this.queryDish);
      this.queryValue = {};
    },
    clear() {
      this.queryValue = {};
      this.queryDish = {};
    },
    //修改菜品时查询所有分类
    showCategoryAll() {
      this.$http
        .get("http://localhost:8081/category/showCategoryAll")
        .then((res) => {
          this.categories = res.data.data.categories;
          this.queryCategories = this.categories;
        })
        .catch((err) => {
          this.$message({
            message: "连接超时",
            type: "warning",
          });
        });
    },
    handleDelete(row) {},
    //修改菜品时的回显
    handleEdit(row) {
      this.$http
        .get("http://localhost:8081/dish/findDishById/" + row.id)
        .then((res) => {
          if (res.data.code == 200) {
            this.dish = res.data.data.dish;
            this.value = res.data.data.dish.category;
          } else if (res.data.code == 500) {
            this.$message({
              message: "查询失败",
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

    //删除菜品
    handleDelete(row) {
      let deleteId = row.id;
      this.$confirm("确认删除该菜品分类？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .get("http://localhost:8081/dish/deleteDishById/" + deleteId)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.handleCurrentChange(1);
                this.currentPage = 1;
              } else if (res.data.code == 500) {
                this.$message({
                  message: "删除失败",
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //上传头像
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

    //批量删除
    handleSelectionChange(val) {
      this.dishs = val;
    },
    deleteIds() {
      let ids = [];
      for (let dish in this.dishs) {
        ids.push(this.dishs[dish].id);
      }
      this.$http
        .post("http://localhost:8081/dish/deleteIds", ids)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.handleCurrentChange(1);
            this.currentPage = 1;
          } else if (res.data.code == 500) {
            this.$message({
              message: "删除失败",
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
    //提交修改
    submitDish() {
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
      } else if (this.dish.price == 0) {
        this.$message({
          message: "菜品价格不能为零!",
          type: "warning",
        });
        return;
      } else if (this.dish.dishImg == "") {
        this.$message({
          message: "菜品图片不能为空!",
          type: "warning",
        });
        return;
      }
      this.dish.category = this.value;
      this.$http
        .post("http://localhost:8081/dish/updateDish", this.dish)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.currentPage = 1;
            this.handleCurrentChange(1);
          } else if (res.data.code == 500) {
            this.$message({
              message: "修改失败",
              type: "warning",
            });
            this.dialogFormVisible = false;
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
.block {
  width: 40%;
  height: 32px;
  margin-left: 40%;
  margin-top: 1%;
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
