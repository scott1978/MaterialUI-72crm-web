(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6aef"],{SfI6:function(t,i,a){"use strict";var e=a("sTyR");a.n(e).a},bHo1:function(t,i,a){"use strict";a.r(i);var e=a("JrBc"),n=a("MT78"),s=a.n(n),o=a("pHUW"),l={name:"RankingAddContactsStatistics",mixins:[e.a],data:function(){return{}},computed:{},mounted:function(){this.fieldList=[{field:"user_name",name:"创建人"},{field:"structure_name",name:"部门"},{field:"count",name:"新增联系人数（个）"}],this.initAxis()},methods:{getDataList:function(t){var i=this;this.postParams=t,this.loading=!0,Object(o.a)(t).then(function(t){i.loading=!1,i.list=t.data||[];for(var a=[],e=[],n=t.data.length>10?10:t.data.length,s=0;s<n;s++){var o=t.data[s];a.splice(0,0,parseFloat(o.count)),e.splice(0,0,o.user_name)}i.axisOption.yAxis[0].data=e,i.axisOption.series[0].data=a,i.chartObj.setOption(i.axisOption,!0)}).catch(function(){i.loading=!1})},initAxis:function(){this.chartObj=s.a.init(document.getElementById("axismain")),this.axisOption.tooltip.formatter="{b} : {c}个",this.axisOption.xAxis[0].name="（个）",this.chartObj.setOption(this.axisOption,!0)},exportClick:function(){this.requestExportInfo(o.b,this.postParams,"addContacts")}}},r=(a("SfI6"),a("KHd+")),c=Object(r.a)(l,function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"main-container"},[a("filtrate-handle-view",{staticClass:"filtrate-bar",attrs:{"show-user-select":!1,title:"新增联系人数排行","module-type":"ranking"},on:{load:function(i){t.loading=!0},change:t.getDataList}}),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"content-title"},[t._v("新增联系人数排行（按创建人、创建时间统计）")]),t._v(" "),a("div",{directives:[{name:"empty",rawName:"v-empty",value:0===t.list.length,expression:"list.length === 0"}],staticClass:"axis-content",attrs:{"xs-empty-text":"暂无排行"}},[a("div",{attrs:{id:"axismain"}})]),t._v(" "),a("div",{staticClass:"table-content"},[a("div",{staticClass:"handle-bar"},[a("el-button",{staticClass:"export-btn",on:{click:t.exportClick}},[t._v("导出")])],1),t._v(" "),a("el-table",{attrs:{data:t.list,height:"400",stripe:"",border:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center","header-align":"center","show-overflow-tooltip":"",label:"公司总排名"},scopedSlots:t._u([{key:"default",fn:function(i){return[t._v("\n            "+t._s(i.$index+1)+"\n          ")]}}])}),t._v(" "),t._l(t.fieldList,function(t,i){return a("el-table-column",{key:i,attrs:{prop:t.field,label:t.name,align:"center","header-align":"center","show-overflow-tooltip":""}})})],2)],1)])],1)},[],!1,null,"3e6f9fcf",null);c.options.__file="RankingAddContactsStatistics.vue";i.default=c.exports},sTyR:function(t,i,a){}}]);