<template>
  <el-popover
    v-model="show"
    popper-class="no-padding-popover"
    placement="bottom"
    width="240"
    trigger="click">
    <div class="field-set">
      <el-input
        v-model="search"
        class="field-set__search"
        placeholder="搜索字段"
        @input="searchClick" />

      <div v-loading="loading" class="field-set__content">
        <draggable
          v-model="fields"
          :options="{ dragClass: 'sortable-drag', forceFallback: false }">
          <div
            v-for="(item, index) in fields"
            v-show="(poolConfig != 1 && item.fieldName !== 'poolDay') || poolConfig == 1"
            :key="index"
            class="field-set__content--item text-one-line">
            <el-switch v-model="item.check"/>
            <span v-if="item.center">{{ item.left }}<span class="input-word">{{ item.center }}</span>{{ item.right }}</span>
            <span v-else>{{ item.name }}</span>
          </div>
        </draggable>
      </div>

      <div class="field-set__ft">
        <el-button type="text" @click="reSet">重置</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </div>
    <slot v-if="$slots.reference" slot="reference" @click="show = !show"/>
    <i
      v-else
      slot="reference"
      class="wk wk-config table-set"
      @click="show = !show"/>
  </el-popover>
</template>

<script>
import {
  crmFieldConfigAPIIndexAPI,
  crmPoolFieldConfigIndexAPI,
  crmFieldConfigAPI,
  crmPoolFieldConfigAPI
} from '@/api/crm/common'
import crmTypeModel from '@/views/crm/model/crmTypeModel'
import { objDeepCopy } from '@/utils'
import Draggable from 'vuedraggable'

export default {
  /** 字段管理 */
  name: 'FieldSet',
  components: {
    Draggable
  },
  props: {
    crmType: String,

    isSeas: {
      type: Boolean,
      default: false
    },

    pool_id: [String, Number]
  },
  data() {
    return {
      loading: false,
      show: false,
      poolConfig: 1, // 1 公海规则打开  0 未打开
      fields: [],
      // 用于重置
      copyfields: [],
      search: ''
    }
  },
  computed: {
    // showFields() {
    //   if (this.search) {
    //     return this.fields.filter(item => {
    //       return item.name.indexOf(this.search) != -1
    //     })
    //   }
    //   return this.fields
    // }
  },
  watch: {
    show(val) {
      if (val) {
        this.getList()
      }
    },

    pool_id() {
      this.fields = []
    }
  },
  mounted() {},

  beforeDestroy() {},
  methods: {
    /**
     * 获取数据
     */
    getList() {
      this.loading = this.fields.length == 0
      let request = null
      const params = {}
      if (this.isSeas) {
        request = crmPoolFieldConfigIndexAPI
        params.pool_id = this.pool_id
        // params.types = crmTypeModel[this.crmType] + '_pool'
      } else {
        request = crmFieldConfigAPIIndexAPI
        params.types = crmTypeModel[this.crmType]
      }

      request(params)
        .then(res => {
          // this.poolConfig = res.data.poolConfig
          const showList = res.data.value_list.map(function(item, index) {
            item.left = ''
            item.center = ''
            item.right = ''
            item.check = true
            return item
          })
          const hideList = res.data.hide_list.map(function(item, index) {
            item.left = ''
            item.center = ''
            item.right = ''
            item.check = false
            return item
          })
          this.fields = showList.concat(hideList)
          this.copyfields = objDeepCopy(this.fields)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    /**
     * 搜索操作
     */
    searchClick() {
      this.fields = this.fields.map(item => {
        const index = item.name.indexOf(this.search)
        if (index != -1) {
          item.left = item.name.substr(0, index)
          item.center = item.name.substr(index, this.search.length)
          const rightIndex = index + this.search.length
          item.right = item.name.substr(rightIndex, item.name.length - rightIndex)
        } else {
          item.left = ''
          item.center = ''
          item.right = ''
        }
        return item
      })
    },

    /**
     * 保存更改
     */
    save() {
      const noHideIds = this.fields.filter(item => item.check)
      if (noHideIds.length < 2) {
        this.$message.error('至少要显示两列')
      } else {
        // const hideIds = this.fields.filter(item => !item.check)
        this.loading = true
        let request = null
        const params = {
          value: this.fields.filter(item => item.check),
          hide_value: this.fields.filter(item => !item.check)
        }
        if (this.isSeas) {
          request = crmPoolFieldConfigAPI
          params.pool_id = this.pool_id
          params.types = crmTypeModel[this.crmType] + '_pool'
        } else {
          request = crmFieldConfigAPI
          params.types = crmTypeModel[this.crmType]
        }

        request(params)
          .then(res => {
            this.$message.success('操作成功')
            this.show = false
            this.loading = false
            this.$emit('change')
          })
          .catch(() => {
            this.loading = false
          })
      }
    },

    /**
     * 重置
     */
    reSet() {
      this.fields = objDeepCopy(this.copyfields)
    }
  }
}
</script>

<style lang="scss" scoped>
.field-set {
  &__search {
    padding: 8px 10px 0;
  }
  &__content {
    max-height: 250px;
    min-height: 100px;
        &--item {
      cursor: move;
      padding: 5px 10px;
      font-size: 12px;
      .el-switch {
        transform: scale(0.8);
        margin-right: 3px;
        /deep/ .el-switch__core {
          width: 33px !important;
        }
      }
    }
    &--item:hover {
      background-color: #E7EDF4;
    }
  }

  &__ft {
    overflow: hidden;
    overflow-y: overlay;
    background-color: $xr--background-color-base;
    padding: 8px 0;
    margin-top: 10px;
    .el-button {
      font-size: 12px;
      float: right;
      padding: 6px 12px;
    }
  }
}

// 设置
.table-set {
  width: 15px;
  margin-top: 5px;
  cursor: pointer;
  color: #9DA9C2;
}

// 搜索到的字
.input-word {
  background-color: $xr-color-primary;
  color: white;
}

.sortable-drag {
  cursor: move;
}
.field-set__content {
  overflow: auto;
}
.field-set__content--item {
  max-width: 70%;
}
</style>
