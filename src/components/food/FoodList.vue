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
          <el-input
            placeholder="请输入菜品搜索"
            v-model="foodsSearch"
            class="input-with-select"
            clearable
            @clear="getList"
          >
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addFoodShow = true">添加菜品</el-button>
        </el-col>
      </el-row>

      <!-- 菜品列表区域 -->
      <!-- <el-table :data="datalist.slice((currentPage-1)*PageSize,currentPage*PageSize)" stripe> -->
      <el-table :data="datalist" stripe>
        <el-table-column label="菜品id" prop="id" width="70"></el-table-column>
        <el-table-column label="菜名" prop="name"></el-table-column>
        <el-table-column label="图片" prop="img" width="150">
          <template v-slot="scope">
            <!-- <img :src="'../../..' + scope.row.img " style="height: 60px"/> -->
            <img :src="scope.row.img" style="height: 60px" />
          </template>
        </el-table-column>
        <el-table-column label="价格(￥)" prop="price"></el-table-column>
        <el-table-column label="分类" prop="type_id">
          <template v-slot="scope">{{typeList[scope.row.type_id-1].name }}</template>
        </el-table-column>
        <el-table-column label="简介" prop="explain"></el-table-column>
        <el-table-column label="销量" prop="sales_volume"></el-table-column>
        <el-table-column label="上下架状态" prop="status">
          <template v-slot="scope">
            <el-switch
              class="switch"
              :width="55"
              v-model="scope.row.status"
              active-value="1"
              inactive-value="0"
              active-text="上架"
              inactive-text="下架"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="foodEdit(scope.row),editFoodShow = true"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 添加菜品的对话框 -->
      <el-dialog title="添加菜品" :visible.sync="addFoodShow" width="50%">
        <!-- 内容主体区域 -->
        <el-form ref="addFoodForm" :model="addFoodForm" label-width="80px">
          <el-form-item label="菜品名称">
            <el-input v-model="addFoodForm.name" placeholder="请输入菜名"></el-input>
          </el-form-item>
          <el-form-item label="价 格 (￥)">
            <el-input v-model="addFoodForm.price" placeholder="请输入价格"></el-input>
          </el-form-item>
          <el-form-item label="简 介">
            <el-input v-model="addFoodForm.explain" placeholder="请输入菜品简介"></el-input>
          </el-form-item>
          <el-form-item label="分 类">
            <el-select v-model="addFoodForm.type" placeholder="请选择分类">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="上下架">
            <el-switch
              class="switch"
              v-model="addFoodForm.status"
              :width="55"
              active-value="1"
              inactive-value="0"
              active-text="上架"
              inactive-text="下架"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>

          <el-form-item label="排序">
            <el-input v-model="addFoodForm.sort" placeholder="(序号越大越靠后)"></el-input>
          </el-form-item>

          <el-form-item label="详细介绍">
            <el-input type="textarea" v-model="addFoodForm.content" placeholder="请输入菜品详细介绍"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFoodShow = false">取 消</el-button>
          <el-button type="primary" @click="addFoodShow = false">添 加</el-button>
        </span>
      </el-dialog>
      <!-- 添加菜品的对话框结束 -->

      <!-- 编辑菜品对话框 -->
      <el-dialog title="修改菜品信息" :visible.sync="editFoodShow" width="50%">
        <!-- 内容主体区域 -->
        <el-form ref="editFoodForm" :model="editFoodForm" label-width="80px">
          <el-form-item label="菜品名称">
            <el-input v-model="editFoodForm.name"></el-input>
          </el-form-item>
          <el-form-item label="价 格 (￥)">
            <el-input v-model="editFoodForm.price"></el-input>
          </el-form-item>
          <el-form-item label="简 介">
            <el-input v-model="editFoodForm.explain"></el-input>
          </el-form-item>
          <el-form-item label="分 类">
            <el-select v-model="value" placeholder="请选择分类">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="上下架">
            <el-switch
              class="switch"
              v-model="editFoodForm.status"
              :width="55"
              active-value="1"
              inactive-value="0"
              active-text="上架"
              inactive-text="下架"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>

          <el-form-item label="详细介绍">
            <el-input type="textarea" v-model="editFoodForm.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">完成修改</el-button>
            <el-button>取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 编辑菜品结束 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foodsSearch: "",
      foodsList: [],
      datalist: [],
      currentPage: 1,
      total: null,
      PageSize: 5,
      typeList: [],
      addFoodShow: false, //控制添加对话框的显示
      editFoodShow: false, //控制修改对话框的显示
      editFoodForm: {}, //要编辑菜品的详细信息
      value: "", //修改菜品分类默认选项
      // 添加菜品信息表单
      addFoodForm: {
        name: "",
        price: "",
        explain: "",
        type: "",
        status: "1",
        sort: "",
        content: "",
        image: ""
      }
    };
  },
  created() {
    this.getFoodList();
    this.getTypeList();
  },
  methods: {
    //获取菜品分类
    async getTypeList() {
      const { data: res } = await this.$http.get("?c=type&a=index");
      this.typeList = res.data; //存入所有分类
      // console.log(this.typeList);
    },
    //获取菜品信息
    async getFoodList() {
      const { data: res } = await this.$http.get("?m=admin&c=food&a=index", {
        params: { token: "5ec112e2e7874" }
      });
      this.foodsList = res.data;
      this.getList();
      // console.log(res)
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
    //点击编辑按钮
    foodEdit(row) {
      this.editFoodForm = row;
      console.log(this.editFoodForm);
      this.value = row.type_id;
    },
    // 监听pagesize改变
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
      this.getList();
    },
    // 监听页面值改变
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      this.getList();
    },
    // 搜索
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