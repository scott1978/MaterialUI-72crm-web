<template>
  <el-dialog
    :visible="show"
    :append-to-body="true"
    :close-on-click-modal="false"
    top="10vh"
    width="80%"
    custom-class="no-padding-dialog"
    @close="hideView">

    <div
      slot="title"
      class="header"
      @click="showDview = false">
      <span class="title">{{ title }}</span>
      <el-input
        v-if="placeholder"
        :placeholder="placeholder"
        v-model="inputContent"
        class="search-input"
        @keyup.enter.native="searchInput">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click.native="searchInput" />
      </el-input>
    </div>

    <div class="container">
      <div class="content">
        <div class="list-body">
          <el-table
            v-loading="loading"
            id="crm-table"
            ref="crmTable"
            :data="list"
            :height="tableHeight"
            :cell-class-name="cellClassName"
            stripe
            border
            highlight-current-row
            style="width: 100%"
            @row-click="handleRowClick"
            @sort-change="sortChange">
            <el-table-column
              v-for="(item, index) in showFieldList"
              :key="index"
              :sortable="item.prop != 'pool_day' ? 'custom' : false"
              :fixed="index==0"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              show-overflow-tooltip>
              <template slot-scope="{row, column, $index}">
                <template v-if="item.prop == 'deal_status'">
                  <i :class="row[item.prop] | dealIcon"/>
                  <span>{{ row[item.prop] | dealName }}</span>
                </template>
                <template v-else-if="item.prop == 'is_lock'">
                  <i
                    v-if="row.is_lock == 1"
                    class="wk wk-circle-password customer-lock"/>
                </template>
                <template v-else-if="item.prop == 'check_status'">
                  <span
                    :style="{
                      backgroundColor: getCRMStatusColor(row.check_status)
                  }" class="status-mark"/>
                  <span>{{ getCRMStatusName(row.check_status) }}</span>
                </template>
                <wk-field-view
                  v-else
                  :props="item"
                  :form_type="item.form_type"
                  :value="row[column.property]"
                >
                  <template slot-scope="{ data }">
                    {{ fieldFormatter(row, column, row[column.property], item) }}
                  </template>
                </wk-field-view>
              </template>
            </el-table-column>
            <el-table-column v-if="showFillColumn" />
          </el-table>
          <div
            v-if="paging"
            class="p-contianer">
            <el-pagination
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size.sync="pageSize"
              :total="total"
              class="p-bar"
              background
              layout="prev, pager, next, sizes, total, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </div>
        </div>
      </div>
      <!-- 相关详情页面 -->
      <c-r-m-all-detail
        :visible.sync="showDview"
        :crm-type="rowType"
        :id="rowID"
        class="d-view"
        @handle="handleHandle" />

      <record-list
        v-if="recordShow"
        :crm-type="rowType"
        :request="recordRequest"
        :params="recordParams"
        @handle="getList"
        @hide="recordShow = false" />
    </div>
  </el-dialog>
</template>
<script type="text/javascript">
import { filedGetTableFieldAPI } from '@/api/crm/common'

import crmTypeModel from '@/views/crm/model/crmTypeModel'
import CRMAllDetail from '@/views/crm/components/CRMAllDetail'
import RecordList from './components/RecordList'
import WkFieldView from '@/components/NewCom/WkForm/WkFieldView'

import { mapGetters } from 'vuex'
import Lockr from 'lockr'
import CheckStatusMixin from '@/mixins/CheckStatusMixin'

export default {
  name: 'ReportList', // 简报列表
  components: {
    CRMAllDetail,
    RecordList,
    WkFieldView
  },
  filters: {
    dealIcon(statu) {
      return statu == '已成交' ? 'wk wk-success deal-suc' : 'wk wk-close deal-un'
    },

    dealName(statu) {
      return statu == '已成交' ? '已成交' : '未成交'
    }
  },
  mixins: [CheckStatusMixin],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    },
    crmType: String,
    fieldList: Array,
    recordRequest: Function,
    request: Function,
    params: Object,
    // 展示分页
    paging: {
      type: Boolean,
      default: true
    },

    sortable: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      inputContent: '',

      loading: false, // 加载动画
      tableHeight: this.getTableHeight(), // 表的高度
      list: [],
      showFieldList: [],
      sortData: {}, // 字段排序
      currentPage: 1,
      pageSize: Lockr.get('crmPageSizes') || 15,
      pageSizes: [15, 30, 60, 100],
      total: 0,

      /** 控制详情展示 */
      rowID: '', // 行信息
      rowType: '', // 详情类型
      showDview: false,
      recordParams: {},
      recordShow: false
    }
  },
  computed: {
    ...mapGetters(['crm']),
    showExamineStatus() {
      if (this.crmType == 'contract' && this.crmType == 'receivables') {
        return true
      }
      return false
    },
    showFillColumn() {
      if (this.fieldList && this.fieldList.length) {
        return false
      }
      return true
    }
  },
  watch: {
    show(value) {
      if (value) {
        this.initInfo()
      }
    }
  },
  mounted() {
    this.$el.addEventListener('click', this.handleDocumentClick, false)
  },

  destroyed() {
    if (this.$el) {
      this.$el
        .removeEventListener('click', this.handleDocumentClick, false)
    }
  },
  methods: {
    /**
     * 获取表高
     */
    getTableHeight() {
      const clientHeight = document.documentElement.clientHeight
      const paddingHieght = clientHeight * 0.2

      return clientHeight - paddingHieght - 200
    },

    /**
     * 初始化数据
     */
    initInfo() {
      this.inputContent = ''
      this.showFieldList = []
      this.sortData = {}
      this.$nextTick(() => {
        this.$refs.crmTable.clearSort()
      })
      this.list = []
      this.currentPage = 1

      window.onresize = () => {
        this.tableHeight = this.getTableHeight()
      }

      if (this.fieldList) {
        this.showFieldList = this.fieldList
        this.getList()
      } else {
        this.getFieldList()
      }
    },

    /**
     * 搜索
     */
    searchInput() {
      this.currentPage = 1
      this.getList()
    },

    /**
     * 获取列表数据
     */
    getList() {
      this.loading = true
      var params = {}

      // 加入分页
      // if (this.paging) {
      params = {
        page: this.currentPage,
        limit: this.pageSize,
        types: ('crm_' + this.crmType) == 'crm_record' ? 'crm_activity' : 'crm_' + this.crmType
      }
      // }

      // 如果有占位符 加入搜索
      if (this.placeholder) {
        params.search = this.inputContent
      }

      if (this.sortData.order) {
        params.order_field = {
          create_user_name: 'create_user_id',
          owner_user_name: 'owner_user_id',
          customer_name: 'customer_id',
          type_id_info: 'type_id',
          status_id_info: 'status_id',
          business_name: 'business_id',
          contacts_name: 'contacts_id',
          order_user_name: 'order_user_id',
          category_name: 'category_id',
          contract_num: 'contract_id',
          contract_number: 'contract_id',
          plan_id_info: 'plan_id'
        }[this.sortData.prop] || this.sortData.prop
        params.order_type = this.sortData.order == 'ascending' ? 'asc' : 'desc'
      }
      this.request({ ...params, ...this.params, [this.crmType != 'record' && 'log_type' ]: { customer: 1, business: 2, receivables: 4, contract: 3 }[this.crmType] })
        .then(res => {
          if (this.paging) {
            this.list = res.data.list
            this.total = res.data.dataCount
          } else {
            this.list = res.data
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    /**
     * 获取表头字段
     */
    getFieldList() {
      if (this.showFieldList.length == 0) {
        this.loading = true
        const crmType =
          this.crmType == 'business_status' ? 'business' : this.crmType
        var params = {
          // label: crmTypeModel[crmType]
          types: crmTypeModel[crmType] == 'crm_record' ? 'crm_activity' : crmTypeModel[crmType],
          module: 'crm',
          action: 'index',
          controller: this.crmType
        }

        filedGetTableFieldAPI(params)
          .then(res => {
            for (let index = 0; index < res.data.length; index++) {
              const element = res.data[index]

              var width = 0
              if (!element.width) {
                if (element.name && element.name.length <= 6) {
                  width = element.name.length * 15 + 45
                } else {
                  width = 140
                }
              } else {
                width = element.width
              }

              this.showFieldList.push({
                prop: element.fieldName || element.field,
                label: element.name,
                width: width,
                form_type: element.form_type
              })
            }

            // 获取好字段开始请求数据
            this.getList()
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        // 获取好字段开始请求数据
        this.getList()
      }
    },

    /**
     * 格式化字段
     */
    fieldFormatter(row, column) {
      // 如果需要格式化
      if (this.fieldList && this.fieldList.length) {
        if (column.property == 'types') {
          // return crmTypeModel.convertTypeToName(row[column.property])
          return {
            crm_leads: '线索',
            crm_customer: '客户',
            crm_contacts: '联系人',
            crm_product: '产品',
            crm_business: '商机',
            crm_contract: '合同',
            crm_receivables: '回款',
            crm_receivables_plan: '回款计划',
            crm_pool: '公海',
            crm_visit: '回访',
            crm_invoice: '发票' }[row[column.property]]
        }
      }
      return row[column.property] === '' || row[column.property] === null ? '--' : row[column.property]
    },

    /**
     * 字段排序
     */
    sortChange(column, prop, order) {
      this.sortData = column
      this.getList()
    },

    /**
     * 更改每页展示数量
     */
    handleSizeChange(val) {
      Lockr.set('crmPageSizes', val)
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
     * 查看详情
     */
    handleRowClick(row, column, event) {
      if (this.crmType === 'leads') {
        if (column.property === 'name') {
          this.rowID = row.leads_id
          this.showDview = true
        } else {
          this.showDview = false
        }
      } else if (this.crmType === 'customer') {
        if (column.property === 'name') {
          this.rowID = row.customer_id
          this.rowType = 'customer'
          this.showDview = true
        } else {
          this.showDview = false
        }
      } else if (this.crmType === 'contacts') {
        if (column.property === 'name') {
          this.rowID = row.contacts_id
          this.rowType = 'contacts'
          this.showDview = true
        } else if (column.property === 'customer_name') {
          this.rowID = row.customer_id
          this.rowType = 'customer'
          this.showDview = true
        } else {
          this.showDview = false
        }
      } else if (
        this.crmType === 'business' ||
        this.crmType === 'business_status'
      ) {
        if (column.property === 'customer_name') {
          this.rowID = row.customer_id
          this.rowType = 'customer'
          this.showDview = true
        } else if (column.property === 'name') {
          this.rowID = row.business_id
          this.rowType = 'business'
          this.showDview = true
        } else {
          this.showDview = false
        }
      } else if (this.crmType === 'contract') {
        if (column.property === 'name') {
          this.rowID = row.contract_id
          this.rowType = 'contract'
          this.showDview = true
        } else if (column.property === 'customer_name') {
          this.rowID = row.customer_id
          this.rowType = 'customer'
          this.showDview = true
        } else if (column.property === 'business_name') {
          this.rowID = row.business_id
          this.rowType = 'business'
          this.showDview = true
        } else if (column.property === 'contacts_name') {
          this.rowID = row.contacts_id
          this.rowType = 'contacts'
          this.showDview = true
        } else if (column.property === 'num' || column.property === 'name') {
          this.rowID = row.contract_id
          this.rowType = 'contract'
          this.showDview = true
        } else {
          this.showDview = false
        }
      } else if (this.crmType === 'product') {
        if (column.property === 'name') {
          this.rowID = row.product_id
          this.showDview = true
        } else {
          this.showDview = false
        }
      } else if (this.crmType === 'receivables') {
        if (column.property === 'customer_name') {
          this.rowID = row.customer_id
          this.rowType = 'customer'
          this.showDview = true
        } else if (column.property === 'contract_num') {
          this.rowID = row.contract_id
          this.rowType = 'contract'
          this.showDview = true
        } else if (column.property === 'number') {
          this.rowID = row.receivables_id
          this.rowType = 'receivables'
          this.showDview = true
        } else {
          this.showDview = false
        }
      } else if (this.crmType === 'activity' || this.crmType === 'record') {
        if (column.property === 'dataCount' && row.dataCount) {
          // this.rowType = 'crm_' + crmTypeModel.convertTypeToKey(row.crmType)
          this.rowType = row.types
          this.recordParams = { crmType: row.types, queryType: 0, ...this.params }
          this.recordShow = true
        } else {
          this.recordShow = false
        }
      }
    },

    /**
     * 详情操作
     */
    handleHandle(data) {
      if (
        data.type === 'alloc' ||
        data.type === 'get' ||
        data.type === 'transfer' ||
        data.type === 'transform' ||
        data.type === 'delete' ||
        data.type === 'put_seas'
      ) {
        this.showDview = false
      }

      if (data.type !== 'edit') {
        this.getList()
      }
    },

    /**
     * 通过回调控制class
     */
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (
        this.crmType &&
        (column.property === 'customer_name' ||
          column.property === 'business_name' ||
          column.property === 'name' ||
          column.property === 'contacts_name' ||
          column.property === 'num' ||
          column.property === 'contract_num' ||
          column.property === 'number' ||
          ((this.crmType === 'activity' || this.crmType === 'record') && column.property === 'dataCount' &&
        row.dataCount))
      ) {
        return 'can-visit--underline'
      } else {
        return ''
      }
    },

    /**
     * 隐藏视图
     */
    hideView() {
      this.$emit('update:show', false)
      this.$emit('hide')
    },

    /**
     * 点击列表内容之外的区域隐藏
     */
    handleDocumentClick(e) {
      var hidden = true
      var items = document.getElementsByClassName('el-table__row')
      if (items && hidden) {
        for (let index = 0; index < items.length; index++) {
          const element = items[index]
          if (element.contains(e.target)) {
            hidden = false
            break
          }
        }
      }

      if (
        document.getElementById('slide') &&
        document.getElementById('slide').contains(e.target)
      ) {
        hidden = false
      }
      if (hidden) {
        this.showDview = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/table.scss';

/** 容器布局 */
.container {
  height: 100%;
}

.content {
  position: relative;
  height: 100%;
  padding: 0 6px 15px;
}

.header {
  position: relative;
  padding: 10px 0 0 0;

  .title {
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }
  .search-input {
    margin: 10px 0 0 0;
  }
}

.p-contianer {
  border: 1px solid $xr-border-line-color;
  border-top: none;
}

.d-view {
  top: 0;
}
.el-pagination {
  white-space: normal;
}
</style>
