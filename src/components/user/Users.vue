<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a>人员管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>服务员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 用户列表区域 -->
      <el-table :data="tableData" style="width: 100%">

        <el-table-column label="入职日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>性别: {{ scope.row.sex }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="职务" width="180" prop="position">
        </el-table-column>

        <el-table-column label="电话" width="180" prop="mobile">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { 
          date:"2020-03-21",
          position: "服务员",
          name: "王小虎",
          sex: "男",
          mobile:"18934564234"
        },
        { 
          date:"2020-02-23",
          position: "服务员",
          name: "王小虎",
          sex: "男",
          mobile:"18934564234"
        },
        { 
          date:"2020-03-21",
          position: "经理",
          name: "王小虎",
          sex:"男",
          mobile:"18934564234"
        },
        { 
          date:"2020-03-21",
          position: "服务员",
          name: "王小虎",
          sex: "男",
          mobile:"18934564234"
        }
      ]
    };
  },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
};
</script>

<style scoped lang="scss">
</style>