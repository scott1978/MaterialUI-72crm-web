<template>
  <transition name="opacity-fade" @after-enter="afterEnter">
    <div
      :style="{ 'background-color': backgroundColor, 'padding': padding+' 0', 'z-index': zIndex }"
      class="c-view">
      <el-card
        v-loading="loading"
        :style="{ 'width': width,'max-width':'900px'}"
        :body-style="bodyStyle"
        class="crm-create-card-container">
        <slot name="header"/>
        <slot/>
      </el-card>
    </div>
  </transition>
</template>
<script type="text/javascript">
import { getMaxIndex } from '@/utils/index'

export default {
  name: 'CreateView', // 所有新建效果的view
  components: {},
  props: {
    bodyStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 更改背景颜色颜色
    backgroundColor: {
      type: String,
      default: '#F5F6F9' // rgba(0, 0, 0, 0.6) 黑色半透明
    },
    /** 展示内容的宽 */
    width: {
      type: String,
      default: '100%'
    },
    /** 展示内容的上下padding */
    padding: {
      type: String,
      default: '40px'
    }
  },
  data() {
    return {
      zIndex: getMaxIndex(),
      loadingObj: null
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    afterEnter() {
      this.$emit('afterEnter')
    }
  }
}
</script>
<style lang="scss" scoped>
.opacity-fade-enter-active,
.opacity-fade-leave-active {
  transition: all 0.2s;
}
.opacity-fade-enter,
.opacity-fade-leave-to {
  opacity: 0;
}
/** 容器布局 */
.c-view {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.crm-create-card-container {
  margin: 0 auto;
  height: 100%;
  /deep/ .el-card__body {
    padding: 20px 10px;
  }
}
</style>
