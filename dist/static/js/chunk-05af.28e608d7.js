(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-05af"],{"6Hyi":function(e,t,r){"use strict";t.a={props:{},data:function(){return{focusKey:null}},methods:{checkFromItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(this.focusKey=null,!e)return!1;if(this.clearError(),!this.rules.hasOwnProperty(e))return!0;for(var r=this.rules[e],s=0;s<r.length;s++){var o=r[s];if(o.hasOwnProperty("required")&&o.required&&!t)return this.setError(e,o.msg),!1;if(o.hasOwnProperty("reg")&&o.reg)if(o.required){if(!o.reg.test(t))return this.setError(e,o.msg),!1}else if(t&&!o.reg.test(t))return this.setError(e,o.msg),!1;if(o.validator&&!o.validator())return this.setError(e,o.msg),!1}return!0},setError:function(e,t){var r=this;setTimeout(function(){r.validateRes[e]=!1,r.errorInfo=t},200)}}}},"89D7":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4OUNDRjkwNEQzNkExMUU5QTVBREM4MENCNEY2MTM3RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4OUNDRjkwNUQzNkExMUU5QTVBREM4MENCNEY2MTM3RSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg5Q0NGOTAyRDM2QTExRTlBNUFEQzgwQ0I0RjYxMzdFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg5Q0NGOTAzRDM2QTExRTlBNUFEQzgwQ0I0RjYxMzdFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+xL1tegAAASpJREFUeNqck01qwlAUhZ+x2G7DgSgK7R6KA6VdhuDvRHDm2Jm0dKAgscsQOpDuolUngosQMWLwnHCfXGMM6oEPXu7LOffl8pJYl0ompDyogDJIS20JfsAY/OuXEyogBT5AHTgmWj5wQRtsWHhQ5gkomngxuAoyckLPdvq8wqz1KqcNEguSGujJdY2TzZ63Ro17SjV6HRlY0la9ft88drsnIVyzxj0leioc4gyLXLgbDdteL3i2a3+xCB9szoCtDNFEhVAXzEYP8V4FActL3dmZhGeitHLkhkWaeWwSEzJlwDfYH69jp3P2zTaEe0r0jO1VHoDGjd8/BE07RN7t6Q3mX/EcfxoPvMlJ/Bgj90bgXTwnfx0LLfAMvgCHsANr8Ce1F7nCG2s6CDAAvTdp/OEIuWMAAAAASUVORK5CYII="},"Og/b":function(e,t,r){},QoxM:function(e,t,r){e.exports=r.p+"static/img/logo_white.87cc53d.png"},Vzeh:function(e,t,r){"use strict";var s=r("Og/b");r.n(s).a},nH0h:function(e,t,r){},sSLS:function(e,t,r){"use strict";var s=r("nH0h");r.n(s).a},sZuK:function(e,t,r){"use strict";r.r(t);var s=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"top-nav"},[t("img",{attrs:{src:r("QoxM"),alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"welcome__title"},[t("i",{staticClass:"el-icon-success"}),this._v("恭喜您，已成功安装悟空CRM\n      ")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"welcome__tips"},[this._v("你需要通过手机号来"),t("a",{attrs:{href:"https://www.72crm.com/crm/#/login?type=register",target:"_blank"}},[this._v("注册悟空ID")]),this._v("，该手机号将作为您登录系统的管理员帐号。\n        注册成功后，您需要进入【悟空个人中心】，点击【开源版下载】"),t("a",{attrs:{href:"https://www.72crm.com/user/company_info",target:"_blank"}},[this._v("获取您的序列号")]),this._v("\n          如您已经注册悟空ID，您只需要点击"),t("a",{attrs:{href:"https://www.72crm.com/user/company_info",target:"_blank"}},[this._v("登录个人中心")]),this._v("即可查看您的序列号")])}],o=r("GQeE"),n=r.n(o),i=r("fe1z"),a=r("XJYT"),c=r("6Hyi"),l=r("ehos"),u={name:"LoginByWelcome",components:{},mixins:[c.a],data:function(){return{redirect:void 0,form:{},errorInfo:null,validateRes:{username:!0,code:!0,password:!0,verifyPassword:!0}}},computed:{rules:function(){var e=this;return{username:[{required:!0,msg:"手机号不能为空"},{reg:/^1[1-9]\d{9}$/,msg:"请输入正确的手机号码"}],code:[{required:!0,msg:"序列号不能为空"}],password:[{required:!0,msg:"初始化密码不能为空"},{reg:/^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/,msg:"密码由6-20位字母、数字组成"}],verifyPassword:[{required:!0,msg:"确认密码不能为空"},{reg:/^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/,msg:"确认密码由6-20位字母、数字组成"},{validator:function(){return e.form.password===e.form.verifyPassword},msg:"两次输入的密码不一致"}]}}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},mounted:function(){var e=this;this.$nextTick(function(){e.$refs.username.focus()})},created:function(){this.debouncedHandleLogin=Object(l.debounce)(300,this.handleLogin)},methods:{handleLogin:function(){var e=this;if(this.checkForm()){var t=a.Loading.service({target:document.querySelector(".login-main-content")});Object(i.a)({username:this.form.username,code:this.form.code,password:this.form.password}).then(function(r){e.$router.push("/login"),t.close()}).catch(function(){t.close()})}},checkForm:function(){this.clearError();for(var e=n()(this.validateRes),t=0;t<e.length;t++){if(!this.checkFromItem(e[t],this.form[e[t]]||null))return!1}return!0},helpClik:function(){this.helpDialogVisible=!0},getInit:function(){var e=this;Object(i.d)().then(function(t){1==t.data&&e.$router.push("/login")}).catch(function(){})},clearError:function(){this.errorInfo=null,this.validateRes={username:!0,code:!0,password:!0,verifyPassword:!0}}}},d=(r("sSLS"),r("KHd+")),f=Object(d.a)(u,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login-by-wel"},[s("el-form",{staticClass:"login-from",attrs:{"label-position":"left","label-width":"60px"}},[s("el-form-item",{attrs:{label:"手机号","label-position":"left"}},[s("el-input",{ref:"username",class:{error:!e.validateRes.username},attrs:{placeholder:"请输入您的手机号",autofocus:"",type:"text"},on:{focus:function(t){e.focusKey="username"},blur:function(t){e.checkFromItem("username",e.form.username)}},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.debouncedHandleLogin(t):null}},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username","string"==typeof t?t.trim():t)},expression:"form.username"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"序列号"}},[s("el-input",{ref:"code",class:{error:!e.validateRes.code},attrs:{placeholder:"请输入您的序列号",type:"textarea",rows:"5"},on:{focus:function(t){e.focusKey="code"},blur:e.checkForm},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.debouncedHandleLogin(t):null}},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code","string"==typeof t?t.trim():t)},expression:"form.code"}})],1),e._v(" "),s("div",{staticClass:"wel-tips"},[e._v("您无需联网，在离线状态下也可完成验证")]),e._v(" "),s("el-divider"),e._v(" "),[s("div",{staticClass:"wel-title"},[e._v("初始化管理员登录密码")]),e._v(" "),s("el-form-item",{attrs:{label:"密码"}},[s("el-input",{ref:"password",class:{error:!e.validateRes.password},attrs:{placeholder:"请输入您的初始化密码",autofocus:"",type:"text"},on:{focus:function(t){e.focusKey="password"},blur:function(t){e.checkFromItem("password",e.form.password)}},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.debouncedHandleLogin(t):null}},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password","string"==typeof t?t.trim():t)},expression:"form.password"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"密码"}},[s("el-input",{ref:"verifyPassword",class:{error:!e.validateRes.verifyPassword},attrs:{placeholder:"请再次输入您的密码",autofocus:"",type:"text"},on:{focus:function(t){e.focusKey="verifyPassword"},blur:function(t){e.checkFromItem("verifyPassword",e.form.verifyPassword)}},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.debouncedHandleLogin(t):null}},model:{value:e.form.verifyPassword,callback:function(t){e.$set(e.form,"verifyPassword","string"==typeof t?t.trim():t)},expression:"form.verifyPassword"}})],1)]],2),e._v(" "),s("div",{staticClass:"error-info",class:{ok:!Boolean(e.errorInfo)}},[e.errorInfo?s("div",{staticClass:"box"},[s("img",{staticClass:"icon",attrs:{src:r("89D7"),alt:""}}),e._v(" "),s("span",[e._v(e._s(e.errorInfo))])]):e._e()]),e._v(" "),s("div",{staticClass:"control"},[s("div",{staticClass:"btn",staticStyle:{"font-size":"16px"},on:{click:e.debouncedHandleLogin}},[e._v("\n      以管理员身份登录\n    ")])])],1)},[],!1,null,"00cad798",null);f.options.__file="LoginByWelcome.vue";var m={name:"Login",components:{LoginByWelcome:f.exports},data:function(){return{}},watch:{},created:function(){},methods:{}},v=(r("Vzeh"),Object(d.a)(m,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"welcome-wrapper"},[e._m(0),e._v(" "),r("div",{staticClass:"container"},[r("div",{staticClass:"welcome-main-content"},[e._m(1),e._v(" "),r("div",{staticClass:"welcome__des"},[e._v("您已成功安装悟空CRM，您可以尽情享用悟空CRM开源版所有功能及服务。在使用悟空CRM前，\n      您需要完成您的账户验证，以及初始化管理员的登录密码。")]),e._v(" "),r("div",{staticClass:"welcome__main"},[e._m(2),e._v(" "),r("login-by-welcome")],1)])])])},s,!1,null,"12a6a11e",null));v.options.__file="Welcome.vue";t.default=v.exports}}]);