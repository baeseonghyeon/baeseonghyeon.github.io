(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[547],{1894:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/works",function(){return e(8339)}])},8339:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return P}});var r,o,i=e(5893),a=e(3977),l=e(7294),c=e(7166),s=e.n(c),u=e(2596),f=e.n(u),d=e(4697),p=e(1566),_=e(4480),m=e(3147),h=e(2331),k=e(9956),v=e.n(k),y=e(1649);!function(n){n.Website="Website",n.Application="Application"}(r||(r={})),function(n){n.Development="Development",n.Planning="Planning",n.Design="Design"}(o||(o={}));var b=s().bind(v()),g=function(n){var t=n.onChange,e=(0,_.sJ)(m._v);return(0,i.jsxs)("div",{className:b("button"),children:[(0,i.jsx)(y.Bq0,{}),(0,i.jsxs)("select",{defaultValue:e,className:b("select"),onChange:t,children:[(0,i.jsx)("option",{value:"All",children:"All"}),Object.keys(r).map((function(n){return(0,i.jsx)("option",{value:n,children:n})})),Object.keys(o).map((function(n){return(0,i.jsx)("option",{value:n,children:n})}))]})]})},x=e(7934),w=e(7420),j=e(9160);function N(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function C(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var r,o,i=[],a=!0,l=!1;try{for(e=e.call(n);!(a=(r=e.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(c){l=!0,o=c}finally{try{a||null==e.return||e.return()}finally{if(l)throw o}}return i}}(n,t)||function(n,t){if(!n)return;if("string"===typeof n)return N(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return N(n,t)}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var A=s().bind(f()),P=function(){var n=C((0,_.FV)(m._v),2),t=n[0],e=n[1],r=d,o=(0,l.useState)(!0),c=o[0],s=o[1],u=r.data.slice(0).reverse().filter((function(n){return"All"===t?n:"Website"===t||"Application"===t?n.info.category.includes(t):n.info.role.includes(t)})),f=function(n,t){return"".concat((0,j.gX)(n),"-").concat((0,j.gX)(t))};return(0,i.jsxs)(a.Z,{title:"Works",children:[(0,i.jsx)(p.Z,{title:"".concat((0,j.QW)(t)," Works"),idx:0,isActive:!0,isRandomPositon:!1,className:A("popup__all-work"),buttons:[(0,i.jsx)(g,{onChange:function(n){return e(n.target.value)}})],children:u.map((function(n,t){return(0,i.jsx)(x.default,{id:f(n.title.en,n.info.category[0]),workData:n,idx:u.length-t},u.length-t)}))}),u.map((function(n,t){return(0,i.jsx)(w.default,{id:f(n.title.en,n.info.category[0]),workData:n,isRandomPositon:c,idx:t},t)})),(0,i.jsx)(h.Z,{onClick:function(){return s(!c)}})]})}},9053:function(n,t,e){"use strict";e.r(t);var r=e(5893),o=e(8633),i=e.n(o),a=e(7166),l=e.n(a),c=e(4480),s=e(3147),u=e(1566),f=e(1664),d=e.n(f),p=l().bind(i());t.default=function(n){var t,e,o=n.workData,i=n.idx,a=n.id,l=n.className,f=n.onClickClose,_=(0,c.sJ)(s.b6),m=o&&(null===(t=o.description[_])||void 0===t?void 0:t.length),h=void 0!==m&&m>100;return o?(0,r.jsx)("span",{children:(0,r.jsxs)(u.Z,{title:"".concat(o.info.category," - ").concat(o.info.role),idx:i+1,className:p("container",l),isActive:!1,isDraggable:!1,onClickClose:f,children:[(0,r.jsxs)("p",{children:[null===(e=o.description[_])||void 0===e?void 0:e.substring(0,100).trimEnd(),h&&(0,r.jsxs)(r.Fragment,{children:["...",(0,r.jsx)(d(),{href:"/works/".concat(a),children:(0,r.jsx)("span",{className:p("link"),children:"read more"})})]})]}),o.link&&o.link.map((function(n){return(0,r.jsx)(d(),{href:n.url,target:"_blank",children:(0,r.jsxs)("span",{className:p("link","link--block"),children:["Visit the ",n.type," \u2192"]})})})),!h&&(0,r.jsx)(d(),{href:"/works/".concat(a),children:(0,r.jsx)("span",{className:p("link","link--block"),children:"Read More \u2192"})})]})}):null}},7934:function(n,t,e){"use strict";e.r(t);var r=e(5893),o=e(3424),i=e.n(o),a=e(7166),l=e.n(a),c=e(4480),s=e(3147),u=e(1664),f=e.n(u),d=e(3756),p=e(1163),_=e(6261),m=e(7294);function h(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function k(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var r,o,i=[],a=!0,l=!1;try{for(e=e.call(n);!(a=(r=e.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(c){l=!0,o=c}finally{try{a||null==e.return||e.return()}finally{if(l)throw o}}return i}}(n,t)||function(n,t){if(!n)return;if("string"===typeof n)return h(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return h(n,t)}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var v=l().bind(i());t.default=function(n){var t=n.workData,e=n.idx,o=n.id,i=(0,c.sJ)(s.b6),a=k((0,c.FV)(s.x7),2),l=(a[0],a[1]),u=(0,p.useRouter)(),h=(0,d.Z)().isPcScreenSize,y="/works/".concat(o);(0,m.useEffect)((function(){o===u.query.target&&b(u.query.target)}),[u.query.target]);var b=function(n){var t=document.getElementById(n);t?(l(t),g(t)):u.push(y)},g=function(n){var t=document.documentElement.clientHeight;u.push("?target=".concat(o)),null!==n&&_.NY.scrollTo(n.offsetTop-(t/2-n.offsetHeight/2))};return t?(0,r.jsxs)("span",{className:v("wrapper","mr-2"),children:[(0,r.jsxs)("span",{className:v("footnote"),onClick:function(){return b(o)},onTouchStart:function(){return b(o)},children:["[",e,"]"]}),(0,r.jsx)(f(),{href:y,onTouchStart:function(){h&&(window.location.href=y)},children:(0,r.jsxs)("span",{className:v("link"),children:[t.title[i]," ( ",t.info.date," ) [",t.info.category,"]"]})})]},e):null}},7420:function(n,t,e){"use strict";e.r(t);var r=e(5893),o=e(8669),i=e.n(o),a=e(7166),l=e.n(a),c=e(4480),s=e(3147),u=e(1566),f=e(7294),d=e(3756),p=e(2121),_=e(9053),m=e(9160),h=e(4490),k=l().bind(i());t.default=function(n){var t=n.workData,e=n.isRandomPositon,o=n.idx,i=n.id,a=(0,c.sJ)(s.b6),l=(0,c.sJ)(s.x7),v=(0,d.Z)().isPcScreenSize,y=(0,f.useState)(!1),b=y[0],g=y[1];return(0,f.useEffect)((function(){l==document.getElementById(i)?g(!0):g(!1)}),[l]),t?(0,r.jsxs)(u.Z,{id:i,title:t.title[a],isRandomPositon:e,idx:o+1,onMouseEnter:function(){return v&&g(!0)},onMouseLeave:function(){return v&&!(l==document.getElementById(i))&&g(!1)},className:k("container"),bodyClassName:k("body"),children:[t.video?(0,r.jsx)(p.Z,{link:t.video[0].url,className:k("video__container"),skeletonClassName:k("video__container","skeleton")}):t.thumbUrl&&(0,r.jsx)(h.Z,{src:(0,m.v7)(t.thumbUrl),className:k("image__container"),skeletonClassName:k("video__container"),isBackgroundImage:!0}),(0,r.jsx)(_.default,{className:k("description-popup".concat(!b&&"--hide")),workData:t,idx:o,id:i,onClickClose:function(){return g(!1)}})]}):null}},9956:function(n){n.exports={button:"filterButton_button__e_bfy",select:"filterButton_select__kACH0"}},8633:function(n){n.exports={container:"workDescriptionPopup_container__fxGkS",link:"workDescriptionPopup_link__Ch6CT","link--block":"workDescriptionPopup_link--block__hslJ3"}},3424:function(n){n.exports={wrapper:"workListItem_wrapper__XQPg_",footnote:"workListItem_footnote__miOQv",link:"workListItem_link__paCAH"}},8669:function(n){n.exports={container:"workPopup_container__CLo12",body:"workPopup_body__Fjw9K",image__container:"workPopup_image__container__0Z_7k",video__container:"workPopup_video__container__K5hU_",skeleton:"workPopup_skeleton__BdD3D","description-popup":"workPopup_description-popup__M4lm5","description-popup--hide":"workPopup_description-popup--hide__CPzUN"}},2596:function(n){n.exports={"popup__all-work":"works_popup__all-work__eD5R5"}}},function(n){n.O(0,[866,885,874,664,261,639,969,599,774,888,179],(function(){return t=1894,n(n.s=t);var t}));var t=n.O();_N_E=t}]);