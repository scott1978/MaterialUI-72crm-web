<template>
  <div class="section">
    <div
      v-if="title && title.length > 0"
      class="section-header">
      <div
        :style="{ 'border-left-color': mColor }"
        class="section-mark"/>
      <div class="section-title">{{ title }}</div>
      <flexbox
        v-if="showF"
        class="f-container">
        <div
          v-for="(item, index) in fItems"
          :key="index"
          :class="{ 'f-item-select':fIndex==item.type }"
          class="f-item"
          @click="fClick(item)">{{ item.title }}</div>
      </flexbox>
    </div>
    <div
      :style="{ 'height': contentHeight }"
      class="content">
      <div
        v-if="showNoData"
        class="no-data-container">
        <img
          class="no-data"
          src="@/assets/img/no_data.png" >
        <div class="no-data-name">暂无数据</div>
      </div>
      <slot/>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'Sections',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    mColor: {
      type: String,
      default: '#2362FB'
    },
    /** 内容区域固定高度 */
    contentHeight: {
      type: String,
      default: '327px'
    },
    /** 展示客户工作台  重要提醒 时间筛选 */
    showF: {
      type: Boolean,
      default: false
    },
    fItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    /** 展示无数据 */
    showNoData: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fIndex: -1
    }
  },
  computed: {},
  mounted() {},
  methods: {
    fClick(item) {
      this.fIndex = item.type
      this.$emit('f-click', 'val')
    }
  }
}
</script>
<style lang="scss" scoped>
.section {
  position: relative;
  background-color: white;
  margin-top: 8px;
}
.section:first-child {
  margin-top: 0;
}

.section-mark {
  border-left-width: 4px;
  border-left-style: solid;
  height: 14px;
  border-radius: 2px;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 5px 15px;
}
.section-title {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-left: 8px;
  flex-shrink: 0;
}

.f-container {
  width: auto;
  margin-left: 40px;
  background-color: white;
  .f-item {
    padding: 2px 4px;
    font-size: 12px;
    margin-right: 10px;
    color: #666;
  }
  .f-item-select {
    border-radius: 2px;
    background-color: #ff6767;
    color: white;
  }
}

.content {
    .no-data-container {
    text-align: center;
    .no-data {
      margin-top: 30px;
    }
    .no-data-name {
      font-size: 12px;
      margin-top: 8px;
      color: #666;
    }
  }
}
</style>
