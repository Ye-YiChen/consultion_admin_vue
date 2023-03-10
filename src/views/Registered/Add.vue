<template>
  <el-form id="form" ref="form" :model="form" label-width="150px" label-position="left">
    <h2 class="form-title">添加集体预约活动</h2>
    <!-- <el-form-item label="活动名称">
      <el-input v-model="form.ename"></el-input>
    </el-form-item>
    <el-form-item label="活动发起组织">
      <el-input v-model="form.organization"></el-input>
    </el-form-item> -->
    <el-form-item label="活动地点">
      <el-input v-model="form.position"></el-input>
    </el-form-item>
    <el-form-item label="活动限制人数">
      <el-input type="number" v-model.number="form.allNumber"></el-input>
    </el-form-item>
    <el-form-item label="活动日期">
      <el-date-picker v-model="form.date" style="width: 100%" type="date" placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="开始时间">
      <el-time-picker v-model="form.startTime" style="width: 100%" :picker-options="{
  selectableRange: '6:00:00 - 22:00:00',
}" placeholder="任意时间点">
      </el-time-picker>
    </el-form-item>
    <el-form-item label="结束时间">
      <el-time-picker v-model="form.endTime" style="width: 100%" :picker-options="{
  selectableRange: '6:00:00 - 22:00:00',
}" placeholder="任意时间点">
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
    <!-- <el-form-item label="活动介绍">
      <el-input type="textarea" v-model="form.intro"></el-input>
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="onSubmit" class="btn">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addPublicConsult } from "@/api/publicConsult";
export default {
  data() {
    return {
      form: {
        ename: "",
        position: "",
        organization: "",
        allNumber: "",
        exist: 0,
        date: "",
        startTime: "",
        endTime: "",
        intro: "",
        teachers: [],
      },
      teacherList: null,
    };
  },
  methods: {
    async onSubmit() {
      // 检查空值
      if (
        !this.form.position ||
        !this.form.allNumber ||
        !this.form.date ||
        !this.form.startTime ||
        !this.form.endTime
      ) {
        this.$message.error("请填写完整信息");
        return;
      }
      const params = {
        ...this.form,
        timeInf: {
          date: this.handleDate(this.form.date),
          startTime: this.handleTime(this.form.startTime),
          endTime: this.handleTime(this.form.endTime),
        }
      };
      try {
        await addPublicConsult(params.timeInf, params.allNumber, params.position);
        this.$message.success("添加成功");
        this.$emit("close", params)
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    handleDate(date) {
      // 格式化时间为 yyyymmdd
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (day < 10 ? "0" + day : day)
      );
    },
    handleTime(time) {
      // 格式化时间为 hhmm
      const hour = time.getHours();
      const minute = time.getMinutes();
      return (
        `${hour < 10 ? "0" + hour : hour}${minute < 10 ? "0" + minute : minute}`
      );
    },
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
