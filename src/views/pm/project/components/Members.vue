<template>
  <transition name="slide-fade">
    <el-card
      v-loading="loading"
      v-show="visible"
      :style="{ 'z-index': zIndex }"
      class="add-members-project-screening">
      <div class="header">
        <span class="label">成员<span class="color-a">（{{ userList.length }}）</span></span>
        <i
          class="rt el-icon-close"
          @click="close"/>
      </div>
      <div class="content">
        <members-dep
          v-if="canUpdateWork"
          :user-checked-data="userList"
          :close-dep="true"
          @popoverSubmit="userSelectChange">
          <div
            slot="membersDep"
            class="img-span">
            <el-button
              type="text"
              class="add-btn"
              icon="wk wk-add">添加成员</el-button>
          </div>
        </members-dep>
        <div
          v-for="(item, index) in userList"
          :key="index"
          class="item-list">
          <xr-avatar
            :name="item.realname"
            :size="24"
            :src="item.img || item.thumb_img"
            class="user-img" />
          <span>{{ item.realname }}
          </span>
          <el-select
            v-if="permission.manageTaskOwnerUser"
            v-model="item.group_id"
            style="width: 120px;"
            size="mini"
            @change="userAuthChange($event,item)">
            <el-option
              v-for="val in optionList"
              :key="val.id"
              :label="val.title"
              :value="val.id"/>
          </el-select>
          <i
            v-if="canUpdateWork"
            class="el-icon-close"
            @click="deleteUser(item, index)"/>
        </div>
      </div>
    </el-card>
  </transition>
</template>

<script>
// API
import {
  workWorkOwnerDelAPI,
  workWorkAddUserGroupAPI,
  workWorkGroupListAPI
} from '@/api/pm/project'
import MembersDep from '@/components/SelectEmployee/MembersDep'
import { getMaxIndex } from '@/utils/index'

export default {
  name: 'Members', // 项目成员
  components: {
    MembersDep
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    workId: [Number, String],
    list: Array,
    isOpen: [String, Number],
    permission: {
      type: Object,
      default: () => {
        return {
        }
      }
    }
  },

  data() {
    return {
      zIndex: getMaxIndex(),
      loading: false,
      userList: [],
      optionList: []
    }
  },

  computed: {
    /**
     * 可以编辑项目
     */
    canUpdateWork() {
      return this.isOpen != 1 && this.permission.setTaskOwnerUser
    }
  },

  watch: {
    visible(val) {
      if (val) {
        this.userList = this.list || []
        this.getGroupList()
      } else {
        this.$emit('close')
      }
    },

    userList() {
      this.$bus.$emit('members-update', this.userList)
    }
  },

  mounted() {
    document
      .getElementById('app')
      .addEventListener('click', this.taskShowHandle, false)
  },

  methods: {
    /**
     * 获取项目角色列表
     */
    getGroupList() {
      workWorkGroupListAPI()
        .then(res => {
          this.optionList = res.data || []
        })
        .catch(() => {})
    },
    /**
     * 编辑成员权限
     */
    userAuthChange(groupid, item) {
      for (let index = 0; index < this.userList.length; index++) {
        const element = this.userList[index]
        if (!element.group_id) {
          return
        }
      }
      this.loading = true
      workWorkAddUserGroupAPI({
        owner_user_id: item.id,
        group_id: groupid,
        work_id: this.workId
      })
        .then(res => {
          this.loading = false
          this.$message.success('操作成功')
          this.$emit('handle', 'member', this.userList)
        })
        .catch(() => {
          this.loading = false
        })
    },


    /**
     * 编辑成员
     */
    userSelectChange(members, dep) {
      this.loading = true
      workWorkAddUserGroupAPI({
        work_id: this.workId,
        owner_user_id: members.map(item => item.id)
      })
        .then(res => {
          this.loading = false
          this.userList = res.data || []
          this.$emit('handle', 'member', this.userList)
          this.$message.success('添加成功')
        })
        .catch(() => {
          this.loading = false
        })
    },

    /**
     * 删除员工
     */
    deleteUser(val, index) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          workWorkOwnerDelAPI({
            work_id: this.workId,
            owner_user_id: val.id
          }).then(res => {
            this.userList.splice(index, 1)
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    /**
     * 关闭
     */
    close() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },

    /**
     * 点击空白处关闭详情
     */
    taskShowHandle(e) {
      if (this.visible && !this.$el.contains(e.target)) {
        this.close()
      }
    }
  }
}
</script>


<style scoped lang="scss">
.add-members-project-screening /deep/ .el-card__body {
  padding: 0;
}
.add-members-project-screening {
  position: fixed;
  top: 60px;
  bottom: 0;
  right: 0;
  width: 300px;
    .header {
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 10px;
    padding: 16px;
    .label {
      font-size: 16px;
      margin-right: 10px;
    }
    .el-icon-close {
      color: #ccc;
      font-size: 18px;
      margin-right: 0;
      cursor: pointer;
    }
    .color-a {
      color: #aaa;
      margin-left: 5px;
      font-size: 13px;
    }
  }
  .content {
    font-size: 13px;
    padding: 16px;
    .item-list {
      position: relative;
      height: 36px;
      padding: 7px 5px;
      margin: 5px 0;
      .el-icon-close {
        font-size: 14px;
        color: #ccc;
        position: absolute;
        top: 11px;
        right: 8px;
        opacity: 0;
      }
      .user-img {
        vertical-align: middle;
        margin-right: 5px;
      }
    }
    .item-list:hover {
      background: #f7f8fa;
      cursor: pointer;
      .el-icon-close {
        opacity: 1;
      }
    }
  }
}

// 添加员工
.img-span {
  margin-bottom: 20px;
  .add-btn {
    vertical-align: middle;
    /deep/ i {
      margin-right: 5px;
    }
  }
}
</style>
