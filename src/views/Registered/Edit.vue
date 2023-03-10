<template>
  <el-form
    id="form"
    ref="form"
    :model="form"
    label-width="150px"
    label-position="left"
  >
    <h2 class="form-title">编辑集体预约活动</h2>
    <el-form-item label="活动名称">
      <el-input v-model="form.ename"></el-input>
    </el-form-item>
    <el-form-item label="活动发起组织">
      <el-input v-model="form.organization"></el-input>
    </el-form-item>
    <el-form-item label="活动地点">
      <el-input v-model="form.address"></el-input>
    </el-form-item>
    <el-form-item label="活动限制人数">
      <el-input type="number" v-model.number="form.limited"></el-input>
    </el-form-item>
    <el-form-item label="活动日期">
      <el-date-picker
        v-model="form.edate"
        style="width: 100%"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="开始时间">
      <el-time-picker
        v-model="form.startTime"
        style="width: 100%"
        value-format="HH:mm:ss"
        :picker-options="{
          selectableRange: '6:00:00 - 22:00:00',
        }"
        placeholder="任意时间点"
      >
      </el-time-picker>
    </el-form-item>
    <el-form-item label="结束时间">
      <el-time-picker
        v-model="form.endTime"
        style="width: 100%"
        value-format="HH:mm:ss"
        :picker-options="{
          selectableRange: '6:00:00 - 22:00:00',
        }"
        placeholder="任意时间点"
      >
      </el-time-picker>
    </el-form-item>
    <!-- <el-form-item label="活动参加老师">
      <el-select
        v-model="form.teachers"
        multiple
        placeholder="请选择"
        style="width: 100%"
      >
        <el-option
          v-for="item in teacherList"
          :key="item.tid"
          :label="item.tname"
          :value="item.tid"
        >
        </el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="活动介绍">
      <el-input type="textarea" v-model="form.intro"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" class="btn">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ["eid", "passForm"],
  data() {
    return {
      teacherList: null,
      form: {},
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.adminAxios({
          method: "post",
          url: "/admin/event/update",
          params: {
            ...this.form,
            edate: this.handleDate(this.form.edate),
          },
        });
        this.$message.success("修改成功");
        this.$emit("close");
        // this.$router.push("/registered/show");
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    handleDate(date) {
      if (!(date instanceof Date)) {
        return;
      }
      // 格式化时间为 yyyy-mm-dd
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return (
        year.toString() + "-" + (month < 10 ? "0" + month : month) + "-" + day
      );
    },

    handleTime(time) {
      if (!(time instanceof Date)) {
        return;
      }
      // 格式化时间为 hh:mm:ss
      const hour = time.getHours();
      const minute = time.getMinutes();
      const second = time.getSeconds();
      return (
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (minute < 10 ? "0" + minute : minute) +
        ":" +
        (second < 10 ? "0" + second : second)
      );
    },
    // async getTeacherList() {
    //   try {
    //     const { data } = this.adminAxios({
    //       method: "get",
    //       url: "/info/teacher/list",
    //     });
    //     this.teacherList = data.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
  created() {
    this.form = {
      ...this.passForm,
    };
  },
};
</script>

<style scoped lang="less">
#form {
  width: 600px;
  margin: 0 auto;
  //   padding: 100px;
}
.form-title {
  margin-bottom: 20px;
}

.btn {
  width: 80%;
}
</style>
