<template>
  <el-popover
    v-model="showPopover"
    :disabled="disabled"
    placement="right-end"
    popper-class="no-padding-popover"
    trigger="click">
    <crm-relative
      v-if="!disabled&&showSelectView"
      ref="crmrelative"
      :crm-type="crmType"
      :action="relationAction"
      :selected-data="selectedData"
      @close="showPopover=false"
      @changeCheckout="checkInfos"/>
    <flexbox
      slot="reference"
      :class="[disabled ? 'is_disabled' : 'is_valid']"
      wrap="wrap"
      class="user-container xh-form-border"
      @click.native="contentClick">
      <div
        v-for="(aitem, aindex) in dataValue"
        :key="aindex"
        class="user-item"
        @click.stop="deleteinfo(aindex)">{{ getShowName(aitem) }}
        <i class="delete-icon el-icon-close"/>
      </div>
      <div
        v-if="dataValue.length == 0"
        class="add-item">+添加</div>
    </flexbox>
  </el-popover>
</template>
<script type="text/javascript">
import CrmRelative from './CrmRelative'
import arrayMixin from './arrayMixin'

export default {
  name: 'CrmRelativeCell', // 相关模块CRMCell 单类型 自定义字段用
  components: {
    CrmRelative
  },
  mixins: [arrayMixin],
  props: {
    relation: {
      // 相关ID
      type: Object,
      default: () => {
        return {}
      }
    },
    relativeType: String
  },
  data() {
    return {
      showPopover: false, // 展示popover
      showSelectView: false, // 内容
      radio: true, // 是否单选
      relationAction: { type: 'default' }
    }
  },
  computed: {
    // 如果有相关ID  展示相关效果 例如客户下的商机和合同
    isRelationShow() {
      return this.item && this.item.data && this.item.data.relation_id
    },
    selectedData() {
      const crmObj = {}
      crmObj[this.crmType] = this.dataValue
      return crmObj
    },
    crmType() {
      if (this.relativeType) {
        return this.relativeType
      }
      return this.item.data.formType
    }
  },
  watch: {
    relation: function(val) {
      if (val.moduleType) {
        this.relationAction = { type: 'condition', data: val }
      } else {
        this.relationAction = { type: 'default' }
      }
    }
  },
  mounted() {
    if (this.relation && this.relation.moduleType) {
      this.relationAction = { type: 'condition', data: this.relation }
    } else {
      this.relationAction = { type: 'default' }
    }
  },
  methods: {
    /** 选中 */
    checkInfos(data) {
      this.dataValue = data.data ? data.data : []
      this.$emit('value-change', {
        index: this.index,
        value: data.data
      })
    },
    /** 删除 */
    deleteinfo(index) {
      if (this.disabled) return
      if (this.radio && this.$refs.crmrelative) {
        // 如果单选告知删除
        this.$refs.crmrelative.clearAll()
      }
      if (this.dataValue.length === 1) {
        this.dataValue = []
      } else {
        this.dataValue.splice(index, 1)
      }

      this.$emit('value-change', {
        index: this.index,
        value: this.dataValue
      })
    },
    contentClick() {
      this.showSelectView = true
    },
    getShowName(data) {
      if (this.crmType === 'receivables') {
        return data.number || data.name
      } else if (this.crmType === 'customer') {
        return data.customer_name || data.name
      } else if (this.crmType === 'business') {
        return data.business_name || data.name
      } else if (this.crmType === 'contract') {
        return data.contractNum || data.num
      }
      return data.name
    }
  }
}
</script>
<style lang="scss" scoped>
.user-container {
  min-height: 34px;
  position: relative;
  border-radius: 3px;
  font-size: 12px;
  border: 1px solid #ddd;
  color: #333333;
  line-height: 15px;
  cursor: pointer;
  .user-item {
    padding: 5px;
    background-color: #e2ebf9;
    border-radius: 3px;
    margin: 3px;
    cursor: pointer;
  }
  .add-item {
    padding: 5px;
    color: $xr-color-text-placeholder;
    cursor: pointer;
  }
  .delete-icon {
    color: #999;
    cursor: pointer;
  }
}

.user-container.is_disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  cursor: not-allowed;
  .user-item {
    background-color: #f0f4f8ea;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .delete-icon {
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .add-item {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}

.user-container.is_valid:hover {
  border-color: #c0c4cc;
}

</style>
