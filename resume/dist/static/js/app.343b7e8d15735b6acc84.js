webpackJsonp([0],[,,function(t,e,a){"use strict";e.a={lang:"en",languageChanged:!0,changeLanguageClass:"animated fadeIn",enterClass:"animated bounceIn",leaveClass:"animated bounceOut"}},function(t,e,a){a(76);var n=a(0)(a(41),a(105),null,null);t.exports=n.exports},,,function(t,e,a){a(58),a(59);var n=a(0)(a(42),a(94),null,null);t.exports=n.exports},,,,,,,,,function(t,e,a){"use strict";var n=a(7),s=a(106);n.a.use(s.a),e.a=new s.a({routes:[]})},function(t,e){},function(t,e){},function(t,e){},function(t,e,a){a(62);var n=a(0)(a(40),a(96),null,null);t.exports=n.exports},,,,,,,,,,,,,,,,,,,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(7),s=a(19),i=a.n(s),o=a(15),c=a(20),r=a.n(c),l=a(17),u=(a.n(l),a(16)),d=(a.n(u),a(18));a.n(d);n.a.config.productionTip=!1,n.a.use(r.a),new n.a({el:"#app",router:o.a,template:"<App/>",components:{App:i.a}})},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(91),s=a.n(n),i=a(81),o=a.n(i),c=a(2),r=a(21),l=a.n(r);e.default={name:"app",components:{KungfuHeader:s.a,KungfuContent:o.a},data:function(){return{orignData:null,data:null,config:c.a}},created:function(){var t=this;l.a.get("static/data.js",{responseType:"json"}).then(function(e){t.orignData=e.data,t.data=t.orignData[t.config.lang]}).catch(function(t){console.log(t)})},methods:{changeLanguage:function(){"en"===c.a.lang?c.a.lang="zh":c.a.lang="en",this.data=this.orignData[this.config.lang]}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(2);e.default={props:["headerTitle"],data:function(){return{config:n.a}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(5),s=a.n(n),i=a(2);e.default={props:["itemData","index"],data:function(){return{config:i.a}},methods:{hoverInfoItem:function(){s()(".hover-info-item").removeClass("hover-info-item"),s()(this.$refs.infoItem.$el).addClass("hover-info-item")}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(90),s=a.n(n),i=a(82),o=a.n(i),c=a(83),r=a.n(c),l=a(89),u=a.n(l),d=a(84),f=a.n(d),g=a(54),v=a.n(g);e.default={props:["fullData"],components:{BaseInfo:o.a,WillingInfo:s.a,EducationInfo:r.a,SkillInfo:u.a,ExperienceInfo:f.a},created:function(){var t=this;this.$nextTick(function(){t.scroll=new v.a(t.$refs.content)})},methods:{reScroll:function(){this.scroll._resize()}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),s=a.n(n),i=a(6),o=a.n(i);e.default={props:["baseData"],data:function(){return{}},components:{CardHeader:s.a,InfoItem:o.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),s=a.n(n),i=a(6),o=a.n(i);e.default={props:["educationData"],components:{CardHeader:s.a,InfoItem:o.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),s=a.n(n),i=a(86),o=a.n(i),c=a(85),r=a.n(c);e.default={props:["experienceData"],components:{CardHeader:s.a,TimeLine:o.a,ExperienceItem:r.a},methods:{rescroll:function(){this.$emit("rescroll")}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(2);e.default={props:["itemData"],data:function(){return{config:n.a}},methods:{toggleDescription:function(t,e,a){var n=this.$refs[t+"Description"+e][0];if(console.log(a.status),"hide"===a.status){var s=window.getComputedStyle(n).height;n.style.height="auto";var i=window.getComputedStyle(n).height;n.style.height=s,n.offsetWidth,n.style.height=i,a.status="show"}else n.style.height="0px",a.status="hide";this.$emit("rescroll")}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(5),s=a.n(n),i=a(2),o=a(3),c=a.n(o),r=a(88),l=a.n(r);e.default={props:["groupData"],components:{CardHeader:c.a,SkillGroupItem:l.a},data:function(){return{config:i.a,hoverSkillGroupClass:""}},methods:{hoverSkillGroup:function(){s()(".hover-skill-group").removeClass("hover-skill-group"),s()(this.$el).addClass("hover-skill-group")}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(5),s=a.n(n);e.default={props:["itemData"],data:function(){return{styleObject:{width:this.itemData.level+"%",left:-this.itemData.level+"%"}}},methods:{tapSkillItem:function(){s()(".hover-item").removeClass("hover-item"),s()(this.$el).addClass("hover-item")}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),s=a.n(n),i=a(87),o=a.n(i);e.default={props:["skillData"],components:{CardHeader:s.a,SkillGroup:o.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(3),s=a.n(n),i=a(6),o=a.n(i);e.default={props:["willingData"],data:function(){return{}},components:{CardHeader:s.a,InfoItem:o.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(2);e.default={props:["headerInfo"],data:function(){return{config:n.a}},created:function(){console.log(this.data)},methods:{changeLangue:function(){var t=this;console.log("leave..."),n.a.languageChanged=!1,this.$nextTick(function(){t.$emit("changeLanguage"),n.a.languageChanged=!0})}}}},,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,,,function(t,e,a){a(74),a(75);var n=a(0)(a(43),a(104),null,null);t.exports=n.exports},function(t,e,a){a(60),a(61);var n=a(0)(a(44),a(95),null,null);t.exports=n.exports},function(t,e,a){a(63),a(64);var n=a(0)(a(45),a(97),null,null);t.exports=n.exports},function(t,e,a){a(70);var n=a(0)(a(46),a(101),null,null);t.exports=n.exports},function(t,e,a){a(55),a(56);var n=a(0)(a(47),a(92),null,null);t.exports=n.exports},function(t,e,a){a(71);var n=a(0)(a(48),a(102),null,null);t.exports=n.exports},function(t,e,a){a(69);var n=a(0)(a(49),a(100),null,null);t.exports=n.exports},function(t,e,a){a(67),a(68);var n=a(0)(a(50),a(99),null,null);t.exports=n.exports},function(t,e,a){a(57);var n=a(0)(a(51),a(93),null,null);t.exports=n.exports},function(t,e,a){a(72),a(73);var n=a(0)(a(52),a(103),null,null);t.exports=n.exports},function(t,e,a){a(65),a(66);var n=a(0)(a(53),a(98),null,null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"experience-item"},[a("div",{staticClass:"arrow-to-time-line"}),t._v(" "),a("div",{staticClass:"experience-header"},[t.config.languageChanged?a("div",{staticClass:"duration",class:t.config.changeLanguageClass},[t._v("\n      "+t._s(t.itemData.duration)+"\n    ")]):t._e(),t._v(" "),t.config.languageChanged?a("div",{staticClass:"job-title",class:t.config.changeLanguageClass},[t._v("\n      "+t._s(t.itemData.jobTitle)+"\n    ")]):t._e()]),t._v(" "),a("div",{staticClass:"company-info"},[a("div",{staticClass:"company-icon",style:{backgroundImage:"url(static/img/"+t.itemData.companyIcon+")"}}),t._v(" "),t.config.languageChanged?a("div",{staticClass:"company-name",class:t.config.changeLanguageClass},[t._v(t._s(t.itemData.company)+"\n    ")]):t._e(),t._v(" "),t.config.languageChanged?a("div",{staticClass:"company-size",class:t.config.changeLanguageClass},[t._v("\n      "+t._s(t.itemData.companySizeLabel)+" "+t._s(t.itemData.companySize)+"\n    ")]):t._e()]),t._v(" "),a("div",{staticClass:"achievement-info"},[t.config.languageChanged?a("div",{staticClass:"achievement-label",class:t.config.changeLanguageClass},[t._v("\n      "+t._s(t.itemData.achievementLabel)+"\n    ")]):t._e(),t._v(" "),a("div",{staticClass:"achievements-container"},[t._l(t.itemData.achievements,function(e,n){return[a("div",{staticClass:"achievement-container"},[t.config.languageChanged?a("span",{staticClass:"index",class:t.config.changeLanguageClass},[t._v(t._s(n+1)+".")]):t._e(),t._v(" "),t.config.languageChanged?a("span",{staticClass:"achievement-title",class:t.config.changeLanguageClass},[t._v(t._s(e.title)+"\n            "),a("v-touch",{on:{tap:function(a){t.toggleDescription("achievement",n,e)},click:function(a){t.toggleDescription("achievement",n,e)}}},[a("span",{staticClass:"toggle-description animated flash infinite",class:{"icon-angle-double-down":"hide"===e.status,"icon-angle-double-up":"show"===e.status}})])],1):t._e(),t._v(" "),t.config.languageChanged?a("div",{ref:"achievementDescription"+n,refInFor:!0,staticClass:"achievement-description",class:[t.config.changeLanguageClass,{"height-auto":"show"===e.status},{"height-0":"hide"===e.status}],domProps:{innerHTML:t._s(e.description)}}):t._e()])]})],2)]),t._v(" "),a("div",{staticClass:"project-info"},[t.config.languageChanged?a("div",{staticClass:"project-label",class:t.config.changeLanguageClass},[t._v("\n      "+t._s(t.itemData.projectLabel)+"\n    ")]):t._e(),t._v(" "),a("div",{staticClass:"projects-container"},[t._l(t.itemData.projects,function(e,n){return[a("div",{staticClass:"project-container"},[t.config.languageChanged?a("span",{staticClass:"index",class:t.config.changeLanguageClass},[t._v(t._s(n+1)+".")]):t._e(),t._v(" "),t.config.languageChanged?a("span",{staticClass:"project-title",class:t.config.changeLanguageClass},[t._v(t._s(e.title)+"\n            "),a("v-touch",{on:{tap:function(a){t.toggleDescription("project",n,e)},click:function(a){t.toggleDescription("project",n,e)}}},[a("span",{staticClass:"toggle-description animated flash infinite",class:{"icon-angle-double-down":"hide"===e.status,"icon-angle-double-up":"show"===e.status}})])],1):t._e(),t._v(" "),a("div",{ref:"projectDescription"+n,refInFor:!0,staticClass:"project-description",class:[t.config.changeLanguageClass,{"height-auto":"show"===e.status},{"height-0":"hide"===e.status}]},[t.config.languageChanged?a("div",{staticClass:"detail",class:t.config.changeLanguageClass,domProps:{innerHTML:t._s(e.description)}}):t._e(),t._v(" "),a("div",{staticClass:"duty-container"},[t.config.languageChanged?a("div",{staticClass:"duty-label",class:t.config.changeLanguageClass},[t._v("\n                "+t._s(t.itemData.dutyLabel)+"\n              ")]):t._e(),t._v(" "),t.config.languageChanged?a("div",{staticClass:"duty",class:t.config.changeLanguageClass},[t._v(t._s(e.duty))]):t._e()])])])]})],2)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-container",attrs:{id:"sillInfo"}},[a("CardHeader",{attrs:{"header-title":t.skillData.title}}),t._v(" "),t._l(t.skillData.groups,function(t,e){return[a("SkillGroup",{attrs:{"group-data":t}})]})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"info-item-wrapper",class:{"half-width":"half"==t.itemData.size}},[a("v-touch",{ref:"infoItem",staticClass:"info-item",attrs:{tag:"div"},on:{tap:t.hoverInfoItem}},[null!=t.index?a("div",{staticClass:"index-container"},[a("span",{staticClass:"index"},[t._v(t._s(t.index+1))])]):t._e(),t._v(" "),t.config.languageChanged?a("div",{staticClass:"info-container",class:t.config.changeLanguageClass},[t.itemData.label?a("span",{staticClass:"label",class:t.itemData.iconClass},[t._v(t._s(t.itemData.iconClass?"":t.itemData.label))]):t._e(),t._v(" "),t.itemData.label?a("span",{staticClass:"split"},[t._v("|")]):t._e(),t._v(" "),a("span",{staticClass:"text"},[t._v(t._s(t.itemData.text))])]):t._e()])],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-touch",{staticClass:"card-container",attrs:{tag:"div",id:"baseInfo"}},[a("CardHeader",{attrs:{"header-title":t.baseData.title}}),t._v(" "),t._l(t.baseData.items,function(t){return[a("InfoItem",{attrs:{"item-data":t}})]})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return null!=this.data?a("div",{class:t.config.lang,attrs:{id:"app"}},[a("KungfuHeader",{attrs:{"header-info":t.data.headerInfo},on:{changeLanguage:t.changeLanguage}}),t._v(" "),a("KungfuContent",{attrs:{"full-data":t.data}}),t._v(" "),a("div",{attrs:{id:"appBg"}})],1):t._e()},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-container",attrs:{id:"educationInfo"}},[a("CardHeader",{attrs:{"header-title":t.educationData.title}}),t._v(" "),t._l(t.educationData.educations,function(e,n){return[a("InfoItem",{attrs:{index:n,"item-data":{text:e.title+" ("+e.date+")"}}}),t._v(" "),a("InfoItem",{attrs:{"item-data":{text:e.school}}})]})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"header"}},[a("div",{staticClass:"out-container"},[a("div",{staticClass:"top"},[t.config.languageChanged?a("div",{class:["title",t.config.changeLanguageClass]},[t._v(t._s(t.headerInfo.title))]):t._e(),t._v(" "),a("div",{staticClass:"right-info"},[a("div",{staticClass:"language",on:{click:t.changeLangue}},[t._v(t._s(t.headerInfo.language))]),t._v(" "),a("div",{staticClass:"touxiang"})])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-touch",{staticClass:"item",attrs:{tag:"div"},on:{tap:t.tapSkillItem}},[""!=t.itemData.icon?a("span",{staticClass:"item-icon",style:{backgroundImage:"url(static/img/"+t.itemData.icon+")"}}):t._e(),t._v(" "),a("span",{staticClass:"item-name"},[t._v(t._s(t.itemData.name))]),t._v(" "),a("span",{staticClass:"item-level",style:t.styleObject})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-touch",{ref:"group",staticClass:"sill-group",attrs:{tag:"div"},on:{tap:t.hoverSkillGroup}},[a("div",{staticClass:"group-name"},[t.config.languageChanged?a("div",{class:t.config.changeLanguageClass,domProps:{innerHTML:t._s(t.groupData.groupName)}}):t._e()]),t._v(" "),a("div",{staticClass:"items-container"},[t._l(t.groupData.items,function(t){return[a("SkillGroupItem",{attrs:{"item-data":t}})]})],2)])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-container",attrs:{id:"experienceInfo"}},[a("CardHeader",{attrs:{"header-title":t.experienceData.title}}),t._v(" "),a("div",{staticClass:"experience-content"},[a("TimeLine"),t._v(" "),a("div",{staticClass:"experience-container"},[t._l(t.experienceData.items,function(e){return[a("ExperienceItem",{attrs:{"item-data":e},on:{rescroll:t.rescroll}})]})],2)],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"time-line"},[a("div",{staticClass:"arrow"}),t._v(" "),a("div",{staticClass:"line"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-container",attrs:{id:"willingInfo"}},[a("CardHeader",{attrs:{"header-title":t.willingData.title}}),t._v(" "),t._l(t.willingData.willings,function(t,e){return[a("InfoItem",{attrs:{index:e,"item-data":{text:t}}})]})],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{ref:"content",staticClass:"out-container",attrs:{id:"content"}},[a("div",{staticClass:"content-wrapper"},[a("div",{staticClass:"left"},[a("WillingInfo",{attrs:{"willing-data":t.fullData.willingInfo}}),t._v(" "),a("BaseInfo",{attrs:{"base-data":t.fullData.baseInfo}}),t._v(" "),a("EducationInfo",{attrs:{"education-data":t.fullData.educationInfo}})],1),t._v(" "),a("div",{staticClass:"right"},[a("SkillInfo",{attrs:{"skill-data":t.fullData.skillInfo}}),t._v(" "),a("ExperienceInfo",{attrs:{"experience-data":t.fullData.experienceInfo},on:{rescroll:t.reScroll}})],1)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card-header"},[t.config.languageChanged?a("div",{class:t.config.changeLanguageClass},[t._v(t._s(t.headerTitle))]):t._e()])},staticRenderFns:[]}}],[39]);
//# sourceMappingURL=app.343b7e8d15735b6acc84.js.map