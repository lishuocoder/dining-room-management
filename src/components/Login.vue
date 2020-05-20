<template>
  <div class="login_container">
    <div class="login_box">
      <div class="touxiang_box">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form label-width="0px" class="login_from" :model="form" :rules="rules" ref="loginFromRef">
        <!-- 用户名 -->
        <el-form-item prop="email">
          <el-input prefix-icon="iconfont icon-personal" v-model="form.email"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-lock" type="password" v-model="form.password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btn">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="info" @click="resetFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "123",
        password: "123456"
      },
      // 表单的验证规则
      rules: {
        email: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log("点击了登录按钮");
      this.$refs.loginFromRef.validate(async valid => {
        // 表单正确valid为true
        if (!valid) return;
        const result = await this.$http.get("?m=admin&c=login&a=login", {
          params: this.form
        });
        console.log(result.data);
        if (result.data.error !== 0)
          return this.$message.error(result.data.msg);
        this.$router.push({path:'/home'} ,onComplete => { }, onAbort => { })
        this.$message.success(result.data.msg);
        sessionStorage.setItem("token", result.data.data.token);
      });

      // const that = this;
      // this.$http
      //   .get("?m=admin&c=login&a=login", { params: this.form })
      //   .then(response => {
      //     if (response.data.error !== 0)
      //       return this.$message.error(response.data.msg);
      //     that.$router.push(
      //       { path: "/home" },
      //       onComplete => {},
      //       onAbort => {}
      //     );
      //     this.$message.success(response.data.msg);
      //     sessionStorage.setItem("token", response.data.data.token);
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.log(error); //异常
      //   });
    },
    resetFrom() {
      //  console.log("重置按钮")
      this.$refs.loginFromRef.resetFields();
    }
  }
};
</script>

<style scoped lang="scss">
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .touxiang_box {
    width: 130px;
    height: 130px;
    border: 1px solid #fff;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
