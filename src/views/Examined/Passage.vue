<template>
  <div class="passage">
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column prop="title" label="文章标题">
        <template slot-scope="scope">
          <span style="cursor: pointer;" @click="handleShow(scope.row)">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tid" label="老师id"></el-table-column>
      <el-table-column prop="tname" label="老师姓名"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleExamine(true, scope.row.id, scope.$index)">通过</el-button>

          <el-button size="mini" type="danger" @click="handleExamine(false, scope.row.id, scope.$index)">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination class="pagination" layout="prev, pager, next" :page-size="20" :total="totalPage"
      @current-change="handleChange">
    </el-pagination>

    <el-dialog title="文章" :visible.sync="passageVisible" width="65%">
      <div>
        <h1 class="passage-title">{{ passage.title }}</h1>
        <hr />
        <h2 class="passage-subtitle">{{ passage.subtitle }}</h2>
        <div class="passage-content">{{ passage.content }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="passageVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PassageExamine',
  data() {
    return {
      tableData: [],
      passageVisible: false,
      passage: {
        title: '',
        subtitle: '',
        content: '',
      },
      currentPage: 1,
      totalPage: null,
    }
  },
  methods: {
    handleShow(row) {
      console.log(row);
      this.passageVisible = true;
      var that = this;
      var config = {
        method: 'get',
        url: '/news/get/body?id=' + row.id,
      };

      this.adminAxios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          that.passage.title = response.data.data.title;
          that.passage.subtitle = response.data.data.description;
          that.passage.content = response.data.data.body;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleChange(page) {
      this.currentPage = page
    },
    handleExamine(isPass, id, index) {
      var that = this;
      var config = {
        method: 'post',
        url: '/news/audit',
        data: {
          "id": id,
          "result": isPass,
        }
      };

      this.adminAxios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          that.$message({
            type: 'success',
            message: response.data.message
          });
          that.tableData.splice(index, 1);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  async mounted() {
    var that = this;
    var config = {
      method: 'post',
      url: '/news/get/audit-not',
      data: {
        "page": 1,
        "pageSize": 20,
      }
    };
    this.adminAxios(config)
      .then(function (response) {
        console.log(response.data.data);
        that.tableData = response.data.data;
        that.totalPage = response.data.data.length;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
}
</script>

<style scoped>
.passage-title {
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
  margin-bottom: 0;
}

hr {
  width: 50px;
  height: 3px;
  margin: 20px auto;
  border: 0;
  background: #000;
}

.passage-subtitle {
  text-align: center;
  margin: 0 auto;
  font-size: 13px;
  line-height: 18px;
}

.passage-content {
  bottom: 100px;
  left: 0;
  margin: 40px auto 0;
  padding: 0 50px;
  font-size: 16px;
  line-height: 24px;
}

.pagination {
  display: block;
  margin: 0 auto;
}
</style>