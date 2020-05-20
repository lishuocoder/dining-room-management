<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a>订单管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 订单列表区域 -->
      <el-table :data="deskList" stripe>
        <el-table-column label="桌位号" prop="id" width="150"></el-table-column>

        <el-table-column label="下单时间" width="300">
          <template v-slot="scope">
            <i class="el-icon-time"></i>
            <!-- <span style="margin-left: 10px">{{ JSON.parse(scope.row.order)}}</span> -->
            <span style="margin-left: 10px">{{startTime(scope.row)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="200">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag
                size="medium"
                :type="scope.row.status==1 ? '' : 'danger'"
              >{{ scope.row.status==1 ?'空闲中' :'用餐中'}}</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="用餐时长(min)" prop="time" width="200">
          <template v-slot="scope">
            <span>{{time(scope.row)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              plain
              :disabled=" scope.row.status==1 ? true : false"
              @click="handleOrder(scope.row)"
            >{{scope.row.status == 1 ? '暂无订单' : '查看订单'}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 订单详情对话框 -->
      <el-dialog
        title="订单详情"
        :visible.sync="orderDetailShow"
        width="60%"
        :before-close="handleClose"
      >
        <!-- 主体 -->
        <el-table :data="formList" stripe show-summary>
          <el-table-column label="菜名" prop="name"></el-table-column>
          <el-table-column label="图片" prop="img" width="150">
            <template v-slot="scope">
              <!-- <img :src="'../../..' + scope.row.img " style="height: 60px"/> -->
              <img :src="scope.row.img" style="height: 60px" />
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="num"></el-table-column>
          <el-table-column label="价格(￥)" prop="food_price"></el-table-column>

          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="foodEdit(scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
          <el-button @click="orderDetailShow = false">取 消</el-button>
          <el-button type="primary" @click="Settlement(),orderDetailShow = false">结算</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deskList: [],
      orderDetailForm: [],
      orderDetailShow: false,
      orderId: null
    };
  },
  created() {
    this.getOrder();
  },
  computed: {
    //增加一个过滤器，将list里的菜品个数等于0的菜品过滤出去，返回个数非0的菜品
    formList: function() {
      return this.orderDetailForm.filter(function(item) {
        if (item.num != 0) {
          return item;
        }
      });
    }
  },
  methods: {
    //获取桌位信息状态
    async getOrder() {
      const { data: res } = await this.$http.get("?m=admin&c=index&a=desks", {
        params: { token: sessionStorage.getItem("token") }
      });
      // console.log(res.data);
      this.deskList = res.data;
    },
    //订单的下单时间
    startTime(row) {
      // console.log(row.order);
      if (row.order !== undefined) {
        return row.order.start_time;
      } else {
        return "-- ：-- ：--";
      }
    },
    //用餐时长计算
    time(row) {
      if (row.status == 1) {
        return 0;
      }
      var nowtimestamp = Date.parse(new Date()) / 1000; //获取当前时间(秒)
      var order_start_time = row.order.start_time.replace(/\-/g, "/");
      var Time = new Date(order_start_time);
      var timestemp = Time.getTime() / 1000; //订单时间(秒)
      var timeNum = parseInt((nowtimestamp - timestemp) / 60);
      // console.log("当前时间:"+nowtimestamp,"订单时间:"+timestemp,"返回的分钟:"+timeNum)
      return timeNum;
    },

    // 点击查看订单按钮
    handleOrder(row) {
      this.orderDetailForm = row.order.order_detail;
      console.log(this.orderDetailForm);
      this.orderDetailShow = true;
      this.orderId = row.order.order_detail[0].order_id;
      console.log(this.orderId);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 结算
    Settlement() {
      console.log("点击了结算");
      this.$http
        .post("?m=admin&c=index&a=changeOrderStatus", {
          token: sessionStorage.getItem("token") ,
          status: 1,
          order_id: this.orderId
        })
        .then(function(res) {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
</style>