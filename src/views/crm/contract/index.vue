<template>
  <div>
    <c-r-m-list-head
      :search.sync="search"
      :crm-type="crmType"
      :create-fun="createClick"
      title="合同管理"
      placeholder="客户名称/合同编号/合同名称"
      main-title="新建合同"
      @on-handle="listHeadHandle"
      @on-search="crmSearch"
      @on-export="exportInfos"/>
    <div
      v-empty="!crm.contract.index"
      xs-empty-icon="nopermission"
      xs-empty-text="暂无权限"
      class="crm-container">
      <c-r-m-table-head
        ref="crmTableHead"
        :crm-type="crmType"
        :sort-data="sortData"
        @filter="handleFilter"
        @handle="handleHandle"
        @scene="handleScene"/>
      <el-table
        v-loading="loading"
        id="crm-table"
        :row-height="40"
        :data="list"
        :height="tableHeight"
        :cell-class-name="cellClassName"
        :header-cell-class-name="headerCellClassName"
        class="n-table--border"
        use-virtual
        stripe
        border
        highlight-current-row
        style="width: 100%"
        @row-click="handleRowClick"
        @sort-change="sortChange"
        @header-dragend="handleHeaderDragend"
        @selection-change="handleSelectionChange">
        <el-table-column
          show-overflow-tooltip
          type="selection"
          align="center"
          width="30"/>
        <el-table-column
          v-for="(item, index) in fieldList"
          :key="index"
          :fixed="index==0"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          sortable="custom"
          show-overflow-tooltip>
          <template slot-scope="{row,column,$index}">
            <template v-if="item.prop == 'check_status'">
              <span :style="getStatusStyle(row.check_status)" class="status-mark"/>
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
        <el-table-column/>
        <el-table-column
          :resizable="false"
          fixed="right"
          width="40">
          <template
            slot="header"
            slot-scope="slot">
            <field-set
              :crm-type="crmType"
              @change="setSave"/>
          </template>
        </el-table-column>
        <wk-empty
          slot="empty"
          :props="{
            buttonTitle: '新建合同',
            showButton: saveAuth
          }"
          @click="createClick"
        />
      </el-table>
      <div class="p-contianer">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size.sync="pageSize"
          :total="total"
          :pager-count="5"
          class="p-bar"
          background
          layout="prev, pager, next, sizes, total, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
        <span class="money-bar">{{ moneyDes }}</span>
      </div>
    </div>
    <!-- 相关详情页面 -->
    <c-r-m-all-detail
      :visible.sync="showDview"
      :crm-type="rowType"
      :id.sync="rowID"
      :page-list="crmType == rowType ? list : []"
      :page-index.sync="rowIndex"
      class="d-view"
      @handle="handleHandle"/>

    <!-- 新建 -->
    <contract-create
      v-if="createShow"
      @close="createShow = false"
      @save-success="handleHandle"
    />
  </div>
</template>

<script>
import ContractCreate from './Create'
import CRMAllDetail from '@/views/crm/components/CRMAllDetail'

import TableMixin from '../mixins/Table'
import { floatAdd } from '@/utils'
import { separator } from '@/filters/vueNumeralFilter/filters'

export default {
  /** 客户管理 的 合同列表 */
  name: 'ContractIndex',
  components: {
    ContractCreate,
    CRMAllDetail
  },
  mixins: [TableMixin],
  data() {
    return {
      crmType: 'contract',
      createShow: false,
      moneyData: null // 合同列表金额
    }
  },
  computed: {
    moneyDes() {
      if (!this.moneyData || JSON.stringify(this.moneyData) == '{}') {
        return null
      }

      const canCheckMoney = this.moneyData.hasOwnProperty('contractMoney')
      const canCheckReceivedMoney = this.moneyData.hasOwnProperty('receivedMoney')
      const canCheckUnReceivedMoney = this.moneyData.hasOwnProperty('unReceivedMoney')
      let contractMoney = 0.0
      let receivedMoney = 0.0
      let unReceivedMoney = 0.0

      // 未勾选展示合同总金额信息
      if (this.selectionList.length == 0) {
        contractMoney = this.moneyData.contractMoney
        receivedMoney = this.moneyData.receivedMoney
        unReceivedMoney = this.moneyData.unReceivedMoney
      } else {
        for (let index = 0; index < this.selectionList.length; index++) {
          const element = this.selectionList[index]
          // 1 审核通过的合同
          if (element.check_status == 2) {
            if (canCheckMoney) {
              contractMoney = floatAdd(contractMoney, parseFloat(element.money || 0))
            }
            if (canCheckReceivedMoney) {
              receivedMoney = floatAdd(receivedMoney, parseFloat(element.done_money || 0))
            }

            if (canCheckUnReceivedMoney) {
              unReceivedMoney = floatAdd(unReceivedMoney, parseFloat(element.un_money || 0))
            }
          }
        }

        contractMoney = contractMoney.toFixed(2)
        receivedMoney = receivedMoney.toFixed(2)
        unReceivedMoney = unReceivedMoney.toFixed(2)
      }

      let moneyDes = ''
      if (canCheckMoney) {
        moneyDes = `合同总金额：${separator(contractMoney || 0)}`
      }

      if (canCheckReceivedMoney) {
        moneyDes += moneyDes ? ` / ` : ''
        moneyDes += `已回款金额：${separator(receivedMoney || 0)}`
      }

      if (canCheckUnReceivedMoney) {
        moneyDes += moneyDes ? ` / ` : ''
        moneyDes += `未回款金额：${separator(unReceivedMoney || 0)}`
      }

      return moneyDes
    }
  },
  mounted() {},
  methods: {
    /**
     * 通过回调控制class
     */
    cellClassName({ row, column, rowIndex, columnIndex }) {
      if (column.property === 'num') {
        return 'can-visit--underline can-visit--bold'
      } else if (
        column.property === 'customer_id' ||
        column.property === 'business_id' ||
        column.property === 'contacts_id' ||
        column.property === 'customer_name' ||
        column.property === 'contract_num' ||
        column.property === 'business_name'
      ) {
        return 'can-visit--underline'
      } else if (column.property === 'money') {
        return 'xr-money'
      } else if (column.property === 'done_money') {
        return 'xr-money green'
      } else if (column.property === 'un_money') {
        return 'xr-money red'
      } else {
        return ''
      }
    },

    headerCellClassName({ row, column, rowIndex, columnIndex }) {
      if (column.property === 'num') {
        return 'header-can-visit-backgroud'
      }
      return ''
    },

    /**
     * 新建点击
     */
    createClick() {
      this.createShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/table.scss';
</style>
