(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-385f"],{"+l4B":function(e,t,i){"use strict";var n=i("vb9J");i.n(n).a},"/uOC":function(e,t,i){"use strict";var n=i("BgVJ");i.n(n).a},A9HQ:function(e,t,i){},BgVJ:function(e,t,i){},M1nL:function(e,t,i){"use strict";i.r(t);var n=i("QbLZ"),l=i.n(n),a=i("KTTK"),o=i("jVVe"),s={name:"RelateEmpoyee",components:{XhUserCell:i("8GhS").p},mixins:[],props:{visible:{type:Boolean,required:!0,default:!1},roleId:[Number,String]},data:function(){return{loading:!0,selectUsers:[]}},computed:{},watch:{visible:function(e){e&&(this.selectUsers=[])}},mounted:function(){},methods:{handleCancel:function(){this.$emit("update:visible",!1)},changeCheckout:function(e){this.selectUsers=e.value},handleConfirm:function(){var e=this;0==this.selectUsers.length?this.$message.error("请选择员工"):Object(o.c)({users:this.selectUsers.map(function(e){return e.id}),groups:[this.roleId]}).then(function(t){e.$message.success("操作成功"),e.$emit("save")}).catch(function(){})}}},r=(i("hrDL"),i("KHd+")),c=Object(r.a)(s,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{visible:e.visible,"append-to-body":!0,"close-on-click-modal":!1,title:"关联员工",width:"600px"},on:{close:e.handleCancel}},[i("div",{staticClass:"handle-box"},[i("flexbox",{staticClass:"handle-item",attrs:{align:"stretch"}},[i("div",{staticClass:"handle-item-name",staticStyle:{"margin-top":"8px"}},[e._v("选择员工：")]),e._v(" "),i("xh-user-cell",{staticClass:"handle-item-content",attrs:{radio:!1,value:e.selectUsers},on:{"value-change":e.changeCheckout}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{nativeOn:{click:function(t){return e.handleCancel(t)}}},[e._v("取消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.handleConfirm(t)}}},[e._v("保存")])],1)])},[],!1,null,"382714aa",null);c.options.__file="RelateEmpoyee.vue";var d=c.exports,u=i("ZoMv"),h={name:"FieldSetDialog",components:{},mixins:[],props:{label:[String,Number],roleId:[String,Number],visible:{type:Boolean,required:!0,default:!1}},data:function(){return{loading:!1,list:[],grant_id:""}},computed:{title:function(){return u.a.convertTypeToName(this.label)+"字段授权"}},watch:{visible:{handler:function(){this.visible&&this.getFieldList()},immediate:!0}},mounted:function(){},methods:{getFieldList:function(){var e=this;this.list=[],this.loading=!0,Object(o.i)({label:this.label,role_id:this.roleId,module:"crm",column:u.a.typeToKeyData[this.label]}).then(function(t){e.loading=!1;var i=t.data.content||[];e.grant_id=t.data.grant_id,i.forEach(function(e){e.canCheck=1==e.read,e.canEdit=1==e.write}),e.list=t.data.content||[]}).catch(function(){e.loading=!1})},handleCancel:function(){this.$emit("update:visible",!1)},getCanOpreateRead:function(e){return 1==e||2==e},getCanOpreateEdit:function(e){return 1==e||3==e},handleConfirm:function(){var e=this;this.loading=!0,this.list.forEach(function(e){e.canCheck?e.read=1:e.read=0,e.canEdit?e.write=1:e.write=0}),this.list.forEach(function(e){e.hasOwnProperty("acuthLevel")&&delete e.acuthLevel,e.hasOwnProperty("canCheck")&&delete e.canCheck,e.hasOwnProperty("canEdit")&&delete e.canEdit}),Object(o.j)({grant_id:this.grant_id,content:this.list}).then(function(t){e.loading=!1,e.$message.success("操作成功"),e.handleCancel()}).catch(function(){e.loading=!1})},editCheckboxChange:function(e){e.canEdit&&this.$set(e,"canCheck",!0)},checkCheckboxChange:function(e){!e.canCheck&&e.canEdit&&this.$set(e,"canEdit",!1)}}},g=(i("wRx7"),Object(r.a)(h,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{attrs:{visible:e.visible,"append-to-body":!0,"close-on-click-modal":!1,title:e.title,width:"700px"},on:{close:e.handleCancel}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"field-set-dialog"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,height:"50vh",border:""}},[i("el-table-column",{attrs:{label:"字段名称",prop:"name"}}),e._v(" "),i("el-table-column",{attrs:{label:"初步权限"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-checkbox",{attrs:{disabled:!e.getCanOpreateRead(t.row.read_operation)},on:{change:function(i){e.checkCheckboxChange(t.row)}},model:{value:t.row.canCheck,callback:function(i){e.$set(t.row,"canCheck",i)},expression:"scope.row.canCheck"}},[e._v("可以查看")]),e._v(" "),i("el-checkbox",{attrs:{disabled:!e.getCanOpreateEdit(t.row.write_operation)},on:{change:function(i){e.editCheckboxChange(t.row)}},model:{value:t.row.canEdit,callback:function(i){e.$set(t.row,"canEdit",i)},expression:"scope.row.canEdit"}},[e._v("可以修改")])]}}])})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticStyle:{float:"left"},attrs:{type:"text"},on:{click:e.getFieldList}},[e._v("重置")]),e._v(" "),i("el-button",{on:{click:e.handleCancel}},[e._v("取消")]),e._v(" "),i("el-button",{directives:[{name:"debounce",rawName:"v-debounce",value:e.handleConfirm,expression:"handleConfirm"}],attrs:{type:"primary"}},[e._v("保存")])],1)])},[],!1,null,"1c67a498",null));g.options.__file="FieldSetDialog.vue";var v=g.exports,f=i("jzeO"),p=i("9GgJ"),m=i("Tdi9"),b=i("YSp2"),k=i("nboU"),_=i("7Qib"),C={name:"RoleRangeSetDialog",components:{},mixins:[k.a],props:{id:[String,Number],visible:{type:Boolean,required:!0,default:!1}},data:function(){return{loading:!1,allChecked:!1,treeList:[],checkList:[],allIds:[],defaultProps:{children:"pid",label:"title"}}},computed:{title:function(){return"配置查看范围"}},mounted:function(){this.getRoleList()},methods:{getRoleRangeValue:function(){var e=this;this.loading=!0,Object(b.b)({group_id:this.id}).then(function(t){e.checkList=t.data||[],e.groupChange(),e.loading=!1}).catch(function(){e.loading=!1})},getRoleList:function(){var e=this;this.loading=!0,Object(b.a)().then(function(t){e.loading=!1;var i=t.data||[],n=[];i.forEach(function(e){e.item.forEach(function(e){n.push(e.id)})}),e.allIds=n,e.treeList=i,e.getRoleRangeValue()}).catch(function(){e.loading=!1})},handleCancel:function(){this.$emit("update:visible",!1)},allChange:function(){this.allChecked?this.checkList.length!==this.allIds.length&&(this.checkList=Object(_.t)(this.allIds)):this.checkList.length===this.allIds.length&&(this.checkList=[])},groupChange:function(){this.checkList.length===this.allIds.length?this.allChecked||(this.allChecked=!0):this.allChecked&&(this.allChecked=!1)},handleConfirm:function(){var e=this;this.loading=!0,Object(b.c)({group_id:this.id,auth_group_id:this.checkList}).then(function(t){e.loading=!1,e.$message.success("操作成功"),e.handleCancel()}).catch(function(){e.loading=!1})}}},w=(i("+l4B"),Object(r.a)(C,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{ref:"wkDialog",attrs:{visible:e.visible,"append-to-body":!0,"close-on-click-modal":!1,title:e.title,width:"700px"},on:{close:e.handleCancel}},[i("el-checkbox",{staticClass:"el-bold-checkbox",on:{change:e.allChange},model:{value:e.allChecked,callback:function(t){e.allChecked=t},expression:"allChecked"}},[e._v("全选")]),e._v(" "),i("el-checkbox-group",{on:{change:e.groupChange},model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},e._l(e.treeList,function(t,n){return i("div",{key:n,staticClass:"role-set-section"},[i("div",{staticClass:"role-set-section__title"},[e._v(e._s(t.name))]),e._v(" "),i("div",{staticClass:"role-set-section__list"},e._l(t.item,function(t,n){return i("el-checkbox",{key:n,attrs:{label:t.id}},[e._v(e._s(t.title))])}))])})),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.handleCancel}},[e._v("取消")]),e._v(" "),i("el-button",{directives:[{name:"debounce",rawName:"v-debounce",value:e.handleConfirm,expression:"handleConfirm"}],attrs:{type:"primary"}},[e._v("保存")])],1)],1)},[],!1,null,"1be2a692",null));w.options.__file="RoleRangeSetDialog.vue";var y=w.exports,R=i("L2JU"),L={components:{RelateEmpoyee:d,FieldSetDialog:v,Reminder:f.a,XrHeader:p.a,EditRoleDialog:m.a,RoleRangeSetDialog:y},data:function(){return{pid:"",title:"",searchInput:"",tableData:[],tableHeight:document.documentElement.clientHeight-305,treeHeight:document.documentElement.clientHeight-230,currentPage:1,pageSize:15,pageSizes:[15,30,45,60],total:0,tableList:[{label:"姓名",field:"realname"},{label:"部门",field:"s_name"},{label:"职位",field:"post"},{label:"角色",field:"groups"}],newRoleVisible:!1,role:{},roleList:[],mainMenuIndex:"user",ruleMenuIndex:"data",ruleMenuList:[],defaultProps:{children:"children",label:"title"},relateEmpoyeeShow:!1,roleActive:null,dropdownHandleRole:null,roleTitle:"",roleMenuLoading:!1,ruleLoading:!1,userLoading:!1,setFieldLabel:"",setFieldShow:!1,selectionList:[],editRoleType:"",editRoleDialogShow:!1,setRoleRangeShow:!1}},computed:l()({},Object(R.mapGetters)(["userInfo"]),{id:function(){return this.roleActive?this.roleActive.id:""},showRuleSet:function(){return!!this.roleActive&&("超级管理员角色"!=this.roleActive.remark&&"项目管理员"!=this.roleActive.remark)},showReminder:function(){return!!this.roleActive&&"项目管理员"==this.roleActive.remark}}),watch:{},mounted:function(){var e=this;window.onresize=function(){e.tableHeight=document.documentElement.clientHeight-305,e.treeHeight=document.documentElement.clientHeight-230},this.pid=this.$route.params.pid,this.title=this.$route.params.title,this.getRulesList(),this.getRoleList()},beforeRouteUpdate:function(e,t,i){this.pid=e.params.pid,this.title=e.params.title,this.roleActive=null,this.roleList=[],this.mainMenuIndex="user",this.currentPage=1,this.total=0,this.tableData=[],this.$refs.xrHeader&&(this.$refs.xrHeader.search="",this.searchInput=""),this.getRulesList(),this.getRoleList(),i()},methods:{getRulesList:function(){var e=this;Object(o.k)({pid:this.pid,type:"tree"}).then(function(t){t.data?(e.ruleMenuList=[{label:"模块功能",index:"data",type:"tree",value:[],data:[t.data[0]]}],t.data[1]&&e.ruleMenuList.push({label:"数据分析",index:"bi",type:"tree",value:[],data:[t.data[1]]})):e.ruleMenuList=[],e.getRoleRulesInfo()})},getRoleList:function(){var e=this;this.roleMenuLoading=!0,Object(o.h)({pid:this.pid,rules:1}).then(function(t){e.roleList=t.data;var i=!1;if(e.roleActive)for(var n=0;n<e.roleList.length;n++){var l=e.roleList[n];if(l.id==e.roleActive.id){e.roleActive=l,e.getRoleRulesInfo(),i=!0;break}}!i&&e.roleList.length&&(e.roleActive=e.roleList[0],e.getRoleRulesInfo()),e.refreshUserList(),e.roleMenuLoading=!1}).catch(function(){e.roleMenuLoading=!1})},addEmployees:function(){this.relateEmpoyeeShow=!0},employeesSave:function(e){this.relateEmpoyeeShow=!1,this.getUserList()},employeeHandleClick:function(e,t){var i=this;"delete"===e?this.$confirm("此操作将永久删除是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.userLoading=!0,Object(o.l)({user_id:t.id,group_id:i.roleActive.id}).then(function(e){i.userLoading=!1,i.getUserList(),i.$message.success("删除成功")}).catch(function(){i.userLoading=!1})}).catch(function(){i.$message({type:"info",message:"已取消删除"})}):"editRole"!==e&&"copyRole"!==e||(this.selectionList=[t],this.editRoleType=e,this.editRoleDialogShow=!0)},newRoleClose:function(){this.newRoleVisible=!1},newRoleBtn:function(){this.roleTitle="新建角色",this.newRoleVisible=!0,this.role={}},roleDropdownClick:function(e){this.dropdownHandleRole=e},roleHandleClick:function(e){"edit"==e?this.roleEditBtn(this.dropdownHandleRole):"copy"==e?this.ticketsBtn(this.dropdownHandleRole):"delete"==e&&this.roleDelect(this.dropdownHandleRole)},getReminderContent:function(){return this.roleActive&&"项目管理员"==this.roleActive.remark?"项目管理员拥有“项目管理”模块所有权限，能看到并维护所有项目信息":""},roleEditBtn:function(e){this.roleTitle="编辑角色",this.role={title:e.remark,pid:e.roleType,id:e.id},this.newRoleVisible=!0},ticketsBtn:function(e){var t=this;this.$confirm("确定此操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.e)({id:e.id}).then(function(e){t.$message.success("复制成功"),t.getRoleList()})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},roleDelect:function(e){var t=this;this.$confirm("此操作将永久删除是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.f)({id:e.id}).then(function(e){t.roleList.length&&(t.roleActive=t.roleList[0],t.getRoleRulesInfo()),t.getRoleList(),t.$message.success("删除成功")})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},newRoleSubmit:function(){var e=this;this.role.title?"新建角色"==this.roleTitle?Object(o.d)({title:this.role.title,pid:this.pid}).then(function(t){e.getRoleList(),e.$message.success("添加成功"),e.newRoleClose()}):Object(o.g)({title:this.role.title,pid:this.role.pid,id:this.role.id}).then(function(t){e.getRoleList(),e.$message.success("编辑成功"),e.newRoleClose()}):this.$message.error("角色名称不能为空")},roleMenuSelect:function(e){this.roleActive=e,"rule"!=this.mainMenuIndex||this.showRuleSet||(this.mainMenuIndex="user"),this.getRoleRulesInfo(),this.refreshUserList()},getRoleRulesInfo:function(){var e=this;if(this.roleActive&&this.ruleMenuList.length){if(2==this.pid||10==this.pid)"data"!=this.ruleMenuList[this.ruleMenuList.length-1].type&&this.ruleMenuList.push({label:"数据权限",index:"info",type:"data",value:this.roleActive.type});for(var t=function(t){var i=e.ruleMenuList[t];"tree"==i.type?(i.rules=e.getRoleRules(e.roleActive.rules[i.index],i.data[0]),e.$nextTick(function(){var t=e.$refs["tree"+i.index];t&&("[object Array]"==Object.prototype.toString.call(t)?t.length&&t[0].setCheckedKeys(i.rules):t.setCheckedKeys(i.rules))})):i.value=e.roleActive.type},i=0;i<this.ruleMenuList.length;i++)t(i)}},getRoleRules:function(e,t){e||(e=[]);for(var i=!1,n=this.copyItem(e),l=0;l<t.children.length;l++){var a=t.children[l];if(!a.hasOwnProperty("children"))return a.length+1!=n.length&&this.removeItem(n,t.id),n;for(var o=0;o<e.length;o++){for(var s=e[o],r=[],c=0;c<a.children.length;c++){var d=a.children[c];d.id==s&&r.push(d)}r.length!=a.children.length&&(i=!0,this.removeItem(n,a.id))}}i&&this.removeItem(n,t.id);for(var u=[],h=0;h<n.length;h++){var g=n[h];g&&u.push(parseInt(g))}return u},copyItem:function(e){for(var t=[],i=0;i<e.length;i++)t.push(e[i]);return t},removeItem:function(e,t){for(var i=-1,n=0;n<e.length;n++)if(t==e[n]){i=n;break}i>0&&e.splice(i,1)},containItem:function(e,t){for(var i=0;i<e.length;i++)if(t==e[i])return!0;return!1},headerSearch:function(e){this.searchInput=e,this.refreshUserList()},refreshUserList:function(){this.currentPage=1,this.getUserList()},getUserList:function(){var e=this;this.roleActive&&(this.userLoading=!0,Object(a.z)({page:this.currentPage,limit:this.pageSize,group_id:this.roleActive.id,search:this.searchInput}).then(function(t){e.tableData=t.data.list,e.total=t.data.dataCount,e.userLoading=!1}).catch(function(){e.userLoading=!1}))},handleSizeChange:function(e){this.pageSize=e,this.refreshUserList()},handleCurrentChange:function(e){this.currentPage=e,this.getUserList()},ruleSubmit:function(){var e=this;this.ruleLoading=!0;for(var t=[],i="",n=0;n<this.ruleMenuList.length;n++){var l=this.ruleMenuList[n];if("tree"==l.type){var a=this.$refs["tree"+l.index];a&&(t="[object Array]"==Object.prototype.toString.call(a)?t.concat(a[0].getCheckedKeys()):t.concat(a.getCheckedKeys()))}else i=l.value}Object(o.m)({rules:t,type:i,id:this.roleActive.id,remark:this.roleActive.remark}).then(function(t){e.getRoleList(),e.$message.success("编辑成功"),e.ruleLoading=!1}).catch(function(){e.ruleLoading=!1})},canSetField:function(e,t){return 10!=this.pid&&(["leads","customer","contacts","business","contract","receivables","product","visit","invoice"].includes(e)&&"data"===this.ruleMenuIndex)},fieldSetClick:function(e){this.setFieldLabel=u.a.keyToTypeData[e.data.name],this.setFieldShow=!0},checkRangeSetClick:function(e){this.setRoleRangeShow=!0}}},x=(i("/uOC"),Object(r.a)(L,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"role-authorization"},[i("xr-header",{ref:"xrHeader",attrs:{"show-search":"",label:"角色权限控制","icon-class":"wk wk-user","icon-color":"#19B5F6"},on:{search:e.headerSearch}}),e._v(" "),i("div",{staticClass:"role-box"},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.roleMenuLoading,expression:"roleMenuLoading"}],staticClass:"nav"},[i("div",{staticClass:"nav__hd"},[e._v("\n        "+e._s(e.title)+"\n        "),i("el-button",{staticClass:"add-btn",attrs:{type:"text",icon:"el-icon-circle-plus"},on:{click:e.newRoleBtn}},[e._v("创建角色")])],1),e._v(" "),i("div",{staticClass:"role-nav-box"},e._l(e.roleList,function(t,n){return i("div",{key:n,staticClass:"menu-item",class:{"is-select":t.id==e.roleActive.id},on:{click:function(i){e.roleMenuSelect(t)}}},[e._v("\n          "+e._s(t.title)+"\n          "),"超级管理员角色"!=t.remark&&"项目管理员"!=t.remark?i("div",{staticClass:"icon-close"},[i("el-dropdown",{attrs:{trigger:"click"},on:{command:e.roleHandleClick}},[i("i",{staticClass:"el-icon-arrow-down",on:{click:function(i){e.roleDropdownClick(t)}}}),e._v(" "),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{attrs:{command:"copy"}},[e._v("复制")]),e._v(" "),i("el-dropdown-item",{attrs:{command:"edit"}},[e._v("编辑")]),e._v(" "),i("el-dropdown-item",{attrs:{command:"delete"}},[e._v("删除")])],1)],1)],1):e._e()])}))]),e._v(" "),i("el-dialog",{attrs:{title:e.roleTitle,visible:e.newRoleVisible,"before-close":e.newRoleClose,"close-on-click-modal":!1,width:"30%"},on:{"update:visible":function(t){e.newRoleVisible=t}}},[i("label",{staticClass:"label-title"},[e._v("角色名称")]),e._v(" "),i("el-input",{staticClass:"input-role",attrs:{maxlength:100},model:{value:e.role.title,callback:function(t){e.$set(e.role,"title",t)},expression:"role.title"}}),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:e.newRoleSubmit}},[e._v("确 定")]),e._v(" "),i("el-button",{on:{click:e.newRoleClose}},[e._v("取 消")])],1)],1),e._v(" "),i("div",{staticClass:"content-box"},[i("el-tabs",{model:{value:e.mainMenuIndex,callback:function(t){e.mainMenuIndex=t},expression:"mainMenuIndex"}},[i("el-tab-pane",{attrs:{label:"角色员工",name:"user"}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.userLoading,expression:"userLoading"}],staticClass:"content-table"},[i("flexbox",{staticClass:"content-table-header"},[i("div",{staticClass:"content-table-header-reminder"},[e.showReminder?i("reminder",{attrs:{content:e.getReminderContent()}}):e._e()],1),e._v(" "),i("el-button",{staticClass:"xr-btn--orange",attrs:{size:"medium",type:"primary"},on:{click:e.addEmployees}},[e._v(" 关联员工 ")])],1),e._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,height:e.tableHeight}},[e._l(e.tableList,function(e,t){return i("el-table-column",{key:t,attrs:{prop:e.field,label:e.label,"show-overflow-tooltip":""}})}),e._v(" "),i("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("i",{staticClass:"wk wk-edit content-table-span",attrs:{title:"编辑角色"},on:{click:function(i){e.employeeHandleClick("editRole",t.row)}}}),e._v(" "),i("i",{staticClass:"wk wk-icon-double-note content-table-span",attrs:{title:"复制角色"},on:{click:function(i){e.employeeHandleClick("copyRole",t.row)}}}),e._v(" "),i("i",{staticClass:"wk wk-delete content-table-span",attrs:{title:"删除"},on:{click:function(i){e.employeeHandleClick("delete",t.row)}}})]}}])})],2),e._v(" "),i("div",{staticClass:"p-contianer"},[i("el-pagination",{staticClass:"p-bar",attrs:{"current-page":e.currentPage,"page-sizes":e.pageSizes,"page-size":e.pageSize,total:e.total,background:"",layout:"prev, pager, next, sizes, total, jumper"},on:{"update:pageSize":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)]),e._v(" "),e.roleActive&&e.showRuleSet?i("el-tab-pane",{attrs:{label:"角色权限",name:"rule"}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.ruleLoading,expression:"ruleLoading"}],staticClass:"jurisdiction-box"},[e.roleActive?i("el-button",{staticClass:"jurisdiction-edit",attrs:{size:"medium",type:"primary"},on:{click:e.ruleSubmit}},[e._v(" 保存 ")]):e._e(),e._v(" "),i("el-tabs",{model:{value:e.ruleMenuIndex,callback:function(t){e.ruleMenuIndex=t},expression:"ruleMenuIndex"}},e._l(e.ruleMenuList,function(t,n){return i("el-tab-pane",{key:n,attrs:{label:t.label,name:t.index}},["tree"==t.type?i("div",{staticClass:"jurisdiction-content",style:{height:e.treeHeight+"px"}},[i("div",{staticClass:"jurisdiction-content-checkbox"},[i("el-tree",{ref:"tree"+t.index,refInFor:!0,staticStyle:{height:"0"},attrs:{data:t.data,indent:0,"expand-on-click-node":!1,props:e.defaultProps,"show-checkbox":"","node-key":"id","empty-text":"","default-expand-all":""},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.node;return i("span",{class:{"node-label":1==n.level||2==n.level,"common-node-label":n.data.id===e.userInfo.rule_authority_id}},[e._v(e._s(n.label)),2==n.level&&e.canSetField(n.data.name)&&"公海管理"!=n.data.title?i("el-button",{attrs:{icon:"wk wk-manage",type:"text"},on:{click:function(t){e.fieldSetClick(n)}}},[e._v("字段授权")]):n.data.id===e.userInfo.rule_authority_id?i("el-button",{attrs:{icon:"wk wk-manage",type:"text"},on:{click:function(t){e.checkRangeSetClick(n)}}},[e._v("配置查看范围")]):e._e()],1)}}])})],1)]):i("div",{staticClass:"jurisdiction-content"},[i("div",{staticClass:"data-radio"},[i("el-radio-group",{model:{value:t.value,callback:function(i){e.$set(t,"value",i)},expression:"item.value"}},[i("el-radio",{attrs:{label:1}},[e._v("本人")]),e._v(" "),i("el-radio",{attrs:{label:2}},[e._v("本人及下属")]),e._v(" "),i("el-radio",{attrs:{label:3}},[e._v("本部门")]),e._v(" "),i("el-radio",{attrs:{label:4}},[e._v("本部门及下属部门")]),e._v(" "),i("el-radio",{attrs:{label:5}},[e._v("全部")])],1)],1)])])}))],1)]):e._e()],1)],1)],1),e._v(" "),i("relate-empoyee",{attrs:{visible:e.relateEmpoyeeShow,"role-id":e.id},on:{"update:visible":function(t){e.relateEmpoyeeShow=t},save:e.employeesSave}}),e._v(" "),i("field-set-dialog",{attrs:{visible:e.setFieldShow,"role-id":e.id,label:e.setFieldLabel},on:{"update:visible":function(t){e.setFieldShow=t}}}),e._v(" "),e.editRoleDialogShow?i("edit-role-dialog",{attrs:{"user-show":"copyRole"===e.editRoleType,"selection-list":e.selectionList,visible:e.editRoleDialogShow},on:{"update:visible":function(t){e.editRoleDialogShow=t},change:e.getUserList}}):e._e(),e._v(" "),e.setRoleRangeShow?i("role-range-set-dialog",{attrs:{visible:e.setRoleRangeShow,id:e.id},on:{"update:visible":function(t){e.setRoleRangeShow=t}}}):e._e()],1)},[],!1,null,"7025f9a3",null));x.options.__file="index.vue";t.default=x.exports},hrDL:function(e,t,i){"use strict";var n=i("A9HQ");i.n(n).a},pMoW:function(e,t,i){},vb9J:function(e,t,i){},wRx7:function(e,t,i){"use strict";var n=i("pMoW");i.n(n).a}}]);