<template>
  <div id="registered">
    <el-container direction="vertical" class="">
      <!-- 头部内容 -->
      <el-header>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>查看</el-dropdown-item> -->
            <!-- <el-dropdown-item>新增</el-dropdown-item> -->
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{ adminName }}</span>
      </el-header>
      <el-container direction="horizontal">
        <!-- 左边侧边栏 -->
        <el-aside width="200px">
          <el-menu :default-openeds="['']" router>
            <el-submenu index="/registered">
              <template slot="title">
                <i class="el-icon-s-flag"></i>
                <span>集体预约</span>
              </template>
              <el-menu-item index="/registered/show">全部</el-menu-item>
              <!-- <el-menu-item index="/registered/add">添加</el-menu-item> -->
            </el-submenu>

            <el-submenu index="/registered">
              <template slot="title">
                <i class="el-icon-s-claim"></i>
                <span>审核</span>
              </template>
              <el-menu-item index="/registered/passage">文章审核</el-menu-item>
              <el-menu-item index="/registered/teacher">教师审核</el-menu-item>
              <!-- <el-menu-item index="/registered/add">添加</el-menu-item> -->
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adminName: "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    queryAdminName() {
      this.adminAxios({
        method: "post",
        url: "/admin/info",
      }).then((res) => {
        this.adminName = res.data.data.adminName;
      });
    },
    logout() {
      this.adminAxios({
        method: "post",
        url: "/admin/logout",
      })
        .then(() => {
          this.$message({
            message: "退出成功！",
            type: "success",
          });
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    // this.queryAdminName();
  },
};
</script>

<style lang="less">
#registered {
  height: 100%;
}
.el-container {
  min-height: 100%;
}
.el-header {
  width: 100%;
  background-color: #b3c0d1;
  color: #333;
  text-align: right;
  line-height: 60px;
}
.el-menu {
  background-color: rgb(251, 251, 251);
}
.el-aside {
  width: 300px;
  // height: 100%;
  background-color: #eee;
  color: #333;
  // text-align: center;
  line-height: 200px;
}

.el-main {
  height: 100%;
  background-color: #fff;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}
</style>
