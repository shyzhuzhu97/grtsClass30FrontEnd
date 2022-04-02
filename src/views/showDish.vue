<template id="showDish" >
  <div>
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
        <template   slot-scope="scope">            
                    <img :src="scope.row.dishImg"  width="80" height="80" />
                 </template>   
      </el-table-column>
      <el-table-column prop="dishName" label="菜品名称" width="120">
      </el-table-column>
      <el-table-column prop="dishDes" label="菜品描述" width="260">
      </el-table-column>
      <el-table-column
        prop="category.dishCategoryName"
        label="菜品分类"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="price" label="菜品价格" width="100">
      </el-table-column>
      <el-table-column prop="created" label="创建时间" width="100">
      </el-table-column>
      <el-table-column prop="updated" label="修改时间" width="100">
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <el-button type="danger" style="margin-left: 1px" @click="deleteIds()"
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
          <!-- <el-dialog title="修改菜品" :visible.sync="dialogFormVisible">
            <el-form ref="form" :model="category">
              <el-form-item label="菜品名称" :label-width="formLabelWidth">
                <el-input
                  v-model="dish.dishCategoryName"
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
              <el-button type="primary" @click="submitCategory()"
                >确 定</el-button
              >
            </div>
          </el-dialog> -->
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
      formLabelWidth: "120px",
      dish: {
        id: "",
        buyCount: "",
        dishName: "",
        dishDes: "",
        dishImg: "",
        price: "",
        category: {},
      },
    };
  },
  created() {
    this.handleCurrentChange(1);
  },
  methods: {
    handleCurrentChange(val) {
      this.$http
        .get("http://localhost:8081/dish/showDishByPage/" + val)
        .then((res) => {
          console.log(res);
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
    handleDelete(row) {},
     //修改菜品的回显
    handleEdit(row) {
      console.log(row);
      this.$http
        .get("http://localhost:8081/category/findCategoryById/" + row.id)
        .then((res) => {
          if (res.data.code == 200) {
            this.category = res.data.data.category;
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

    //批量删除
    handleSelectionChange(val) {
      this.categories = val;
    },
    deleteIds() {
      let ids = [];
      for (let category in this.categories) {
        ids.push(this.categories[category].id);
      }
      this.$http
        .post("http://localhost:8081/category/deleteIds", ids)
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
  },
};
</script>


<style>
</style>
