(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[20],{6655:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/works/workPopup/workPopup",function(){return t(7420)}])},4490:function(e,n,t){"use strict";var r=t(5893),o=t(7166),i=t.n(o),a=t(1128),c=t.n(a),s=t(7294),u=t(1056),l=i().bind(c());n.Z=function(e){var n=e.src,t=e.isBackgroundImage,o=void 0!==t&&t,i=e.skeletonClassName,a=(0,s.useState)(!0),c=a[0],d=a[1];return(0,r.jsxs)(r.Fragment,{children:[c&&(0,r.jsx)(u.Z,{className:l("skeleton",i)}),o&&(0,r.jsx)("div",{className:l(e.className,c&&"hide"),style:{backgroundImage:"url(".concat(n,")")}}),(0,r.jsx)("img",{src:n,className:l(e.className,(c||o)&&"hide"),onLoad:function(){return d(!1)}})]})}},1566:function(e,n,t){"use strict";var r=t(5893),o=t(9992),i=t.n(o),a=t(7166),c=t.n(a),s=t(7294),u=t(1193),l=t.n(u),d=t(3756),f=t(3147),p=t(4480),_=t(1649);function h(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function m(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,o,i=[],a=!0,c=!1;try{for(t=t.call(e);!(a=(r=t.next()).done)&&(i.push(r.value),!n||i.length!==n);a=!0);}catch(s){c=!0,o=s}finally{try{a||null==t.return||t.return()}finally{if(c)throw o}}return i}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return h(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return h(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var v=c().bind(i());n.Z=function(e){var n=e.title,t=void 0===n?"title":n,o=e.idx,i=e.isActive,a=void 0!==i&&i,c=e.isDraggable,u=void 0===c||c,h=e.isRandomPositon,k=void 0===h||h,b=e.buttons,y=void 0===b?null:b,w=e.bodyClassName,x=e.onClickClose,g=(0,d.Z)().isPcScreenSize,N=(0,s.useState)(100+-1*o),j=N[0],C=N[1],S=m((0,p.FV)(f.Ud),2),E=S[0],P=S[1],A=(0,s.useState)(!0),M=A[0],Z=A[1],D=(0,s.useRef)(null),I=m((0,p.FV)(f.x7),2),L=I[0],F=I[1];(0,s.useEffect)((function(){null!==D.current&&(k&&z(D.current),a&&F(D.current))}),[]),(0,s.useEffect)((function(){D.current===L&&B()}),[L]),(0,s.useEffect)((function(){null!==D.current&&z(D.current)}),[k]);var z=function(e){e.style.left="".concat(Math.floor(Math.random()*(window.innerWidth-e.offsetWidth)),"px"),e.style.top="".concat(Math.floor(Math.random()*(window.innerHeight-e.offsetHeight)),"px")},B=function(){C(E+1),P(E+1),F(D.current)},J=function(e){Z(!1),null!==e&&R(e)},R=function(e){setTimeout((function(){e.remove()}),250)};return(0,r.jsx)(l(),{disabled:!g,grid:[50,50],bounds:"div",onDrag:function(){return u&&B()},onMouseDown:function(){return u&&B()},children:(0,r.jsxs)("div",{id:e.id,className:v("container",!M&&"hide",e.className),style:(e.style,{zIndex:j,order:o}),onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave,ref:D,children:[(0,r.jsxs)("div",{className:v("header",L===D.current&&"header--active"),children:[(0,r.jsx)("h1",{children:t}),(0,r.jsxs)("div",{className:v("button__wrapper"),children:[null!==y&&y.map((function(e){return e})),(0,r.jsx)("div",{className:v("close__button"),onClick:x||function(){return J(D.current)},onTouchStart:x||function(){return g&&J(D.current)},children:(0,r.jsx)(_.QAE,{size:17.5})})]})]}),(0,r.jsx)("div",{className:v("body",w),children:e.children})]})})}},1056:function(e,n,t){"use strict";t.d(n,{Z:function(){return m}});var r=t(5893),o=t(7166),i=t.n(o),a=t(7571),c=t.n(a),s=t(7294);const u=s.createContext({});function l({baseColor:e,highlightColor:n,width:t,height:r,borderRadius:o,circle:i,direction:a,duration:c,enableAnimation:s=true}){const u={};return"rtl"===a&&(u["--animation-direction"]="reverse"),"number"===typeof c&&(u["--animation-duration"]=`${c}s`),s||(u["--pseudo-element-display"]="none"),"string"!==typeof t&&"number"!==typeof t||(u.width=t),"string"!==typeof r&&"number"!==typeof r||(u.height=r),"string"!==typeof o&&"number"!==typeof o||(u.borderRadius=o),i&&(u.borderRadius="50%"),"undefined"!==typeof e&&(u["--base-color"]=e),"undefined"!==typeof n&&(u["--highlight-color"]=n),u}function d({count:e=1,wrapper:n,className:t,containerClassName:r,containerTestId:o,circle:i=!1,style:a,...c}){var d,f,p;const _=s.useContext(u),h={...c};for(const[s,u]of Object.entries(c))"undefined"===typeof u&&delete h[s];const m={..._,...h,circle:i},v={...a,...l(m)};let k="react-loading-skeleton";t&&(k+=` ${t}`);const b=null!==(d=m.inline)&&void 0!==d&&d,y=[],w=Math.ceil(e);for(let u=0;u<w;u++){let n=v;if(w>e&&u===w-1){const t=null!==(f=n.width)&&void 0!==f?f:"100%",r=e%1,o="number"===typeof t?t*r:`calc(${t} * ${r})`;n={...n,width:o}}const t=s.createElement("span",{className:k,style:n,key:u},"\u200c");b?y.push(t):y.push(s.createElement(s.Fragment,{key:u},t,s.createElement("br",null)))}return s.createElement("span",{className:r,"data-testid":o,"aria-live":"polite","aria-busy":null===(p=m.enableAnimation)||void 0===p||p},n?y.map(((e,t)=>s.createElement(n,{key:t},e))):y)}function f({children:e,...n}){return s.createElement(u.Provider,{value:n},e)}var p=t(3147),_=t(4480);t(6860);var h=i().bind(c()),m=function(e){e=null!==e?e:function(e){throw e}(new TypeError("Cannot destructure undefined"));var n=(0,_.sJ)(p.W9);return(0,r.jsx)(f,{baseColor:n?"#383838":"",highlightColor:n?"#404040":"",borderRadius:0,children:(0,r.jsx)(d,{className:h("container",e.className)})})}},2121:function(e,n,t){"use strict";var r=t(5893),o=t(7166),i=t.n(o),a=t(6688),c=t.n(a),s=t(7294),u=t(1056),l=i().bind(c());n.Z=function(e){var n=e.link,t=e.iframeClassName,o=e.skeletonClassName,i=(0,s.useState)(!0),a=i[0],c=i[1];return(0,r.jsxs)("div",{className:l(e.className),children:[a&&(0,r.jsx)(u.Z,{className:l(o,"skeleton")}),(0,r.jsx)("iframe",{className:l(t,a&&"hide"),title:"youtube_video",src:"".concat(n,"?autoplay=1&showinfo=0&loop=1&mute=1&rel=0"),frameBorder:"0",allow:"autoplay; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,onLoad:function(){return c(!1)}})]})}},3756:function(e,n,t){"use strict";var r=t(7294);n.Z=function(){var e=(0,r.useState)([0,0]),n=e[0],t=e[1],o=n[0]>768;return(0,r.useLayoutEffect)((function(){var e=function(){t([window.innerWidth,window.innerHeight])};return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),{screenSize:n,isPcScreenSize:o}}},334:function(e,n,t){"use strict";var r;t.d(n,{S:function(){return r}}),function(e){e.ko="ko",e.en="en"}(r||(r={}))},9160:function(e,n,t){"use strict";t.d(n,{QW:function(){return r},gX:function(){return o},v7:function(){return i}});var r=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},o=function(e){if(e)return(e=e.replaceAll(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,"")).toLowerCase().replaceAll(" ","-")},i=function(e){return"https://drive.google.com/uc?export=view&id="+e}},9053:function(e,n,t){"use strict";t.r(n);var r=t(5893),o=t(8633),i=t.n(o),a=t(7166),c=t.n(a),s=t(4480),u=t(3147),l=t(1566),d=t(1664),f=t.n(d),p=c().bind(i());n.default=function(e){var n,t,o=e.workData,i=e.idx,a=e.id,c=e.className,d=e.onClickClose,_=(0,s.sJ)(u.b6),h=o&&(null===(n=o.description[_])||void 0===n?void 0:n.length),m=void 0!==h&&h>90;return o?(0,r.jsx)("span",{children:(0,r.jsxs)(l.Z,{title:"".concat(o.info.category," - ").concat(o.info.role),idx:i+1,className:p("container",c),isActive:!1,isDraggable:!1,onClickClose:d,children:[(0,r.jsxs)("p",{children:[null===(t=o.description[_])||void 0===t?void 0:t.substring(0,90).trimEnd(),m&&(0,r.jsxs)(r.Fragment,{children:["...",(0,r.jsx)(f(),{href:"/works/".concat(a),children:(0,r.jsx)("span",{className:p("link"),children:"read more"})})]})]}),o.link&&o.link.map((function(e){return(0,r.jsx)(f(),{href:e.url,target:"_blank",children:(0,r.jsxs)("span",{className:p("link","link--block"),children:["Visit the ",e.type," \u2192"]})})})),!m&&(0,r.jsx)(f(),{href:"/works/".concat(a),children:(0,r.jsx)("span",{className:p("link","link--block"),children:"Read More \u2192"})})]})}):null}},7420:function(e,n,t){"use strict";t.r(n);var r=t(5893),o=t(8669),i=t.n(o),a=t(7166),c=t.n(a),s=t(4480),u=t(3147),l=t(1566),d=t(7294),f=t(3756),p=t(2121),_=t(9053),h=t(9160),m=t(4490),v=c().bind(i());n.default=function(e){var n=e.workData,t=e.isRandomPositon,o=e.idx,i=e.id,a=(0,s.sJ)(u.b6),c=(0,s.sJ)(u.x7),k=(0,f.Z)().isPcScreenSize,b=(0,d.useState)(!1),y=b[0],w=b[1];return(0,d.useEffect)((function(){c==document.getElementById(i)?w(!0):w(!1)}),[c]),n?(0,r.jsxs)(l.Z,{id:i,title:n.title[a],isRandomPositon:t,idx:o+1,onMouseEnter:function(){return k&&w(!0)},onMouseLeave:function(){return k&&!(c==document.getElementById(i))&&w(!1)},className:v("container"),bodyClassName:v("body"),children:[n.video?(0,r.jsx)(p.Z,{link:n.video[0].url,className:v("video__container"),skeletonClassName:v("video__container","skeleton")}):n.thumbUrl&&(0,r.jsx)(m.Z,{src:(0,h.v7)(n.thumbUrl),className:v("image__container"),skeletonClassName:v("video__container"),isBackgroundImage:!0}),(0,r.jsx)(_.default,{className:v("description-popup".concat(!y&&"--hide")),workData:n,idx:o,id:i,onClickClose:function(){return w(!1)}})]}):null}},3147:function(e,n,t){"use strict";t.d(n,{Ud:function(){return s},W9:function(){return i},_v:function(){return c},b6:function(){return a},x7:function(){return u}});var r=t(334),o=t(4480),i=(0,o.cn)({key:"darkModeState",default:!1}),a=(0,o.cn)({key:"languageState",default:r.S.ko}),c=(0,o.cn)({key:"workFilterState",default:"All"}),s=(0,o.cn)({key:"popupOverlayState",default:999}),u=(0,o.cn)({key:"currentActivePopupState",default:null})},1128:function(e){e.exports={skeleton:"contentImage_skeleton__A38FN",hide:"contentImage_hide__W_OY9"}},9992:function(e){e.exports={container:"popup_container__i_NTy",header:"popup_header__EBPD_",button__wrapper:"popup_button__wrapper__poJSJ",close__button:"popup_close__button__B17h1","header--active":"popup_header--active__kGFGj",body:"popup_body__cpqJN",hide:"popup_hide__04Z7K"}},7571:function(e){e.exports={container:"skeletonBox_container__L0jDm"}},6688:function(e){e.exports={skeleton:"youtubeVideo_skeleton__SHtEx",hide:"youtubeVideo_hide__jqJwN"}},8633:function(e){e.exports={container:"workDescriptionPopup_container__fxGkS",link:"workDescriptionPopup_link__Ch6CT","link--block":"workDescriptionPopup_link--block__hslJ3"}},8669:function(e){e.exports={container:"workPopup_container__CLo12",body:"workPopup_body__Fjw9K",image__container:"workPopup_image__container__0Z_7k",video__container:"workPopup_video__container__K5hU_",skeleton:"workPopup_skeleton__BdD3D","description-popup":"workPopup_description-popup__M4lm5","description-popup--hide":"workPopup_description-popup--hide__CPzUN"}},6860:function(){}},function(e){e.O(0,[866,874,664,774,888,179],(function(){return n=6655,e(e.s=n);var n}));var n=e.O();_N_E=n}]);