<template>
  <div class="login">
    <div class="left-show">
      <img src="../assets/login-left.png" class="left-img" />
    </div>
    <div class="right-show">
      <div class="login-form">
        <div class="title-box">
          <h2 class="form-title">登录 后台管理系统</h2>
          <h3 class="form-subtitle">登录 后台管理系统</h3>
        </div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="medium" :style="{ width: '100%' }">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      // this.$router.push("/registered");
      // return;
      try {
        const { data: { data } } = await this.adminAxios({
          method: "post",
          url: "/user/login/admin",
          data: {
            username: this.form.username,
            password: this.form.password,
          },
        });
        window.localStorage.setItem('token', data.token)
        console.log(data)
        this.$message({
          message: "登陆成功！",
          type: "success",
        });
        this.$router.push("/registered");
      } catch (error) {
        this.$message({
          message: error.message,
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  height: 100%;
}

.left-show {
  flex: 30%;
  display: flex;
  justify-content: center;
  align-items: center;

  .left-img {
    width: 100%;
  }
}

.right-show {
  flex: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to top left,
      rgb(28, 33, 43),
      rgb(18, 54, 126),
      rgb(16, 63, 158),
      rgb(28, 96, 180));

  .login-form {
    color: white;
  }

  .title-box {
    padding-left: 80px;
    text-align: left;

    .form-title {
      font-size: 28px;
      font-weight: 400;
      text-align: left;
      margin: 0;
      margin-bottom: 5px;
    }

    .form-subtitle {
      font-size: 16px;
      font-weight: 400;
      color: #b3b3b3;
      text-align: left;
      margin: 0;
      margin-bottom: 40px;
    }
  }
}
</style>
