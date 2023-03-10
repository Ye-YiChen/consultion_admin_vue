<template>
  <div class="teacher">
    <el-table :data="tableData.data" style="width: 100%" stripe lazy>
      <!-- <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="介绍">
              <span>{{ scope.row.intro }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="老师头像">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.image"></el-avatar>
        </template>
      </el-table-column> -->
      <el-table-column prop="teacherId" label="老师工号"></el-table-column>
      <el-table-column prop="teacherName" label="老师姓名"></el-table-column>
      <el-table-column prop="teacherCollege" label="所属学院"></el-table-column>
      <!-- <el-table-column prop="address" label="工作地点"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleExamine(scope.row.teacherId)">通过</el-button>

          <!-- <el-button size="mini" type="danger" @click="handleExamine(0, scope.row.tid, scope.$index)">不通过</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTeacherInfAuthNotSize, getTeacherInfAuthNotList, passTeacherAuth } from '../../api/teacher';
export default {
  name: "TeacherExamine",
  data() {
    return {
      tableData: {
        total: 0,
        data: []
      },
    }
  },
  methods: {
    async handleExamine(teacherId) {
      await passTeacherAuth(teacherId)
      this.$message.success('审核通过')
      this.tableData.data = this.tableData.data.filter(item => item.teacherId !== teacherId)
     
    }
  },
  async mounted() {
    const { data } = await getTeacherInfAuthNotSize()
    console.log(data)
    this.tableData.total = data.data
    const { data: { data: list } } = await getTeacherInfAuthNotList(1, 10)
    this.tableData.data = list

  }
}
</script>