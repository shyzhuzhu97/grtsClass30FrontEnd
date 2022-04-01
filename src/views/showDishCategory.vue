<template id="showDishCategory" >
  <div>
    <el-table stripe border :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50" label="编号"></el-table-column>

      <el-table-column prop="dishCategoryName" label="菜品分类名称" width="180">
      </el-table-column>
      <el-table-column prop="dishCategoryDes" label="菜品分类描述" width="360">
      </el-table-column>
      <el-table-column prop="created" label="创建时间" width="180">
      </el-table-column>
      <el-table-column prop="updated" label="修改时间" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              dialogFormVisible = true;
              handleEdit(scope.row);
            "
            >修改</el-button
          >
          <el-dialog title="修改菜品分类" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="category">
              <el-form-item label="菜品分类名称" :label-width="formLabelWidth">
                <el-input
                  v-model="category.dishCategoryName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="菜品分类描述" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="category.dishCategoryDes"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="
                  submitCategory();
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            style="margin-left: 20px"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="6"
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
      category: {
        id:"",
        dishCategoryName: "",
        dishCategoryDes: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.handleCurrentChange(1);
  },
  methods: {
    handleEdit(row) {
      console.log(row);
      this.$http
        .get("http://localhost:8081/category/findCategoryById/" + row.id)
        .then((res) => {
          if (res.data.code == 200) {
            this.category=res.data.data.category;
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
    handleDelete(row) {
      let deleteId = row.id;
      this.$confirm("确认删除该菜品分类？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http
            .get(
              "http://localhost:8081/category/deleteCategoryById/" + deleteId
            )
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
    handleCurrentChange(val) {
      this.$http
        .get("http://localhost:8081/category/showCategoryByPage/" + val)
        .then((res) => {
          if (res.data.code == 200) {
            this.tableData = res.data.data.dishCategories;
            this.totalNum = res.data.data.categoryNum;
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
    submitCategory() {
      
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
        .post("http://localhost:8081/category/updateCategory", this.category)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.dialogFormVisible = false;
            this.handleCurrentChange(1);
            this.currentPage = 1;
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
</style>

