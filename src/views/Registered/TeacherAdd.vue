<template>
  <div class="t-a">
    <el-transfer v-model="selectedValue" :data="unAttendTeacherList" class="control-group" :titles="['未添加', '已添加']">
      <el-button class="transfer-footer" slot="left-footer" size="small" @click="getTeacherList">更多</el-button>
      <!-- <el-button class="transfer-footer" slot="right-footer" size="small">更多</el-button> -->

    </el-transfer>
    <div class="btn-container">
      <el-button type="primary" @click="onSubmit" class="btn">确认</el-button>
    </div>
  </div>
</template>
<script>
import { getPublicConsultTeacherList, changeTeacherAttend, getTeacherInfAuthOKSize, getTeacherInfAuthOKList } from '../../api/publicConsult'
const pageSize = 10
export default {
  props: ["passForm"],
  data() {
    return {
      teacherList: {
        total: 0,
        data: []
      },
      selectedValue: [],
      attendTeacher: [],
    };
  },
  methods: {
    async onSubmit() {
      const add = 'add'
      const remove = 'remove'
      const addAction = this.selectedValue.map(item => {
        console.log(this.id, item);
        return changeTeacherAttend(this.id, item, add)
        
      })
      const removeAction = this.attendTeacher.map(item => {
        console.log(this.id, item);
        if (!this.selectedValue.includes(item.teacherId)) {
          return changeTeacherAttend(this.id, item.teacherId, remove)
        }
      })
      await Promise.all([...addAction, ...removeAction])
      this.$message.success('老师添加成功！')
      this.$emit("close");
    },
    async getTeacherList() {
      const { total, data } = this.teacherList
      if (total <= data.length) {
        this.$message.warning("没有更多了")
        return
      }
      const { data: { data: teacherList } } = await getTeacherInfAuthOKList(
        Math.ceil(data.length / pageSize) + 1,
        pageSize,
      );
      console.log(teacherList)
      this.teacherList.data.push(...teacherList);
    },

  },
  computed: {
    id() {
      return this.passForm.id;
    },
    unAttendTeacherList() {
      return this.teacherList.data.filter((item) => {
        return !this.attendTeacher.includes(item.id);
      }).map((item) => {
        return {
          key: item.teacherId,
          label: item.teacherName,
        };
      });
    },
  },
  async created() {
    console.log(this.passForm);
    const { data: { data: attendTeacher } } = await getPublicConsultTeacherList(this.id);
    this.attendTeacher = attendTeacher;
    this.selectedValue = attendTeacher.map((item) => {
      return item.teacherId;
    });
    const { data: { data: teacherListSize } } = await getTeacherInfAuthOKSize();
    this.teacherList.total = teacherListSize.size;
    await this.getTeacherList();

  },
};
</script>
<style lang="less" scoped>
.control-group {
  width: 100%;
  margin-bottom: 20px;
  margin-left: 20px;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
</style>