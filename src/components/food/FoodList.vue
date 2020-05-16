<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a>菜品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>菜品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 搜索区域 -->
      <el-row :gutter="40">
        <el-col :span="7">
          <el-input placeholder="请输入菜品搜索" v-model="foodsSearch" class="input-with-select" clearable @clear="getList">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加菜品</el-button>
        </el-col>
      </el-row>

      <!-- 菜品列表区域 -->
      <el-table :data="datalist.slice((currentPage-1)*PageSize,currentPage*PageSize)" stripe>
        <el-table-column label="菜品id" prop="id" width="70"></el-table-column>
        <el-table-column label="菜名" prop="name"></el-table-column>
        <el-table-column label="价格(￥)" prop="price"></el-table-column>
        <el-table-column label="分类" prop="type_id"></el-table-column>
        <el-table-column label="简介" prop="explain"></el-table-column>
        <el-table-column label="上下架状态" prop="status">
          <template v-slot="scope">
            <!-- {{scope.row}} -->
            <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foodsSearch: "",
      foodsList: [],
      currentPage: 1,
      total: null,
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      datalist: []
    };
  },
  created() {
    this.getFoodList();
  },
  methods: {
    //获取菜品信息
    async getFoodList() {
      const { data: res } = await this.$http.get("?m=admin&c=food&a=index", {
        params: { token: "5ebe9adec1ccc" }
      });
      this.foodsList = res.data;
      this.getList();
    },
    //搜索过滤
    getList() {
      let list = this.foodsList.filter((item, index) =>
        item.name.includes(this.foodsSearch)
      );
      this.datalist = list.filter(
        (item, index) =>
          index < this.currentPage * this.PageSize &&
          index >= this.PageSize * (this.currentPage - 1)
      );
      this.total = list.length;
    },
    //编辑按钮
    handleEdit(index, row) {
      console.log(index, row + "编辑");
    },
    // 监听pagesize改变
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 监听页面值改变
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
    },
    // 搜索过滤数据
    search() {
      this.currentPage = 1;
      this.getList();
      if (this.foodsSearch == "") {
        this.$message.warning("查询条件不能为空！");
        return;
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>