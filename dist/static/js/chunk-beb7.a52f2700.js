(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-beb7"],{"31UX":function(e,t,s){"use strict";var a=s("QbLZ"),i=s.n(a),n=s("4d7F"),l=s.n(n),o=s("CMIa"),u=s("ehos"),r=s("7Qib");t.a={data:function(){return{chartObj:null,chartOtherObj:null,chartColors:["#6CA2FF","#6AC9D7","#72DCA2","#48E78D","#FECD51","#DBB375","#FF7474","#F59561","#A3AEBC","#4C84FF","#0DBEB4","#00DEDE","#FFAA00","#C7C116","#F7A57C","#F661AC","#8652EE"],chartXAxisStyle:{axisTick:{alignWithLabel:!0,lineStyle:{width:0}},axisLabel:{color:"#333"},axisLine:{lineStyle:{color:"#333"}},splitLine:{show:!1}},chartYAxisStyle:{axisTick:{alignWithLabel:!0,lineStyle:{width:0}},axisLabel:{color:"#333"},axisLine:{lineStyle:{color:"#333"}},splitLine:{show:!1}},currentPage:1,pageSizes:[15,30,45,60],pageSize:0,total:0,toolbox:{showTitle:!1,feature:{saveAsImage:{show:!0,pixelRatio:2}}}}},components:{FiltrateHandleView:o.a},props:{},computed:{},watch:{},mounted:function(){var e=this;this.debouncedResize=Object(u.debounce)(300,this.resizeFn),this.$nextTick(function(){window.addEventListener("resize",e.debouncedResize)})},beforeDestroy:function(){window.removeEventListener("resize",this.debouncedResize)},methods:{resizeFn:function(){this.chartObj&&this.chartObj.resize(),this.chartOtherObj&&this.chartOtherObj.resize()},handleSizeChange:function(e){this.pageData.limit=e,this.getList(this.pageData)},handleCurrentChange:function(e){this.pageData.page=e,this.getList(this.pageData)},requestExportInfo:function(e,t,s){return new l.a(function(a,n){e(i()({},t,{excel_types:s,excel_type:1})).then(function(e){Object(r.c)(e),a&&a(e)}).catch(function(e){n&&n(e)})})}},deactivated:function(){}}},"74lk":function(e,t,s){"use strict";s.d(t,"a",function(){return i}),s.d(t,"b",function(){return n}),s.d(t,"d",function(){return l}),s.d(t,"e",function(){return o}),s.d(t,"c",function(){return u});var a=s("t3Un");function i(e){return Object(a.a)({url:"bi/achievement/statistics",method:"post",data:e})}function n(e){return Object(a.a)({url:"bi/achievement/excelExport",method:"post",data:e,responseType:"blob"})}function l(e){return Object(a.a)({url:"bi/product/statistics",method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}function o(e){return Object(a.a)({url:"bi/product/excelExport",method:"post",data:e,responseType:"blob",headers:{"Content-Type":"application/json;charset=UTF-8"}})}function u(e){return Object(a.a)({url:"bi/business/funnel",method:"post",data:e,headers:{"Content-Type":"application/json;charset=UTF-8"}})}},"9kPm":function(e,t,s){"use strict";t.a={data:function(){return{showTable:!0}},methods:{mixinSortFn:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"ascending";if("[object Array]"!==Object.prototype.toString.call(e))return[];if(!t)return e;e.sort(function(e,a){if(e[t]===a[t])return 0;var i=isNaN(Number(e[t]))||isNaN(Number(a[t]))?e[t]<a[t]:Number(e[t])<Number(a[t]);return"descending"===s?i?1:-1:i?-1:1})}}}},CMIa:function(e,t,s){"use strict";var a=s("QbLZ"),i=s.n(a),n=s("KTTK"),l=s("ERJp"),o=s("6iAj"),u=s("UCfG"),r=s("HHBN"),c=s("ZX9L"),h=s("wy2R"),p=s.n(h),d=s("L2JU"),f={name:"FiltrateHandleView",components:{TimeTypeSelect:c.a,XhStructureCell:u.a,XhUserCell:r.a},props:{moduleType:{type:String},title:{type:String,default:""},showFilterView:{default:!0,type:Boolean},showYearSelect:{default:!1,type:Boolean},showBusinessSelect:{default:!1,type:Boolean},showUserSelect:{default:!0,type:Boolean},showCustomSelect:{default:!1,type:Boolean},customDefault:"",customOptions:{default:function(){return[]},type:Array},showProductSelect:{default:!1,type:Boolean}},data:function(){return{pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()}},yearValue:"",timeTypeValue:{},dataSelect:1,structuresSelectValue:[],userSelectValue:[],businessOptions:[],businessStatusValue:"",productValue:[],productOptions:[],customValue:""}},computed:i()({},Object(d.mapGetters)(["userInfo"]),{showUserStrucSelect:function(){return this.showUserSelect}}),watch:{},mounted:function(){var e=this;this.showCustomSelect&&(this.customValue=this.customDefault),this.showYearSelect&&(this.yearValue=p()(new Date).year().toString()),this.$emit("load"),this.showBusinessSelect?this.getBusinessStatusList(function(){e.postFiltrateValue()}):this.postFiltrateValue(),this.showProductSelect&&this.getProductCategoryIndex()},beforeDestroy:function(){},methods:{structureChange:function(e){this.structuresSelectValue=e.value||[]},userChange:function(e){this.userSelectValue=e.value||[]},customSelectChange:function(){this.$emit("typeChange",this.customValue)},timeTypeChange:function(e){this.timeTypeValue=e},structuresValueChange:function(e){this.showUserSelect&&(this.userSelectValue="",this.userOptions=[],this.getUserList())},getUserList:function(){var e=this,t={};t.structure_id=this.structuresSelectValue,Object(n.n)(t).then(function(t){e.userOptions=t.data}).catch(function(){e.$emit("error")})},getBusinessStatusList:function(e){var t=this;Object(l.q)().then(function(s){var a=s.data||[];t.businessOptions=a.filter(function(e){return 1===e.status}),t.businessOptions.length>0&&(t.businessStatusValue=t.businessOptions[0].type_id),e(!0)}).catch(function(){t.$emit("error")})},getProductCategoryIndex:function(){var e=this;Object(o.K)({type:"tree"}).then(function(t){e.productOptions=t.data}).catch(function(){})},postFiltrateValue:function(){var e={};this.showUserStrucSelect?1==this.dataSelect&&(e.structure_id=this.structuresSelectValue.length>0?this.structuresSelectValue[0].id:this.userInfo.structure_id):e.structure_id=this.structuresSelectValue.length>0?this.structuresSelectValue[0].id:"1",this.showUserSelect&&2==this.dataSelect&&(e.user_id=this.userSelectValue.length>0?this.userSelectValue[0].id:""),this.showBusinessSelect&&(e.type_id=this.businessStatusValue),this.showProductSelect&&(e.category_id=this.productValue.length>0?this.productValue[this.productValue.length-1]:""),this.showYearSelect?e.year=this.yearValue:"custom"==this.timeTypeValue.type?(e.start_time=this.timeTypeValue.startTime.replace(/\./g,"-"),e.end_time=this.timeTypeValue.endTime.replace(/\./g,"-")):e.type=this.timeTypeValue.value,this.$emit("change",e)}}},m=(s("lSL+"),s("KHd+")),y=Object(m.a)(f,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("flexbox",{staticClass:"filtrate-content",attrs:{justify:"flex-start"}},[s("flexbox",{staticClass:"title-box",attrs:{justify:"flex-start"}},[s("div",{staticClass:"icon-box"},[s("span",{staticClass:"wk wk-my-task icon"})]),e._v(" "),s("span",{staticClass:"text"},[e._v(e._s(e.title))])]),e._v(" "),e.showFilterView?[e.showYearSelect?e._e():s("time-type-select",{on:{change:e.timeTypeChange}}),e._v(" "),e.showYearSelect?s("el-date-picker",{attrs:{clearable:!1,"picker-options":e.pickerOptions,type:"year","value-format":"yyyy",placeholder:"选择年"},model:{value:e.yearValue,callback:function(t){e.yearValue=t},expression:"yearValue"}}):e._e(),e._v(" "),e.showUserStrucSelect?s("el-select",{model:{value:e.dataSelect,callback:function(t){e.dataSelect=t},expression:"dataSelect"}},e._l([{label:"按部门",value:1},{label:"按员工",value:2}],function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})):e._e(),e._v(" "),1==e.dataSelect?s("xh-structure-cell",{staticClass:"xh-structure-cell",attrs:{radio:"",placeholder:"选择部门（默认为本部门及下属部门）"},on:{"value-change":e.structureChange}}):e._e(),e._v(" "),2==e.dataSelect&&e.showUserSelect?s("xh-user-cell",{staticClass:"xh-user-cell",attrs:{radio:"",placeholder:"选择员工（默认为本人及下属）\n"},on:{"value-change":e.userChange}}):e._e(),e._v(" "),e.showBusinessSelect?s("el-select",{attrs:{placeholder:"商机组"},model:{value:e.businessStatusValue,callback:function(t){e.businessStatusValue=t},expression:"businessStatusValue"}},e._l(e.businessOptions,function(e){return s("el-option",{key:e.type_id,attrs:{label:e.name,value:e.type_id}})})):e._e(),e._v(" "),e.showProductSelect?s("el-cascader",{staticStyle:{width:"100%"},attrs:{options:e.productOptions,"show-all-levels":!1,props:{children:"children",label:"label",value:"categoryId"},"change-on-select":""},model:{value:e.productValue,callback:function(t){e.productValue=t},expression:"productValue"}}):e._e(),e._v(" "),e.showCustomSelect?s("el-select",{on:{change:e.customSelectChange},model:{value:e.customValue,callback:function(t){e.customValue=t},expression:"customValue"}},e._l(e.customOptions,function(e){return s("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})):e._e(),e._v(" "),e._t("append"),e._v(" "),s("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){e.postFiltrateValue()}}},[e._v("搜索")]),e._v(" "),e._t("default")]:e._e()],2)},[],!1,null,"0562c1de",null);y.options.__file="FiltrateHandleView.vue";t.a=y.exports},"G+lJ":function(e,t,s){"use strict";var a=s("tuyL");s.n(a).a},IKVb:function(e,t,s){"use strict";s.r(t);var a=s("31UX"),i=s("9kPm"),n=s("MT78"),l=s.n(n),o=s("74lk"),u={name:"FunnelStatistics",components:{},mixins:[a.a,i.a],data:function(){return{loading:!1,list:[],fieldList:[{field:"name",name:"阶段"},{field:"money",name:"金额",sortable:"custom"},{field:"count",name:"商机数",sortable:"custom"}],funnelOption:null}},computed:{},mounted:function(){this.initAxis()},methods:{getDataList:function(e){var t=this;this.loading=!0,Object(o.c)(e).then(function(e){t.loading=!1,t.list=e.data.list;for(var s=[],a=0,i=0;i<e.data.list.length;i++){var n=e.data.list[i];s.push({name:(n.name||"")+"("+n.money+"元)",value:parseFloat(n.count)}),a+=parseFloat(n.count)}t.funnelOption.series[0].data=s,t.funnelOption.legend.data=s.map(function(e){return e.name}),t.funnelOption.series[0].max=a<1?1:a,t.chartObj.setOption(t.funnelOption,!0)}).catch(function(){t.loading=!1})},getSummaries:function(e){var t=e.columns,s=e.data,a=[];return t.forEach(function(e,t){if(0!==t){var i=s.map(function(t){return Number(t[e.property])});i.every(function(e){return isNaN(e)})?a[t]="N/A":(a[t]=i.reduce(function(e,t){var s=Number(t);return isNaN(s)?e:e+t},0),1==t&&(a[t]=a[t].toFixed(2)))}else a[t]="合计"}),a},initAxis:function(){var e=l.a.init(document.getElementById("axismain")),t={toolbox:this.toolbox,tooltip:{trigger:"item",formatter:"{b} <br/> 商机个数: {c}个"},calculable:!0,legend:{data:[],formatter:function(e){return e.split("(")[0]}},grid:{left:0,right:0,bottom:0,top:0},color:this.chartColors,series:[{name:"漏斗图",type:"funnel",left:"20%",width:"56%",sort:"none",gap:2,label:{normal:{show:!0,position:"right"},emphasis:{textStyle:{fontSize:20}}},labelLine:{normal:{length:20,lineStyle:{width:1,type:"solid"}}},data:[]}]};e.setOption(t,!0),this.funnelOption=t,this.chartObj=e}}},r=(s("vwkT"),s("KHd+")),c=Object(r.a)(u,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"main-container"},[s("filtrate-handle-view",{staticClass:"filtrate-bar",attrs:{"show-business-select":!0,title:"销售漏斗","module-type":"business"},on:{load:function(t){e.loading=!0},change:e.getDataList}}),e._v(" "),s("div",{staticClass:"content"},[e._m(0),e._v(" "),s("div",{staticClass:"table-content"},[e.showTable?s("el-table",{attrs:{data:e.list,"summary-method":e.getSummaries,height:"400","show-summary":"",stripe:"",border:"","highlight-current-row":""},on:{"sort-change":function(t){var s=t.prop,a=t.order;return e.mixinSortFn(e.list,s,a)}}},e._l(e.fieldList,function(e,t){return s("el-table-column",{key:t,attrs:{prop:e.field,label:e.name,sortable:e.sortable,align:"center","header-align":"center","show-overflow-tooltip":""}})})):e._e()],1)])],1)},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"axis-content"},[t("div",{attrs:{id:"axismain"}})])}],!1,null,"2254dd77",null);c.options.__file="FunnelStatistics.vue";t.default=c.exports},Vccs:function(e,t,s){},ZX9L:function(e,t,s){"use strict";var a={name:"TimeTypeSelect",props:{defaultType:[String,Object],width:{type:Number,default:200},options:{type:Array,default:function(){return[{label:"今天",value:"today"},{label:"昨天",value:"yesterday"},{label:"本周",value:"week"},{label:"上周",value:"lastWeek"},{label:"本月",value:"month"},{label:"上月",value:"lastMonth"},{label:"本季度",value:"quarter"},{label:"上季度",value:"lastQuarter"},{label:"本年",value:"year"},{label:"去年",value:"lastYear"}]}}},data:function(){return{selectType:{label:"本年",value:"year"},showTypePopover:!1,showCustomContent:!1,sureCustomContent:!1,startTime:"",endTime:""}},computed:{typeShowValue:function(){return this.sureCustomContent?this.startTime||this.endTime?(this.startTime||"")+"-"+(this.endTime||""):"":this.selectType.label}},watch:{defaultType:function(){this.selectType.value!=this.defaultType&&(this.selectType=this.getDefaultTypeValue(this.defaultType))}},mounted:function(){void 0!==this.defaultType?"string"==typeof this.defaultType?this.selectType=this.getDefaultTypeValue(this.defaultType):this.defaultType.label?this.selectType=this.defaultType:"default"==this.defaultType.type?this.selectType=this.getDefaultTypeValue(this.defaultType.value):"custom"==this.defaultType.type&&(this.sureCustomContent=!0,this.showCustomContent=!0,this.startTime=this.defaultType.startTime,this.endTime=this.defaultType.endTime):this.$emit("change",{type:"default",value:this.selectType.value})},methods:{getDefaultTypeValue:function(e){for(var t=0;t<this.options.length;t++){var s=this.options[t];if(s.value==e)return s}return{label:"本年",value:"year"}},typeSelectClick:function(e){this.showTypePopover=!1,this.sureCustomContent=!1,this.showCustomContent=!1,this.selectType=e,this.$emit("change",{type:"default",value:this.selectType.value})},customSureClick:function(){this.startTime&&this.endTime&&(this.sureCustomContent=!0,this.showTypePopover=!1,this.$emit("change",{type:"custom",startTime:this.startTime,endTime:this.endTime}))}}},i=(s("G+lJ"),s("KHd+")),n=Object(i.a)(a,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-popover",{staticClass:"time-type-select",attrs:{width:e.width,placement:"bottom","popper-class":"no-padding-popover",trigger:"click"},model:{value:e.showTypePopover,callback:function(t){e.showTypePopover=t},expression:"showTypePopover"}},[s("div",{staticClass:"type-popper"},[s("div",{staticClass:"type-content"},[e._l(e.options,function(t,a){return s("div",{key:a,staticClass:"type-content-item",class:{selected:e.selectType.value==t.value&&!e.showCustomContent},on:{click:function(s){e.typeSelectClick(t)}}},[s("div",{staticClass:"mark"}),e._v(e._s(t.label)+"\n      ")])}),e._v(" "),s("div",{staticClass:"type-content-item",class:{selected:e.showCustomContent},on:{click:function(t){e.showCustomContent=!0}}},[s("div",{staticClass:"mark"}),e._v("自定义\n      ")])],2),e._v(" "),e.showCustomContent?s("div",{staticClass:"type-content-custom"},[s("el-date-picker",{attrs:{type:"date","value-format":"yyyy.MM.dd",placeholder:"选择日期"},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}}),e._v(" "),s("el-date-picker",{attrs:{type:"date","value-format":"yyyy.MM.dd",placeholder:"选择日期"},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}}),e._v(" "),s("el-button",{on:{click:e.customSureClick}},[e._v("确定")])],1):e._e()]),e._v(" "),s("el-input",{staticClass:"type-select",style:{width:e.width+"px"},attrs:{slot:"reference",readonly:!0},slot:"reference",model:{value:e.typeShowValue,callback:function(t){e.typeShowValue=t},expression:"typeShowValue"}},[s("i",{class:["el-icon-arrow-up",{"is-reverse":e.showTypePopover}],attrs:{slot:"suffix"},slot:"suffix"})])],1)},[],!1,null,"9dc9cb18",null);n.options.__file="index.vue";t.a=n.exports},"lSL+":function(e,t,s){"use strict";var a=s("utCb");s.n(a).a},tuyL:function(e,t,s){},utCb:function(e,t,s){},vwkT:function(e,t,s){"use strict";var a=s("Vccs");s.n(a).a}}]);