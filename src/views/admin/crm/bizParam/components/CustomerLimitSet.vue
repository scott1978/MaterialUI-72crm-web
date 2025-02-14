<template>
  <div>
    <div class="content-title">
      <span>{{ title }}</span>
      <el-button
        type="primary"
        class="rt"
        size="medium"
        @click="addRule">添加规则</el-button>
    </div>
    <div class="customer-table">
      <el-table
        v-loading="loading"
        :data="list"
        :height="tableHeight"
        :header-cell-style="headerCellStyle"
        style="width: 100%"
        stripe>
        <el-table-column
          v-for="(item, index) in fieldList"
          :key="index"
          :prop="item.field"
          :label="item.label"
          :formatter="fieldFormatter"
          show-overflow-tooltip/>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row)">编 辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="p-contianer">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size.sync="pageSize"
          :total="total"
          class="p-bar"
          background
          layout="prev, pager, next, sizes, total, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </div>
    </div>

    <edit-customer-limit
      :visible.sync="showAddEdit"
      :types="types"
      :action="action"
      @success="getList"/>
  </div>
</template>

<script>
import {
  crmSettingCustomerConfigListAPI,
  crmSettingCustomerConfigDelAPI
} from '@/api/admin/crm'
import EditCustomerLimit from './EditCustomerLimit'

export default {
  name: 'CustomerLimitSet',

  components: {
    EditCustomerLimit
  },

  props: {
    types: [String, Number] // 1拥有客户上限2锁定客户上限
  },

  data() {
    return {
      loading: false, // 展示加载中效果
      tableHeight: document.documentElement.clientHeight - 320, // 表的高度
      // 设置
      list: [],
      // 添加 编辑
      showAddEdit: false,
      action: {},
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 40],
      total: 0
    }
  },

  computed: {
    title() {
      return {
        1: '拥有客户数限制',
        2: '锁定客户数限制'
      }[this.types]
    },

    fieldList() {
      const temps = [
        { label: '适用范围', field: 'user_ids' },
        {
          label: {
            1: '拥有客户数上限',
            2: '锁定客户数上限'
          }[this.types],
          field: 'value'
        }
      ]

      if (this.types == 1) {
        temps.push({
          label: {
            1: '成交客户是否占有拥有客户数',
            2: '成交客户是否占有锁定客户数'
          }[this.types],
          field: 'is_deal'
        })
      }

      return temps
    }
  },

  watch: {
    types() {
      this.list = []
      this.getList()
    }
  },
  created() {
    /** 控制table的高度 */
    window.onresize = () => {
      this.tableHeight = document.documentElement.clientHeight - 320
    }
    this.getList()
  },

  methods: {
    /**
     * 列表头样式
     */
    headerCellStyle(val, index) {
      return { background: '#F2F2F2' }
    },

    /**
     * 更改每页展示数量
     */
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    /**
     * 更改当前页数
     */
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },

    /**
     * 列表
     */
    getList() {
      this.loading = true
      crmSettingCustomerConfigListAPI({
        page: this.currentPage,
        limit: this.pageSize,
        types: this.types
      })
        .then(res => {
          this.loading = false
          this.list = res.data.list.map(item => {
            if (item.user_ids) {
              item.user_ids = item.user_ids_info
            }
            if (item.structure_ids) {
              item.structure_ids = item.structure_ids_info
            }
            return item
          })
          this.total = res.data.dataCount
        })
        .catch(() => {
          this.loading = false
        })
    },

    /**
     * 列表格式化
     */
    fieldFormatter(row, column) {
      if (column.property == 'is_deal') {
        return row.is_deal == 1 ? '是' : '否' // 0 不占用 1 占用
      } else if (column.property === 'user_ids') {
        const structures = row['structure_ids_info'] || []
        let strName = structures
          .map(item => item.name)
          .join('、')

        const users = row['user_ids_info'] || []
        const userName = users
          .map(item => item.realname)
          .join('、')

        if (strName && userName) {
          strName += '、'
        }
        const name = strName + userName
        return name || '全公司'
        // 1 启用 0 禁用 2 删除
      } else if (column.property === 'status') {
        if (row[column.property] === 0) {
          return '停用'
        }
        return '启用'
      }
      return row[column.property]
    },

    /**
     * 编辑
     */
    handleEdit(data) {
      this.action = {
        type: 'update',
        data: data
      }
      this.showAddEdit = true
    },

    /**
     * 添加
     */
    addRule() {
      this.action = {
        type: 'save'
      }
      this.showAddEdit = true
    },

    /**
     * 删除
     */
    handleDelete(scope) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          crmSettingCustomerConfigDelAPI({
            id: scope.row.id
          })
            .then(res => {
              this.list.splice(scope.$index, 1)
              this.$message.success('删除成功')
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content-title {
  padding: 10px;
  border-bottom: 1px solid #e6e6e6;
}
.content-title > span {
  display: inline-block;
  height: 36px;
  line-height: 36px;
  margin-left: 20px;
}

/* 设置 */

.customer-table {
  border: 1px solid #e6e6e6;
  margin: 30px;
  flex: 1;
    box-sizing: border-box;
}

.p-contianer {
  position: relative;
  background-color: white;
  height: 44px;
  .p-bar {
    float: right;
    margin: 5px 100px 0 0;
    font-size: 14px !important;
  }
}
</style>
