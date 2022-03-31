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
          <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1]])"
        >全选</el-button
      >
      <el-button @click="toggleSelection()">删除</el-button>
    </div> -->
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
    };
  },
  created() {
    this.handleCurrentChange(1);
  },
  methods: {
    handleEdit(row) {
      console.log(row);
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
                this.currentPage=1
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

