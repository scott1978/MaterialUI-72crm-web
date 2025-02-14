<template>
  <div id="app">
    <router-view class="router-view" />
    <vue-picture-viewer
      v-if="showPreviewImg"
      :img-data="previewImgs"
      :select-index="previewIndex"
      @close-viewer="showPreviewImg=false"/>
    <xr-import
      v-if="showFixImport"
      :process-status="crmImportStatus"
      @click.native="fixImportClick"/>
    <c-r-m-import
      :show.sync="showCRMImport"
      :crm-type="crmType"
      :props="crmProps"
      :cache-show.sync="cacheShow"
      :cache-done="cacheDone"
      @status="crmImportChange"
      @close="crmImportClose"/>
    <xr-upgrade-dialog v-if="upgradeDialogShow" :visible.sync="upgradeDialogShow" />
  </div>
</template>

<script>
/** 常用图片预览创建组件 */
import VuePictureViewer from '@/components/VuePictureViewer/index'
import XrImport from '@/components/XrImport'
import XrImportMixins from '@/components/XrImport/XrImportMixins'
import XrUpgradeDialog from '@/components/XrUpgradeDialog'
import CRMImport from '@/components/CRMImport'
import { mapGetters } from 'vuex'
import cache from '@/utils/cache'


export default {
  name: 'App',
  components: {
    VuePictureViewer,
    XrImport,
    CRMImport,
    XrUpgradeDialog
  },
  mixins: [XrImportMixins],
  data() {
    return {
      showPreviewImg: false,
      previewIndex: 0,
      previewImgs: [],
      upgradeDialogShow: false
    }
  },
  computed: {
    ...mapGetters(['activeIndex', 'addRouters', 'userInfo'])
  },
  watch: {
    $route(to, from) {
      this.showPreviewImg = false // 切换页面隐藏图片预览
    },
    addRouters() {
      if (this.userInfo && this.userInfo.is_read_notice != 1) {
        setTimeout(() => {
          this.upgradeDialogShow = true
        }, 5000)
      }
    }
  },
  mounted() {
    this.addBus()
    this.addDocumentVisibilityChange()
  },
  methods: {
    addDocumentVisibilityChange() {
      // 网页当前状态判断
      // hidden,
      var state, visibilityChange
      if (typeof document.hidden !== 'undefined') {
        // hidden = 'hidden'
        visibilityChange = 'visibilitychange'
        state = 'visibilityState'
      } else if (typeof document.mozHidden !== 'undefined') {
        // hidden = 'mozHidden'
        visibilityChange = 'mozvisibilitychange'
        state = 'mozVisibilityState'
      } else if (typeof document.msHidden !== 'undefined') {
        // hidden = 'msHidden'
        visibilityChange = 'msvisibilitychange'
        state = 'msVisibilityState'
      } else if (typeof document.webkitHidden !== 'undefined') {
        // hidden = 'webkitHidden'
        visibilityChange = 'webkitvisibilitychange'
        state = 'webkitVisibilityState'
      }
      // 添加监听器，在title里显示状态变化
      document.addEventListener(visibilityChange, () => {
        if (document[state] == 'visible') {
          cache.updateAxiosHeaders()
        }
        this.$bus.emit('document-visibility', document[state])
      }, false)
    },

    addBus() {
      var self = this
      this.$bus.on('preview-image-bus', function(data) {
        self.previewIndex = data.index
        self.previewImgs = data.data
        self.showPreviewImg = true
      })
    }
  }
}
</script>

<style>
#app {
  display: flex;
  position: relative;
  min-height: 100vh;
}
</style>
