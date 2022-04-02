<template id="showDish" >
  <div>
    <el-table
      stripe
      border
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" width="50" label="编号"></el-table-column>
      <el-table-column prop="dishImg" label="菜品图片" width="120">
      </el-table-column>
      <el-table-column prop="dishName" label="菜品名称" width="120">
      </el-table-column>
      <el-table-column prop="dishDes" label="菜品描述" width="220">
      </el-table-column>
      <el-table-column prop="category" label="菜品分类" width="120">
      </el-table-column>
      <el-table-column prop="price" label="菜品价格" width="120">
      </el-table-column>
      <el-table-column prop="created" label="创建时间" width="120">
      </el-table-column>
      <el-table-column prop="updated" label="修改时间" width="120">
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
              <el-button type="primary" @click="submitCategory()"
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
    return {};
  },
  methods: {},
};
</script>


<style>
</style>
