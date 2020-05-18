<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a>人员管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>密码管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row>
      <el-col :span="6">
        <el-input v-model="searchData" placeholder="输入姓名搜索"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-table :data="datalist">
      <el-table-column label="姓名" prop="name" width="190"></el-table-column>
      <el-table-column label="账号" prop="email" width="190"></el-table-column>
      <el-table-column label="密码" prop="password" width="190"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1,2,5,10]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
var listJson = {
  list: [
    { name: "张三", email: "3134234@163.com", password: 12343 },
    { name: "王小虎", email: "3134234@163.com", password: 13343 },
    { name: "李小虎", email: "3134234@163.com", password: 14343 },
    { name: "李四", email: "3134234@163.com", password: 15343 },
    { name: "赵高", email: "3134234@163.com", password: 16343 },
    { name: "王五", email: "3134234@163.com", password: 16343 },
    { name: "小明", email: "3134234@163.com", password: 17343 },
    { name: "小红", email: "3134234@163.com", password: 18343 },
    { name: "成吉思汗", email: "3134234@163.com", password: 19343 },
    { name: "橘子", email: "3134234@163.com", password: 10343 }
  ]
};
export default {
  data() {
    return {
      datalist: [],
      foodsList: [],
      limit: 5,
      total: null,
      page: 1,
      searchData: ""
    };
  },
  created() {
    this.pageList();
  },
  methods: {
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.foodsList = listJson.list;
      this.getList();
    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      let list = this.foodsList.filter((item, index) =>
        item.name.includes(this.searchData)
      );
      this.datalist = list.filter(
        (item, index) =>
          index < this.page * this.limit &&
          index >= this.limit * (this.page - 1)
      );
      this.total = list.length;
    },
    // 当每页数量改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.page = 1;
      this.getList();
    },
    // 当当前页改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
    },
    // 搜索过滤数据
    search() {
      this.page = 1;
      this.getList();
    }
  }
};
</script>
