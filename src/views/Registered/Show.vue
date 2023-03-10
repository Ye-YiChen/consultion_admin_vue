<template>
  <div class="show">
    <el-button @click="handleAdd" type="primary" style="float: right">添加</el-button>
    <el-table :data="showList" style="width: 100%" stripe>
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="名称">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="组织">
              <span>{{ props.row.organization }}</span>
            </el-form-item>
            <el-form-item label="日期">
              <span>{{ props.row.edate }}</span>
            </el-form-item>
            <el-form-item label="开始时间">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="结束时间">
              <span>{{ props.row.endTime }}</span>
            </el-form-item>
            <el-form-item label="地点">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="限制人数">
              <span>{{ props.row.limited }}</span>
            </el-form-item>
            <el-form-item label="已报名人数">
              <span>{{ props.row.exist }}</span>
            </el-form-item>
            <el-form-item label="活动简介">
              <span>{{ props.row.intro }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="ename" label="名称"></el-table-column> -->
      <!-- <el-table-column prop="organization" label="组织" width="180">
      </el-table-column> -->
      <el-table-column prop="id" label="活动id" width="100%"></el-table-column>
      <el-table-column prop="position" label="地点"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="startTime" label="开始时间">
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间">
      </el-table-column>
      <el-table-column prop="attendNumber" label="参与人数" width="100%">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button size="mini" type="primary" @click="handleTeacherAdd(scope.$index, scope.row)">添加老师</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="showList.length" :page-size="10" :current-page.sync="currentPage"></el-pagination>
    <el-dialog title="添加" :visible.sync="showAdd">
      <add @close="handleAddClose" />
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="showEdit">
      <edit :passForm="editForm" @close="showEdit = false" />
    </el-dialog>
    <el-dialog title="添加老师" :visible.sync="showTeacherAdd">
      <teacher-add :passForm="editForm" @close="showTeacherAdd = false" />
    </el-dialog>
  </div>
</template>

<script>
import { getPublicConsultListSize, getPublicConsultList, removePublicConsult } from "../../api/publicConsult";
import Add from "./Add.vue";
import Edit from "./Edit.vue";
import TeacherAdd from "./TeacherAdd.vue";
export default {
  components: { Add, Edit, TeacherAdd },
  data() {
    return {
      tableData: {
        unexpired: {
          data: [],
          total: 0
        },
        expired: {
          data: [],
          total: 0
        },
        onGoing: {
          data: [],
          total: 0
        },
        finished: {
          data: [],
          total: 0
        }
      },
      showAdd: false,
      showEdit: false,
      showTeacherAdd: false,
      editForm: null,
      editEid: null,
      currentPage: 1,
    };
  },
  computed: {
    showList() {
      return [
        ...this.tableData.unexpired.data.map(item => ({
          ...item,
          date: this.formatDate(item.timeInf.date),
          startTime: this.formatTime(item.timeInf.startTime),
          endTime: this.formatTime(item.timeInf.endTime)
        })),
        ...this.tableData.expired.data.map(item => ({
          ...item,
          date: this.formatDate(item.timeInf.date),
          startTime: this.formatTime(item.timeInf.startTime),
          endTime: this.formatTime(item.timeInf.endTime)
        })),
        ...this.tableData.onGoing.data.map(item => ({
          ...item,
          date: this.formatDate(item.timeInf.date),
          startTime: this.formatTime(item.timeInf.startTime),
          endTime: this.formatTime(item.timeInf.endTime)
        })),
        ...this.tableData.finished.data.map(item => ({
          ...item,
          date: this.formatDate(item.timeInf.date),
          startTime: this.formatTime(item.timeInf.startTime),
          endTime: this.formatTime(item.timeInf.endTime)
        }))
      ].slice((this.currentPage - 1) * 10, this.currentPage * 10);
    }
  },
  methods: {
    /**
     * 将形如20221212日期格式化为 2022-12-12
     */
    formatDate(date) {
      return date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8)
    },
    /**
     * 将形如0808时间格式格式化为 08:08
     */
    formatTime(time) {
      return time.slice(0, 2) + ':' + time.slice(2, 4)
    },
    handleEdit(index, row) {
      this.showEdit = true;
      this.editForm = row;
      console.log(this.editForm);
    },
    handleAdd() {
      this.showAdd = true;
    },
    async handleDelete(index, row) {
      const { id, state } = row;
      // 如果state !== 0/1, 不能删除
      if (state !== 0 && state !== 1) {
        this.$message.error('已经开始，不能删除');
        return;
      }
      try {
        // await removePublicConsult(id)
        // console.log(typeof (id))
        // 删除
        this.tableData.unexpired.data.forEach((item, index) => {
          if (item.id === id) {
            console.log(index)
            this.tableData.unexpired.data.splice(index, 1);
          }
        });
        this.tableData.expired.data.forEach((item, index) => {
          if (item.id === id) {
            this.tableData.expired.data.splice(index, 1);
          }
        });
        this.tableData.onGoing.data.forEach((item, index) => {
          if (item.id === id) {
            this.tableData.onGoing.data.splice(index, 1);
          }
        });
        this.tableData.finished.data.forEach((item, index) => {
          if (item.id === id) {
            this.tableData.finished.data.splice(index, 1);
          }
        });
      } catch (error) {
        // 提醒错误
        this.$message.error("删除失败");
      }
    },
    handleTeacherAdd(index, row) {
      this.editForm = row;
      this.showTeacherAdd = true;
    },
    async handleAddClose(item) {
      this.showAdd = false;

      this.tableData.unexpired.total += 1;
      const list = await this.queryList(1, 10, 0)
      this.tableData.unexpired.data = list
      // 刷新页面
      // window.location.reload();
    },
    async queryList(page, size, state) {
      const res = await getPublicConsultList(state, page, size);
      return res.data.data;
    },

  },
  async created() {
    try {
      const publicSizeListQuery = [getPublicConsultListSize(0), getPublicConsultListSize(1), getPublicConsultListSize(2), getPublicConsultListSize(3)]
      const publicSizeList = await Promise.all(publicSizeListQuery)
      this.tableData.unexpired.total = publicSizeList[0].data.data.size
      this.tableData.expired.total = publicSizeList[1].data.data.size
      this.tableData.onGoing.total = publicSizeList[2].data.data.size
      this.tableData.finished.total = publicSizeList[3].data.data.size
      const publicListQuery = [getPublicConsultList(0, 1, 10), getPublicConsultList(1, 1, 10), getPublicConsultList(2, 1, 10), getPublicConsultList(3, 1, 10)]
      const publicList = await Promise.all(publicListQuery)
      this.tableData.unexpired.data = publicList[0].data.data
      this.tableData.expired.data = publicList[1].data.data
      this.tableData.onGoing.data = publicList[2].data.data
      this.tableData.finished.data = publicList[3].data.data
      // this.$forceUpdate()
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style  lang="less">
.el-main {
  line-height: 10px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>