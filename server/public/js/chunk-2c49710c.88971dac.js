(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c49710c"],{"3a66":function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var n=i("fe6c"),o=i("58df");function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(o["a"])(Object(n["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty:function(){return t}},watch:{app:function(t,e){e?this.removeApplication(!0):this.callUpdate()},applicationProperty:function(t,e){this.$vuetify.application.unregister(this._uid,e)}},activated:function(){this.callUpdate()},created:function(){for(var t=0,i=e.length;t<i;t++)this.$watch(e[t],this.callUpdate);this.callUpdate()},mounted:function(){this.callUpdate()},deactivated:function(){this.removeApplication()},destroyed:function(){this.removeApplication()},methods:{callUpdate:function(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:function(){return 0}}})}},"40dc":function(t,e,i){"use strict";i("a9e3"),i("b680"),i("c7cd");var n=i("5530"),o=(i("8b0d"),i("71d9")),r=i("53ca");function a(t,e){var i=e.modifiers||{},n=i.self,o=void 0!==n&&n,a=e.value,s="object"===Object(r["a"])(a)&&a.options||{passive:!0},c="function"===typeof a||"handleEvent"in a?a:a.handler,l=o?t:e.arg?document.querySelector(e.arg):window;l&&(l.addEventListener("scroll",c,s),t._onScroll={handler:c,options:s,target:o?void 0:l})}function s(t){if(t._onScroll){var e=t._onScroll,i=e.handler,n=e.options,o=e.target,r=void 0===o?t:o;r.removeEventListener("scroll",i,n),delete t._onScroll}}var c={inserted:a,unbind:s},l=c,h=i("3a66"),u=i("d9bd"),d=i("2b0e"),p=d["a"].extend({name:"scrollable",directives:{Scroll:c},props:{scrollTarget:String,scrollThreshold:[String,Number]},data:function(){return{currentScroll:0,currentThreshold:0,isActive:!1,isScrollingUp:!1,previousScroll:0,savedScroll:0,target:null}},computed:{canScroll:function(){return"undefined"!==typeof window},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):300}},watch:{isScrollingUp:function(){this.savedScroll=this.savedScroll||this.currentScroll},isActive:function(){this.savedScroll=0}},mounted:function(){this.scrollTarget&&(this.target=document.querySelector(this.scrollTarget),this.target||Object(u["c"])("Unable to locate element with identifier ".concat(this.scrollTarget),this))},methods:{onScroll:function(){var t=this;this.canScroll&&(this.previousScroll=this.currentScroll,this.currentScroll=this.target?this.target.scrollTop:window.pageYOffset,this.isScrollingUp=this.currentScroll<this.previousScroll,this.currentThreshold=Math.abs(this.currentScroll-this.computedScrollThreshold),this.$nextTick((function(){Math.abs(t.currentScroll-t.savedScroll)>t.computedScrollThreshold&&t.thresholdMet()})))},thresholdMet:function(){}}}),f=i("d10f"),v=i("f2e7"),m=i("80d2"),g=i("58df"),b=Object(g["a"])(o["a"],p,f["a"],v["a"],Object(h["a"])("top",["clippedLeft","clippedRight","computedHeight","invertedScroll","isExtended","isProminent","value"]));e["a"]=b.extend({name:"v-app-bar",directives:{Scroll:l},props:{clippedLeft:Boolean,clippedRight:Boolean,collapseOnScroll:Boolean,elevateOnScroll:Boolean,fadeImgOnScroll:Boolean,hideOnScroll:Boolean,invertedScroll:Boolean,scrollOffScreen:Boolean,shrinkOnScroll:Boolean,value:{type:Boolean,default:!0}},data:function(){return{isActive:this.value}},computed:{applicationProperty:function(){return this.bottom?"bottom":"top"},canScroll:function(){return p.options.computed.canScroll.call(this)&&(this.invertedScroll||this.elevateOnScroll||this.hideOnScroll||this.collapseOnScroll||this.isBooted||!this.value)},classes:function(){return Object(n["a"])(Object(n["a"])({},o["a"].options.computed.classes.call(this)),{},{"v-toolbar--collapse":this.collapse||this.collapseOnScroll,"v-app-bar":!0,"v-app-bar--clipped":this.clippedLeft||this.clippedRight,"v-app-bar--fade-img-on-scroll":this.fadeImgOnScroll,"v-app-bar--elevate-on-scroll":this.elevateOnScroll,"v-app-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-app-bar--hide-shadow":this.hideShadow,"v-app-bar--is-scrolled":this.currentScroll>0,"v-app-bar--shrink-on-scroll":this.shrinkOnScroll})},computedContentHeight:function(){if(!this.shrinkOnScroll)return o["a"].options.computed.computedContentHeight.call(this);var t=this.computedOriginalHeight,e=this.dense?48:56,i=t,n=i-e,r=n/this.computedScrollThreshold,a=this.currentScroll*r;return Math.max(e,i-a)},computedFontSize:function(){if(this.isProminent){var t=this.dense?96:128,e=t-this.computedContentHeight,i=.00347;return Number((1.5-e*i).toFixed(2))}},computedLeft:function(){return!this.app||this.clippedLeft?0:this.$vuetify.application.left},computedMarginTop:function(){return this.app?this.$vuetify.application.bar:0},computedOpacity:function(){if(this.fadeImgOnScroll){var t=Math.max((this.computedScrollThreshold-this.currentScroll)/this.computedScrollThreshold,0);return Number(parseFloat(t).toFixed(2))}},computedOriginalHeight:function(){var t=o["a"].options.computed.computedContentHeight.call(this);return this.isExtended&&(t+=parseInt(this.extensionHeight)),t},computedRight:function(){return!this.app||this.clippedRight?0:this.$vuetify.application.right},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):this.computedOriginalHeight-(this.dense?48:56)},computedTransform:function(){if(!this.canScroll||this.elevateOnScroll&&0===this.currentScroll&&this.isActive)return 0;if(this.isActive)return 0;var t=this.scrollOffScreen?this.computedHeight:this.computedContentHeight;return this.bottom?t:-t},hideShadow:function(){return this.elevateOnScroll&&this.isExtended?this.currentScroll<this.computedScrollThreshold:this.elevateOnScroll?0===this.currentScroll||this.computedTransform<0:(!this.isExtended||this.scrollOffScreen)&&0!==this.computedTransform},isCollapsed:function(){return this.collapseOnScroll?this.currentScroll>0:o["a"].options.computed.isCollapsed.call(this)},isProminent:function(){return o["a"].options.computed.isProminent.call(this)||this.shrinkOnScroll},styles:function(){return Object(n["a"])(Object(n["a"])({},o["a"].options.computed.styles.call(this)),{},{fontSize:Object(m["f"])(this.computedFontSize,"rem"),marginTop:Object(m["f"])(this.computedMarginTop),transform:"translateY(".concat(Object(m["f"])(this.computedTransform),")"),left:Object(m["f"])(this.computedLeft),right:Object(m["f"])(this.computedRight)})}},watch:{canScroll:"onScroll",computedTransform:function(){this.canScroll&&(this.clippedLeft||this.clippedRight)&&this.callUpdate()},invertedScroll:function(t){this.isActive=!t||0!==this.currentScroll}},created:function(){this.invertedScroll&&(this.isActive=!1)},methods:{genBackground:function(){var t=o["a"].options.methods.genBackground.call(this);return t.data=this._b(t.data||{},t.tag,{style:{opacity:this.computedOpacity}}),t},updateApplication:function(){return this.invertedScroll?0:this.computedHeight+this.computedTransform},thresholdMet:function(){this.invertedScroll?this.isActive=this.currentScroll>this.computedScrollThreshold:(this.hideOnScroll&&(this.isActive=this.isScrollingUp||this.currentScroll<this.computedScrollThreshold),this.currentThreshold<this.computedScrollThreshold||(this.savedScroll=this.currentScroll))}},render:function(t){var e=o["a"].options.render.call(this,t);return e.data=e.data||{},this.canScroll&&(e.data.directives=e.data.directives||[],e.data.directives.push({arg:this.scrollTarget,name:"scroll",value:this.onScroll})),e}})},"4ead":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",[i("v-navigation-drawer",{attrs:{app:"",clipped:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[i("v-list",{attrs:{dense:""}},[i("v-list-item-group",{attrs:{color:"primary"}},t._l(t.menus,(function(e,n){return i("v-list-item",{key:n,on:{click:function(i){return t.goTo(e.path)}}},[i("v-list-item-action",[i("v-icon",[t._v(t._s(e.icon))])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(t._s(e.title))])],1)],1)})),1)],1)],1),i("v-app-bar",{attrs:{"hide-on-scroll":"",app:"","clipped-left":"",dark:"",color:"primary"}},[i("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),i("v-toolbar-title",[t._v("Edit Project")]),i("v-spacer"),i("v-btn",{attrs:{text:""},on:{click:function(e){return t.$router.replace({path:"/projects"})}}},[t._v("All Projects")]),i("LogoutButton",{attrs:{color:"light"}})],1),i("v-main",[i("v-container",{attrs:{fluid:""}},[i("v-row",[i("v-col",[i("router-view")],1)],1)],1)],1)],1)},o=[],r=i("786e"),a={data:function(){return{id:this.$route.params.id,drawer:null,path:"/project/"+this.$route.params.id,menus:[{path:"",title:"Dashboard",icon:"mdi-view-dashboard"},{path:"/app_config",title:"App Config",icon:"mdi-cog"},{path:"/ads_config",title:"Admob Config",icon:"mdi-google-ads"},{path:"/inapp_settings",title:"In App Settings",icon:"mdi-cellphone-cog"}]}},methods:{goTo:function(t){this.$router.push({path:this.path+t}).catch((function(){}))}},components:{LogoutButton:r["a"]}},s=a,c=i("2877"),l=i("6544"),h=i.n(l),u=i("7496"),d=i("40dc"),p=(i("498a"),i("5530")),f=i("9d26"),v=i("8336"),m=i("2b0e"),g=m["a"].extend({name:"v-app-bar-nav-icon",functional:!0,render:function(t,e){var i=e.slots,n=e.listeners,o=e.props,r=e.data,a=Object.assign(r,{staticClass:"v-app-bar__nav-icon ".concat(r.staticClass||"").trim(),props:Object(p["a"])(Object(p["a"])({},o),{},{icon:!0}),on:n}),s=i().default;return t(v["a"],a,s||[t(f["a"],"$menu")])}}),b=i("62ad"),S=i("a523"),O=i("132d"),w=i("8860"),y=i("da13"),A=i("1800"),T=i("5d23"),x=i("1baa"),B=(i("bd0c"),i("d10f")),j=B["a"].extend({name:"v-main",props:{tag:{type:String,default:"main"}},computed:{styles:function(){var t=this.$vuetify.application,e=t.bar,i=t.top,n=t.right,o=t.footer,r=t.insetFooter,a=t.bottom,s=t.left;return{paddingTop:"".concat(i+e,"px"),paddingRight:"".concat(n,"px"),paddingBottom:"".concat(o+r+a,"px"),paddingLeft:"".concat(s,"px")}}},render:function(t){var e={staticClass:"v-main",style:this.styles,ref:"main"};return t(this.tag,e,[t("div",{staticClass:"v-main__wrap"},this.$slots.default)])}}),M=(i("99af"),i("a9e3"),i("c7cd"),i("7958"),i("adda")),k=i("3a66"),$=i("a9ad"),_=i("b848"),C=(i("caad"),i("b0c0"),i("d9bd")),V=m["a"].extend({name:"mobile",props:{mobileBreakpoint:{type:[Number,String],default:function(){return this.$vuetify?this.$vuetify.breakpoint.mobileBreakpoint:void 0},validator:function(t){return!isNaN(Number(t))||["xs","sm","md","lg","xl"].includes(String(t))}}},computed:{isMobile:function(){var t=this.$vuetify.breakpoint,e=t.mobile,i=t.width,n=t.name,o=t.mobileBreakpoint;if(o===this.mobileBreakpoint)return e;var r=parseInt(this.mobileBreakpoint,10),a=!isNaN(r);return a?i<r:n===this.mobileBreakpoint}},created:function(){this.$attrs.hasOwnProperty("mobile-break-point")&&Object(C["d"])("mobile-break-point","mobile-breakpoint",this)}}),H=i("e707"),E=i("7560"),R=i("a293"),P=i("dc22"),L=(i("4160"),i("159b"),i("80d2")),N=function(t){var e=t.touchstartX,i=t.touchendX,n=t.touchstartY,o=t.touchendY,r=.5,a=16;t.offsetX=i-e,t.offsetY=o-n,Math.abs(t.offsetY)<r*Math.abs(t.offsetX)&&(t.left&&i<e-a&&t.left(t),t.right&&i>e+a&&t.right(t)),Math.abs(t.offsetX)<r*Math.abs(t.offsetY)&&(t.up&&o<n-a&&t.up(t),t.down&&o>n+a&&t.down(t))};function X(t,e){var i=t.changedTouches[0];e.touchstartX=i.clientX,e.touchstartY=i.clientY,e.start&&e.start(Object.assign(t,e))}function I(t,e){var i=t.changedTouches[0];e.touchendX=i.clientX,e.touchendY=i.clientY,e.end&&e.end(Object.assign(t,e)),N(e)}function Y(t,e){var i=t.changedTouches[0];e.touchmoveX=i.clientX,e.touchmoveY=i.clientY,e.move&&e.move(Object.assign(t,e))}function U(t){var e={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:t.left,right:t.right,up:t.up,down:t.down,start:t.start,move:t.move,end:t.end};return{touchstart:function(t){return X(t,e)},touchend:function(t){return I(t,e)},touchmove:function(t){return Y(t,e)}}}function W(t,e,i){var n=e.value,o=n.parent?t.parentElement:t,r=n.options||{passive:!0};if(o){var a=U(e.value);o._touchHandlers=Object(o._touchHandlers),o._touchHandlers[i.context._uid]=a,Object(L["u"])(a).forEach((function(t){o.addEventListener(t,a[t],r)}))}}function z(t,e,i){var n=e.value.parent?t.parentElement:t;if(n&&n._touchHandlers){var o=n._touchHandlers[i.context._uid];Object(L["u"])(o).forEach((function(t){n.removeEventListener(t,o[t])})),delete n._touchHandlers[i.context._uid]}}var F={inserted:W,unbind:z},D=F,q=i("58df"),J=Object(q["a"])(Object(k["a"])("left",["isActive","isMobile","miniVariant","expandOnHover","permanent","right","temporary","width"]),$["a"],_["a"],V,H["a"],B["a"],E["a"]),G=J.extend({name:"v-navigation-drawer",provide:function(){return{isInNav:"nav"===this.tag}},directives:{ClickOutside:R["a"],Resize:P["a"],Touch:D},props:{bottom:Boolean,clipped:Boolean,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,height:{type:[Number,String],default:function(){return this.app?"100vh":"100%"}},miniVariant:Boolean,miniVariantWidth:{type:[Number,String],default:56},permanent:Boolean,right:Boolean,src:{type:[String,Object],default:""},stateless:Boolean,tag:{type:String,default:function(){return this.app?"nav":"aside"}},temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},value:null},data:function(){return{isMouseover:!1,touchArea:{left:0,right:0},stackMinZIndex:6}},computed:{applicationProperty:function(){return this.right?"right":"left"},classes:function(){return Object(p["a"])({"v-navigation-drawer":!0,"v-navigation-drawer--absolute":this.absolute,"v-navigation-drawer--bottom":this.bottom,"v-navigation-drawer--clipped":this.clipped,"v-navigation-drawer--close":!this.isActive,"v-navigation-drawer--fixed":!this.absolute&&(this.app||this.fixed),"v-navigation-drawer--floating":this.floating,"v-navigation-drawer--is-mobile":this.isMobile,"v-navigation-drawer--is-mouseover":this.isMouseover,"v-navigation-drawer--mini-variant":this.isMiniVariant,"v-navigation-drawer--custom-mini-variant":56!==Number(this.miniVariantWidth),"v-navigation-drawer--open":this.isActive,"v-navigation-drawer--open-on-hover":this.expandOnHover,"v-navigation-drawer--right":this.right,"v-navigation-drawer--temporary":this.temporary},this.themeClasses)},computedMaxHeight:function(){if(!this.hasApp)return null;var t=this.$vuetify.application.bottom+this.$vuetify.application.footer+this.$vuetify.application.bar;return this.clipped?t+this.$vuetify.application.top:t},computedTop:function(){if(!this.hasApp)return 0;var t=this.$vuetify.application.bar;return t+=this.clipped?this.$vuetify.application.top:0,t},computedTransform:function(){return this.isActive?0:this.isBottom||this.right?100:-100},computedWidth:function(){return this.isMiniVariant?this.miniVariantWidth:this.width},hasApp:function(){return this.app&&!this.isMobile&&!this.temporary},isBottom:function(){return this.bottom&&this.isMobile},isMiniVariant:function(){return!this.expandOnHover&&this.miniVariant||this.expandOnHover&&!this.isMouseover},isMobile:function(){return!this.stateless&&!this.permanent&&V.options.computed.isMobile.call(this)},reactsToClick:function(){return!this.stateless&&!this.permanent&&(this.isMobile||this.temporary)},reactsToMobile:function(){return this.app&&!this.disableResizeWatcher&&!this.permanent&&!this.stateless&&!this.temporary},reactsToResize:function(){return!this.disableResizeWatcher&&!this.stateless},reactsToRoute:function(){return!this.disableRouteWatcher&&!this.stateless&&(this.temporary||this.isMobile)},showOverlay:function(){return!this.hideOverlay&&this.isActive&&(this.isMobile||this.temporary)},styles:function(){var t=this.isBottom?"translateY":"translateX",e={height:Object(L["f"])(this.height),top:this.isBottom?"auto":Object(L["f"])(this.computedTop),maxHeight:null!=this.computedMaxHeight?"calc(100% - ".concat(Object(L["f"])(this.computedMaxHeight),")"):void 0,transform:"".concat(t,"(").concat(Object(L["f"])(this.computedTransform,"%"),")"),width:Object(L["f"])(this.computedWidth)};return e}},watch:{$route:"onRouteChange",isActive:function(t){this.$emit("input",t)},isMobile:function(t,e){!t&&this.isActive&&!this.temporary&&this.removeOverlay(),null!=e&&this.reactsToResize&&this.reactsToMobile&&(this.isActive=!t)},permanent:function(t){t&&(this.isActive=!0)},showOverlay:function(t){t?this.genOverlay():this.removeOverlay()},value:function(t){this.permanent||(null!=t?t!==this.isActive&&(this.isActive=t):this.init())},expandOnHover:"updateMiniVariant",isMouseover:function(t){this.updateMiniVariant(!t)}},beforeMount:function(){this.init()},methods:{calculateTouchArea:function(){var t=this.$el.parentNode;if(t){var e=t.getBoundingClientRect();this.touchArea={left:e.left+50,right:e.right-50}}},closeConditional:function(){return this.isActive&&!this._isDestroyed&&this.reactsToClick},genAppend:function(){return this.genPosition("append")},genBackground:function(){var t={height:"100%",width:"100%",src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img(t):this.$createElement(M["a"],{props:t});return this.$createElement("div",{staticClass:"v-navigation-drawer__image"},[e])},genDirectives:function(){var t=this,e=[{name:"click-outside",value:{handler:function(){t.isActive=!1},closeConditional:this.closeConditional,include:this.getOpenDependentElements}}];return this.touchless||this.stateless||e.push({name:"touch",value:{parent:!0,left:this.swipeLeft,right:this.swipeRight}}),e},genListeners:function(){var t=this,e={transitionend:function(e){if(e.target===e.currentTarget){t.$emit("transitionend",e);var i=document.createEvent("UIEvents");i.initUIEvent("resize",!0,!1,window,0),window.dispatchEvent(i)}}};return this.miniVariant&&(e.click=function(){return t.$emit("update:mini-variant",!1)}),this.expandOnHover&&(e.mouseenter=function(){return t.isMouseover=!0},e.mouseleave=function(){return t.isMouseover=!1}),e},genPosition:function(t){var e=Object(L["o"])(this,t);return e?this.$createElement("div",{staticClass:"v-navigation-drawer__".concat(t)},e):e},genPrepend:function(){return this.genPosition("prepend")},genContent:function(){return this.$createElement("div",{staticClass:"v-navigation-drawer__content"},this.$slots.default)},genBorder:function(){return this.$createElement("div",{staticClass:"v-navigation-drawer__border"})},init:function(){this.permanent?this.isActive=!0:this.stateless||null!=this.value?this.isActive=this.value:this.temporary||(this.isActive=!this.isMobile)},onRouteChange:function(){this.reactsToRoute&&this.closeConditional()&&(this.isActive=!1)},swipeLeft:function(t){this.isActive&&this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(this.right&&t.touchstartX>=this.touchArea.right?this.isActive=!0:!this.right&&this.isActive&&(this.isActive=!1)))},swipeRight:function(t){this.isActive&&!this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(!this.right&&t.touchstartX<=this.touchArea.left?this.isActive=!0:this.right&&this.isActive&&(this.isActive=!1)))},updateApplication:function(){if(!this.isActive||this.isMobile||this.temporary||!this.$el)return 0;var t=Number(this.computedWidth);return isNaN(t)?this.$el.clientWidth:t},updateMiniVariant:function(t){this.miniVariant!==t&&this.$emit("update:mini-variant",t)}},render:function(t){var e=[this.genPrepend(),this.genContent(),this.genAppend(),this.genBorder()];return(this.src||Object(L["o"])(this,"img"))&&e.unshift(this.genBackground()),t(this.tag,this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,directives:this.genDirectives(),on:this.genListeners()}),e)}}),Z=i("0fd9"),K=i("2fa4"),Q=i("2a7f"),tt=Object(c["a"])(s,n,o,!1,null,null,null);e["default"]=tt.exports;h()(tt,{VApp:u["a"],VAppBar:d["a"],VAppBarNavIcon:g,VBtn:v["a"],VCol:b["a"],VContainer:S["a"],VIcon:O["a"],VList:w["a"],VListItem:y["a"],VListItemAction:A["a"],VListItemContent:T["b"],VListItemGroup:x["a"],VListItemTitle:T["c"],VMain:j,VNavigationDrawer:G,VRow:Z["a"],VSpacer:K["a"],VToolbarTitle:Q["b"]})},"786e":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-btn",{attrs:{small:"",fab:"",icon:"",outlined:"",shaped:"",color:t.color},on:{click:function(e){return t.logOut()}}},[i("v-icon",[t._v("mdi-power")])],1)},o=[],r=(i("ac1f"),i("5319"),i("e84f")),a={props:{color:String},methods:{logOut:function(){r["a"].logOut(),this.$router.replace({path:"/"}).catch((function(t){return console.error(t)}))}}},s=a,c=i("2877"),l=i("6544"),h=i.n(l),u=i("8336"),d=i("132d"),p=Object(c["a"])(s,n,o,!1,null,null,null);e["a"]=p.exports;h()(p,{VBtn:u["a"],VIcon:d["a"]})},7958:function(t,e,i){},"8b0d":function(t,e,i){},a523:function(t,e,i){"use strict";i("99af"),i("4de4"),i("b64b"),i("2ca0"),i("20f6"),i("4b85"),i("a15b"),i("498a");var n=i("2b0e");function o(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,i){var n=i.props,o=i.data,r=i.children;o.staticClass="".concat(t," ").concat(o.staticClass||"").trim();var a=o.attrs;if(a){o.attrs={};var s=Object.keys(a).filter((function(t){if("slot"===t)return!1;var e=a[t];return t.startsWith("data-")?(o.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(o.staticClass+=" ".concat(s.join(" ")))}return n.id&&(o.domProps=o.domProps||{},o.domProps.id=n.id),e(n.tag,o,r)}})}var r=i("d9f7");e["a"]=o("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var i,n=e.props,o=e.data,a=e.children,s=o.attrs;return s&&(o.attrs={},i=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(o.attrs[t]=e,!1):e||"string"===typeof e}))),n.id&&(o.domProps=o.domProps||{},o.domProps.id=n.id),t(n.tag,Object(r["a"])(o,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(i||[])}),a)}})},bd0c:function(t,e,i){},d10f:function(t,e,i){"use strict";var n=i("2b0e");e["a"]=n["a"].extend({name:"ssr-bootable",data:function(){return{isBooted:!1}},mounted:function(){var t=this;window.requestAnimationFrame((function(){t.$el.setAttribute("data-booted","true"),t.isBooted=!0}))}})},e84f:function(t,e,i){"use strict";i("96cf");var n=i("1da1"),o=i("d4ec"),r=i("bee2"),a=i("bc3a"),s=i.n(a),c=i("4360"),l="/api/user",h=function(){function t(){Object(o["a"])(this,t)}return Object(r["a"])(t,null,[{key:"login",value:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e,i){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(window.location.host),t.prev=1,t.next=4,s.a.post(l+"/login",{email:e,password:i});case 4:return n=t.sent,c["a"].dispatch("auth/fetchAuth",{loggedIn:!0,token:n.data}),t.abrupt("return",1);case 9:return t.prev=9,t.t0=t["catch"](1),c["a"].dispatch("auth/fetchAuth",{loggedIn:!1,token:""}),console.error(t.t0),t.abrupt("return",0);case 14:case"end":return t.stop()}}),t,null,[[1,9]])})));function e(e,i){return t.apply(this,arguments)}return e}()},{key:"logOut",value:function(){c["a"].dispatch("auth/fetchAuth",{loggedIn:!1,token:""})}}]),t}();e["a"]=h}}]);
//# sourceMappingURL=chunk-2c49710c.88971dac.js.map