(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[547],{1894:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/works",function(){return e(873)}])},2331:function(n,t,e){"use strict";var r=e(5893),o=e(7166),i=e.n(o),u=e(6388),c=e.n(u),a=e(7294),s=e(1193),l=e.n(s),f=e(1649),d=e(3472),p=i().bind(c());t.Z=function(n){var t=n.onClick,e=(0,a.useState)(!0),o=e[0],i=e[1],u=(0,a.useRef)(null);(0,a.useEffect)((function(){null!==u.current&&(0,d.n)(u.current)}),[]);var c=function(){i(!o)};return(0,r.jsx)(l(),{grid:[50,50],bounds:"div",children:(0,r.jsxs)("div",{className:p("container",!o&&"hide"),ref:u,children:[(0,r.jsx)("div",{className:p("close__button"),onClick:function(){return c()},onTouchStart:function(){return c()},children:(0,r.jsx)(f.QAE,{size:17.5})}),(0,r.jsx)("div",{className:p("wrapper"),onClick:function(){return o&&t()},onTouchStart:function(){return o&&t()}})]})})}},873:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return Y}});var r,o,i=e(5893),u=e(3977),c=e(7294),a=e(7166),s=e.n(a),l=e(2596),f=e.n(l),d=e(4697),p=e(1566),_=e(4480),h=e(3147),m=e(2331),k=e(9956),v=e.n(k),b=e(1649);!function(n){n.Website="Website",n.Application="Application"}(r||(r={})),function(n){n.Development="Development",n.Planning="Planning",n.Design="Design"}(o||(o={}));var x=s().bind(v()),y=function(n){var t=n.onChange,e=(0,_.sJ)(h._v),u=(0,c.useRef)(null);return(0,i.jsxs)("div",{className:x("button"),onTouchStart:function(){var n;return null===(n=u.current)||void 0===n?void 0:n.focus()},children:[(0,i.jsx)(b.Bq0,{}),(0,i.jsxs)("select",{defaultValue:e,className:x("select"),onChange:t,ref:u,children:[(0,i.jsx)("option",{value:"All",children:"All"}),Object.keys(r).map((function(n){return(0,i.jsx)("option",{value:n,children:n})})),Object.keys(o).map((function(n){return(0,i.jsx)("option",{value:n,children:n})}))]})]})},g=e(2119),w=e.n(g),j=e(1664),N=e.n(j),S=e(1163),C=e(6261);function A(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function P(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var r,o,i=[],u=!0,c=!1;try{for(e=e.call(n);!(u=(r=e.next()).done)&&(i.push(r.value),!t||i.length!==t);u=!0);}catch(a){c=!0,o=a}finally{try{u||null==e.return||e.return()}finally{if(c)throw o}}return i}}(n,t)||function(n,t){if(!n)return;if("string"===typeof n)return A(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return A(n,t)}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var E=s().bind(w()),I=function(n){var t=n.workData,e=n.idx,r=n.id,o=(0,_.sJ)(h.b6),u=P((0,_.FV)(h.x7),2),a=(u[0],u[1]),s=(0,S.useRouter)(),l="/works/".concat(r);(0,c.useEffect)((function(){r===s.query.target&&f(s.query.target)}),[s.query.target]);var f=function(n){var t=document.getElementById(n);t?(a(t),d(t)):s.push(l)},d=function(n){var t=document.documentElement.clientHeight;s.push("?target=".concat(r)),null!==n&&C.NY.scrollTo(n.offsetTop-(t/2-n.offsetHeight/2))};return t?(0,i.jsxs)("span",{className:E("wrapper","mr-2"),children:[(0,i.jsxs)("span",{className:E("footnote"),onClick:function(){return f(r)},onTouchStart:function(){return f(r)},children:["[",e,"]"]}),(0,i.jsx)(N(),{href:l,children:(0,i.jsxs)("span",{className:E("link"),onTouchStart:function(){s.push(l)},children:[t.title[o]," ( ",t.info.date," ) [",t.info.category,"]"]})})]},e):null},B=e(8129),D=e.n(B),T=e(3756),R=e(2121),Z=e(1772),O=e.n(Z),V=e(2926),M=s().bind(O()),W=function(n){var t,e,r=n.workData,o=n.idx,u=n.id,c=n.className,a=n.onClickClose,s=(0,S.useRouter)(),l=(0,_.sJ)(h.b6),f=r&&(null===(t=r.description[l])||void 0===t?void 0:t.length),d=void 0!==f&&f>90;return r?(0,i.jsx)("span",{children:(0,i.jsxs)(p.Z,{title:"".concat(r.info.category," - ").concat(r.info.role),idx:o+1,className:M("container",c),isActive:!1,isDraggable:!1,onClickClose:a,children:[(0,i.jsxs)("p",{children:[null===(e=r.description[l])||void 0===e?void 0:e.substring(0,90).trimEnd(),d&&(0,i.jsxs)(i.Fragment,{children:["...",(0,i.jsx)(N(),{href:"/works/".concat(u),children:(0,i.jsx)("span",{className:M("link"),onTouchStart:function(){s.push("/works/".concat(u))},children:"read more"})})]})]}),r.link&&r.link.map((function(n){return(0,i.jsx)(N(),{href:n.url,target:"_blank",children:(0,i.jsxs)("span",{className:M("link","link--block"),onTouchStart:function(){return(0,V.h)(n.url)},children:["Visit the ",n.type," \u2192"]})})})),!d&&(0,i.jsx)(N(),{href:"/works/".concat(u),children:(0,i.jsx)("span",{className:M("link","link--block"),onTouchStart:function(){s.push("/works/".concat(u))},children:"Read More \u2192"})})]})}):null},X=e(9160),q=e(4490),J=s().bind(D()),L=function(n){var t=n.workData,e=n.isRandomPositon,r=n.idx,o=n.id,u=(0,_.sJ)(h.b6),a=(0,_.sJ)(h.x7),s=(0,T.Z)().isPcScreenSize,l=(0,c.useState)(!1),f=l[0],d=l[1];return(0,c.useEffect)((function(){a==document.getElementById(o)?d(!0):d(!1)}),[a]),t?(0,i.jsxs)(p.Z,{id:o,title:t.title[u],isRandomPositon:e,idx:r+1,onMouseEnter:function(){return s&&d(!0)},onMouseLeave:function(){return s&&!(a==document.getElementById(o))&&d(!1)},className:J("container"),bodyClassName:J("body"),children:[t.video?(0,i.jsx)(R.Z,{link:t.video[0].url,className:J("video__container"),skeletonClassName:J("video__container","skeleton")}):t.thumbUrl&&(0,i.jsx)(q.Z,{src:(0,X.v7)(t.thumbUrl),className:J("image__container"),skeletonClassName:J("video__container"),isBackgroundImage:!0}),(0,i.jsx)(W,{className:J("description-popup".concat(!f&&"--hide")),workData:t,idx:r,id:o,onClickClose:function(){return d(!1)}})]}):null};function U(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}function F(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=null==n?null:"undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=e){var r,o,i=[],u=!0,c=!1;try{for(e=e.call(n);!(u=(r=e.next()).done)&&(i.push(r.value),!t||i.length!==t);u=!0);}catch(a){c=!0,o=a}finally{try{u||null==e.return||e.return()}finally{if(c)throw o}}return i}}(n,t)||function(n,t){if(!n)return;if("string"===typeof n)return U(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return U(n,t)}(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var H=s().bind(f()),Y=function(){var n=F((0,_.FV)(h._v),2),t=n[0],e=n[1],r=d,o=(0,c.useState)(!0),a=o[0],s=o[1],l=r.data.slice(0).reverse().filter((function(n){return"All"===t?n:"Website"===t||"Application"===t?n.info.category.includes(t):n.info.role.includes(t)})),f=function(n,t){return"".concat((0,X.gX)(n),"-").concat((0,X.gX)(t))};return(0,i.jsxs)(u.Z,{title:"Works",children:[(0,i.jsx)(p.Z,{title:"".concat((0,X.QW)(t)," Works"),idx:0,isActive:!0,isRandomPositon:!1,className:H("popup__all-work"),buttons:[(0,i.jsx)(y,{onChange:function(n){return e(n.target.value)}})],children:l.map((function(n,t){return(0,i.jsx)(I,{id:f(n.title.en,n.info.category[0]),workData:n,idx:l.length-t},l.length-t)}))}),l.map((function(n,t){return(0,i.jsx)(L,{id:f(n.title.en,n.info.category[0]),workData:n,isRandomPositon:a,idx:t},t)})),(0,i.jsx)(m.Z,{onClick:function(){return s(!a)}})]})}},9956:function(n){n.exports={button:"filterButton_button__e_bfy",select:"filterButton_select__kACH0"}},6388:function(n){n.exports={container:"shuffleButton_container__yUtY0",close__button:"shuffleButton_close__button__PNV8t",wrapper:"shuffleButton_wrapper__sgprt",bounce:"shuffleButton_bounce__M_tSF",hide:"shuffleButton_hide__aiOh5"}},1772:function(n){n.exports={container:"workDescriptionPopup_container__uBxZX",link:"workDescriptionPopup_link__fxhbY","link--block":"workDescriptionPopup_link--block__7mieq"}},2119:function(n){n.exports={wrapper:"workListItem_wrapper__i7w3C",footnote:"workListItem_footnote__5NzKg",link:"workListItem_link__3YbtQ"}},8129:function(n){n.exports={container:"workPopup_container__7iBh_",body:"workPopup_body__xNKte",image__container:"workPopup_image__container__fIBPN",video__container:"workPopup_video__container__fP9eI",skeleton:"workPopup_skeleton__6hEHu","description-popup":"workPopup_description-popup__GLm3V","description-popup--hide":"workPopup_description-popup--hide__XEVIb"}},2596:function(n){n.exports={"popup__all-work":"works_popup__all-work__eD5R5"}}},function(n){n.O(0,[885,866,43,193,181,599,774,888,179],(function(){return t=1894,n(n.s=t);var t}));var t=n.O();_N_E=t}]);